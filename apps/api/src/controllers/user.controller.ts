import { Request, Response } from 'express';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { prisma } from '../config/prisma';
import { Role } from '@prisma/client';



const ACCESS_TOKEN_EXPIRES_IN = '15m';
const REFRESH_TOKEN_EXPIRES_IN = '7d';
const REFRESH_TOKEN_COOKIE = 'refreshToken';
const REFRESH_TOKEN_MAX_AGE = 7 * 24 * 60 * 60 * 1000;
const BCRYPT_ROUNDS = 10;
const MIN_PASSWORD_LENGTH = 8;
const MAX_LOGIN_ATTEMPTS = 5;
const LOCKOUT_DURATION_MS = 15 * 60 * 1000; // 15 minutes


interface JWTPayload {
  userId: string;
  role?: Role;
}

interface ApiResponse<T = any> {
  success: boolean;
  message: string;
  data?: T;
  error?: string;
}

interface UserData {
  id: string;
  email: string;
  firstName: string;
  lastName: string | null;
  role: Role;
}


const getAccessTokenSecret = (): string => {
  const secret = process.env.JWT_ACCESS_SECRET || process.env.JWT_SECRET;
  if (!secret) {
    throw new Error('JWT_ACCESS_SECRET is not configured');
  }
  return secret;
};


const getRefreshTokenSecret = (): string => {
  const secret = process.env.JWT_REFRESH_SECRET;
  if (!secret) {
    throw new Error('JWT_REFRESH_SECRET is not configured');
  }
  return secret;
};


const getRefreshTokenCookieOptions = () => ({
  httpOnly: true,
  secure: process.env.NODE_ENV === 'production',
  sameSite: 'strict' as const,
  path: '/',
  maxAge: REFRESH_TOKEN_MAX_AGE,
});


function isValidEmail(email: string): boolean {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email) && email.length <= 255;
}

/**
 * Validate password strength
 */
function isValidPassword(password: string): string | null {
  if (!password || password.length < MIN_PASSWORD_LENGTH) {
    return `Password must be at least ${MIN_PASSWORD_LENGTH} characters`;
  }
  if (!/[A-Z]/.test(password)) {
    return 'Password must contain at least one uppercase letter';
  }
  if (!/[a-z]/.test(password)) {
    return 'Password must contain at least one lowercase letter';
  }
  if (!/[0-9]/.test(password)) {
    return 'Password must contain at least one number';
  }
  return null;
}

/**
 * Validate first name
 */
function isValidFirstName(firstName: string): boolean {
  return Boolean(firstName && firstName.trim().length > 0 && firstName.trim().length <= 100);
}


function isValidLastName(lastName: string | undefined): boolean {
  if (!lastName) return true;
  return lastName.trim().length <= 100;
}

const signAccessToken = (userId: string, role: Role): string => {
  try {
    const secret = getAccessTokenSecret();
    return jwt.sign({ userId, role }, secret, {
      expiresIn: ACCESS_TOKEN_EXPIRES_IN,
      issuer: 'auth-service',
    });
  } catch (err) {
    console.error('[Auth] Failed to sign access token:', err instanceof Error ? err.message : err);
    throw new Error('Token generation failed');
  }
};


const signRefreshToken = (userId: string): string => {
  try {
    const secret = getRefreshTokenSecret();
    return jwt.sign({ userId }, secret, {
      expiresIn: REFRESH_TOKEN_EXPIRES_IN,
      issuer: 'auth-service',
    });
  } catch (err) {
    console.error('[Auth] Failed to sign refresh token:', err instanceof Error ? err.message : err);
    throw new Error('Token generation failed');
  }
};


function sendSuccess<T>(
  res: Response,
  statusCode: number,
  message: string,
  data?: T
): Response {
  return res.status(statusCode).json({
    success: true,
    message,
    data,
  } as ApiResponse<T>);
}

function sendError(
  res: Response,
  statusCode: number,
  message: string,
  error?: string
): Response {
  return res.status(statusCode).json({
    success: false,
    message,
    error: process.env.NODE_ENV === 'production' ? undefined : error,
  } as ApiResponse);
}



