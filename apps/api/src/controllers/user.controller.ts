import { Request, Response } from 'express';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { prisma } from '../config/prisma';

const ACCESS_TOKEN_EXPIRES_IN = '15m';
const REFRESH_TOKEN_EXPIRES_IN = '7d';
const REFRESH_TOKEN_COOKIE = 'refreshToken';
const REFRESH_TOKEN_MAX_AGE = 7 * 24 * 60 * 60 * 1000;

const getAccessTokenSecret = () => process.env.JWT_ACCESS_SECRET || process.env.JWT_SECRET;

const getRefreshTokenSecret = () => process.env.JWT_REFRESH_SECRET;

const getRefreshTokenCookieOptions = () => ({
  httpOnly: true,
  secure: process.env.NODE_ENV === 'production',
  sameSite: 'strict' as const,
  maxAge: REFRESH_TOKEN_MAX_AGE,
});

const signAccessToken = (userId: string, role: string) => {
  const accessTokenSecret = getAccessTokenSecret();

  if (!accessTokenSecret) {
    throw new Error('Access token secret is not configured');
  }

  return jwt.sign({ userId, role }, accessTokenSecret, {
    expiresIn: ACCESS_TOKEN_EXPIRES_IN,
  });
};

const signRefreshToken = (userId: string) => {
  const refreshTokenSecret = getRefreshTokenSecret();

  if (!refreshTokenSecret) {
    throw new Error('Refresh token secret is not configured');
  }

  return jwt.sign({ userId }, refreshTokenSecret, {
    expiresIn: REFRESH_TOKEN_EXPIRES_IN,
  });
};

export const signupUser = async (req: Request, res: Response) => {
  try {
    const { firstName, lastName, email, password } = req.body;

    if (!firstName || !email || !password) {
      return res.status(400).json({
        message: 'Required fields missing',
      });
    }

    const normalizedEmail = String(email).trim().toLowerCase();

    const isAlreadyRegistered = await prisma.user.findUnique({
      where: { email: normalizedEmail },
    });

    if (isAlreadyRegistered) {
      return res.status(409).json({
        message: 'Email already exists',
      });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await prisma.user.create({
      data: {
        email: normalizedEmail,
        firstName: String(firstName).trim(),
        lastName: lastName ? String(lastName).trim() : null,
        password: hashedPassword,
      },
    });

    return res.status(201).json({
      message: 'User registered successfully',
      user: {
        id: user.id,
        firstName: user.firstName,
        lastName: user.lastName,
        email: user.email,
        role: user.role,
      },
    });
  } catch {
    return res.status(500).json({
      error: 'Failed to create user',
    });
  }
};

export const signinUser = async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({
        message: 'Email and password are required',
      });
    }

    const normalizedEmail = String(email).trim().toLowerCase();

    const user = await prisma.user.findUnique({
      where: { email: normalizedEmail },
    });

    if (!user) {
      return res.status(404).json({
        message: 'User not found',
      });
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);

    if (!isPasswordValid) {
      return res.status(401).json({
        message: 'Invalid credentials',
      });
    }

    const accessToken = signAccessToken(user.id, user.role);
    const refreshToken = signRefreshToken(user.id);

    await prisma.user.update({
      where: { id: user.id },
      data: { refreshToken },
    });

    res.cookie(REFRESH_TOKEN_COOKIE, refreshToken, getRefreshTokenCookieOptions());

    return res.status(200).json({
      message: 'Login successful',
      accessToken,
      user: {
        id: user.id,
        email: user.email,
        firstName: user.firstName,
        lastName: user.lastName,
        role: user.role,
      },
    });
  } catch (error) {
    const message =
      error instanceof Error && error.message.includes('secret')
        ? error.message
        : 'Something went wrong';

    return res.status(500).json({
      message,
    });
  }
};

export const refreshTokenHandler = async (req: Request, res: Response) => {
  const token = req.cookies?.[REFRESH_TOKEN_COOKIE] ?? null;

  if (!token) {
    return res.status(401).json({ message: 'No refresh token' });
  }

  try {
    const refreshTokenSecret = getRefreshTokenSecret();

    if (!refreshTokenSecret) {
      return res.status(500).json({ message: 'Refresh token secret is not configured' });
    }

    const decoded = jwt.verify(token, refreshTokenSecret) as { userId: string };

    const user = await prisma.user.findUnique({
      where: { id: decoded.userId },
    });

    if (!user || user.refreshToken !== token) {
      return res.status(403).json({ message: 'Invalid refresh token' });
    }

    const newRefreshToken = signRefreshToken(user.id);
    const newAccessToken = signAccessToken(user.id, user.role);

    await prisma.user.update({
      where: { id: user.id },
      data: { refreshToken: newRefreshToken },
    });

    res.cookie(REFRESH_TOKEN_COOKIE, newRefreshToken, getRefreshTokenCookieOptions());

    return res.json({ accessToken: newAccessToken });
  } catch {
    return res.status(403).json({ message: 'Invalid refresh token' });
  }
};

export const logoutUser = async (req: Request, res: Response) => {
  const token = req.cookies?.[REFRESH_TOKEN_COOKIE] ?? null;

  if (token) {
    await prisma.user.updateMany({
      where: { refreshToken: token },
      data: { refreshToken: null },
    });
  }

  res.clearCookie(REFRESH_TOKEN_COOKIE, getRefreshTokenCookieOptions());

  return res.json({
    message: 'Logged out successfully',
  });
};