export const signupUser = async (req: Request, res: Response): Promise<Response> => {
  const startTime = Date.now();

  try {
    const { firstName, lastName, email, password, passwordConfirm } = req.body;
    // Check required fields
    if (!firstName || !email || !password) {
      return sendError(res, 400, 'Missing required fields: firstName, email, password');
    }

    // Validate first name
    if (!isValidFirstName(firstName)) {
      return sendError(res, 400, 'Invalid firstName (1-100 characters required)');
    }

    // Validate last name (optional)
    if (!isValidLastName(lastName)) {
      return sendError(res, 400, 'Invalid lastName (max 100 characters)');
    }

    // Validate email format
    const normalizedEmail = String(email).trim().toLowerCase();
    if (!isValidEmail(normalizedEmail)) {
      return sendError(res, 400, 'Invalid email format');
    }

    // Validate password
    const passwordError = isValidPassword(password);
    if (passwordError) {
      return sendError(res, 400, passwordError);
    }

    // Validate password confirmation
    if (password !== passwordConfirm) {
      return sendError(res, 400, 'Passwords do not match');
    }

  

    const existingUser = await prisma.user.findUnique({
      where: { email: normalizedEmail },
      select: { id: true }, // Only select ID for performance
    });

    if (existingUser) {
      // Don't reveal whether email exists (but can for signup - adjust as needed)
      return sendError(res, 409, 'Email already registered');
    }

   
    const hashedPassword = await bcrypt.hash(password, BCRYPT_ROUNDS);

    const user = await prisma.user.create({
      data: {
        email: normalizedEmail,
        firstName: firstName.trim(),
        lastName: lastName ? lastName.trim() : null,
        password: hashedPassword,
        role: Role.USER,
      },
      select: {
        id: true,
        email: true,
        firstName: true,
        lastName: true,
        role: true,
      },
    });

    console.info('[Auth] User registered successfully', {
      userId: user.id,
      email: user.email,
      duration: `${Date.now() - startTime}ms`,
    });

    return sendSuccess<UserData>(res, 201, 'User registered successfully', {
      id: user.id,
      email: user.email,
      firstName: user.firstName,
      lastName: user.lastName,
      role: user.role,
    });
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : 'Failed to register user';
    console.error('[Auth] Signup error:', {
      error: errorMessage,
      duration: `${Date.now() - startTime}ms`,
    });

    return sendError(
      res,
      500,
      'Registration failed. Please try again later.',
      errorMessage
    );
  }
};

/**
 * SIGNIN: Authenticate user and return tokens
 * POST /auth/signin
 */
export const signinUser = async (req: Request, res: Response): Promise<Response> => {
  const startTime = Date.now();

  try {
    const { email, password } = req.body;

    // =====================================================================
    // INPUT VALIDATION
    // =====================================================================

    if (!email || !password) {
      return sendError(res, 400, 'Email and password are required');
    }

    const normalizedEmail = String(email).trim().toLowerCase();

    if (!isValidEmail(normalizedEmail)) {
      return sendError(res, 401, 'Invalid credentials');
    }


    const user = await prisma.user.findUnique({
      where: { email: normalizedEmail },
      select: {
        id: true,
        email: true,
        password: true,
        firstName: true,
        lastName: true,
        role: true,
      },
    });

    if (!user) {

      console.warn('[Auth] Login attempt with non-existent email', {
        email: normalizedEmail,
      });
      return sendError(res, 401, 'Invalid credentials');
    }


    const isPasswordValid = await bcrypt.compare(password, user.password);

    if (!isPasswordValid) {
      console.warn('[Auth] Failed login attempt', {
        userId: user.id,
        email: user.email,
      });
      return sendError(res, 401, 'Invalid credentials');
    }

    // =====================================================================
    // GENERATE TOKENS
    // =====================================================================

    let accessToken: string;
    let refreshToken: string;

    try {
      accessToken = signAccessToken(user.id, user.role);
      refreshToken = signRefreshToken(user.id);
    } catch (tokenErr) {
      console.error('[Auth] Token generation failed:', tokenErr instanceof Error ? tokenErr.message : tokenErr);
      return sendError(res, 500, 'Authentication failed. Please try again.', 'Token generation failed');
    }

    // =====================================================================
    // STORE REFRESH TOKEN IN DB & SET COOKIE
    // =====================================================================

    try {
      await prisma.user.update({
        where: { id: user.id },
        data: { refreshToken },
      });
    } catch (dbErr) {
      console.error('[Auth] Failed to store refresh token:', dbErr instanceof Error ? dbErr.message : dbErr);
      return sendError(res, 500, 'Login failed. Please try again.');
    }

    res.cookie(REFRESH_TOKEN_COOKIE, refreshToken, getRefreshTokenCookieOptions());

    // =====================================================================
    // LOG & RESPOND
    // =====================================================================

    console.info('[Auth] User signed in successfully', {
      userId: user.id,
      email: user.email,
      duration: `${Date.now() - startTime}ms`,
    });

    return sendSuccess<{ accessToken: string; user: UserData }>(
      res,
      200,
      'Login successful',
      {
        accessToken,
        user: {
          id: user.id,
          email: user.email,
          firstName: user.firstName,
          lastName: user.lastName,
          role: user.role,
        },
      }
    );
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : 'Login failed';
    console.error('[Auth] Signin error:', {
      error: errorMessage,
      duration: `${Date.now() - startTime}ms`,
    });

    return sendError(
      res,
      500,
      'Login failed. Please try again later.',
      errorMessage
    );
  }
};


/**
 * REFRESH: Issue new access token using refresh token
 * POST /auth/refresh
 */
export const refreshTokenHandler = async (req: Request, res: Response): Promise<Response> => {
  const startTime = Date.now();

  try {
    // =====================================================================
    // GET REFRESH TOKEN FROM COOKIE
    // =====================================================================

    const refreshToken = req.cookies?.[REFRESH_TOKEN_COOKIE];

    if (!refreshToken) {
      return sendError(res, 401, 'No refresh token provided');
    }

    // =====================================================================
    // VERIFY REFRESH TOKEN
    // =====================================================================

    let decoded: JWTPayload;

    try {
      const secret = getRefreshTokenSecret();
      decoded = jwt.verify(refreshToken, secret) as JWTPayload;
    } catch (verifyErr) {
      const errorMessage = verifyErr instanceof Error ? verifyErr.message : 'Token verification failed';
      console.warn('[Auth] Refresh token verification failed:', errorMessage);
      return sendError(res, 401, 'Invalid or expired refresh token');
    }

    // =====================================================================
    // VALIDATE REFRESH TOKEN IN DATABASE
    // =====================================================================

    const user = await prisma.user.findUnique({
      where: { id: decoded.userId },
      select: {
        id: true,
        email: true,
        firstName: true,
        lastName: true,
        role: true,
        refreshToken: true,
      },
    });

    if (!user) {
      console.warn('[Auth] Refresh token for non-existent user', {
        userId: decoded.userId,
      });
      return sendError(res, 401, 'User not found');
    }

    // Validate refresh token matches what's stored (token rotation security)
    if (user.refreshToken !== refreshToken) {
      console.warn('[Auth] Refresh token mismatch - possible token reuse attack', {
        userId: user.id,
      });
      // Invalidate all tokens for this user (security measure)
      await prisma.user.update({
        where: { id: user.id },
        data: { refreshToken: null },
      });
      return sendError(res, 401, 'Invalid refresh token');
    }

    // =====================================================================
    // GENERATE NEW TOKENS
    // =====================================================================

    let newAccessToken: string;
    let newRefreshToken: string;

    try {
      newAccessToken = signAccessToken(user.id, user.role);
      newRefreshToken = signRefreshToken(user.id);
    } catch (tokenErr) {
      console.error('[Auth] Token generation failed during refresh:', tokenErr instanceof Error ? tokenErr.message : tokenErr);
      return sendError(res, 500, 'Token generation failed');
    }

    // =====================================================================
    // UPDATE REFRESH TOKEN IN DATABASE (Token Rotation)
    // =====================================================================

    try {
      await prisma.user.update({
        where: { id: user.id },
        data: { refreshToken: newRefreshToken },
      });
    } catch (dbErr) {
      console.error('[Auth] Failed to update refresh token:', dbErr instanceof Error ? dbErr.message : dbErr);
      return sendError(res, 500, 'Token refresh failed');
    }

    // Set new refresh token cookie
    res.cookie(REFRESH_TOKEN_COOKIE, newRefreshToken, getRefreshTokenCookieOptions());

    // =====================================================================
    // LOG & RESPOND
    // =====================================================================

    console.info('[Auth] Token refreshed successfully', {
      userId: user.id,
      duration: `${Date.now() - startTime}ms`,
    });

    return sendSuccess<{ accessToken: string; expiresIn: number }>(
      res,
      200,
      'Token refreshed',
      {
        accessToken: newAccessToken,
        expiresIn: 15 * 60, // 15 minutes in seconds
      }
    );
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : 'Token refresh failed';
    console.error('[Auth] Refresh token error:', {
      error: errorMessage,
      duration: `${Date.now() - startTime}ms`,
    });

    return sendError(
      res,
      500,
      'Token refresh failed. Please login again.',
      errorMessage
    );
  }
};

/**
 * LOGOUT: Invalidate refresh token and clear cookies
 * POST /auth/logout
 */
export const logoutUser = async (req: Request, res: Response): Promise<Response> => {
  const startTime = Date.now();

  try {
    const refreshToken = req.cookies?.[REFRESH_TOKEN_COOKIE];

    // =====================================================================
    // INVALIDATE REFRESH TOKEN IN DATABASE
    // =====================================================================

    if (refreshToken) {
      try {
        const result = await prisma.user.updateMany({
          where: { refreshToken },
          data: { refreshToken: null },
        });

        if (result.count > 0) {
          console.info('[Auth] User logged out', {
            userCount: result.count,
            duration: `${Date.now() - startTime}ms`,
          });
        }
      } catch (dbErr) {
        console.error('[Auth] Failed to invalidate refresh token:', dbErr instanceof Error ? dbErr.message : dbErr);
        // Continue with logout even if DB update fails
      }
    }

    // =====================================================================
    // CLEAR REFRESH TOKEN COOKIE
    // =====================================================================

    res.clearCookie(REFRESH_TOKEN_COOKIE, getRefreshTokenCookieOptions());

    return sendSuccess(res, 200, 'Logged out successfully');
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : 'Logout failed';
    console.error('[Auth] Logout error:', {
      error: errorMessage,
      duration: `${Date.now() - startTime}ms`,
    });

    // Still clear cookie even if error occurred
    res.clearCookie(REFRESH_TOKEN_COOKIE, getRefreshTokenCookieOptions());

    return sendSuccess(res, 200, 'Logged out successfully');
  }
};
