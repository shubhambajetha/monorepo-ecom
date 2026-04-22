import { API_BASE } from '../lib/config';
import { API_ENDPOINTS } from '../constants';

type SignupPayload = {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
};

type SigninPayload = {
  email: string;
  password: string;
};

type AuthUser = {
  id: string;
  email: string;
  firstName: string;
  lastName: string | null;
  role?: string;
};

type SignupResponse = {
  message?: string;
  user: AuthUser;
};

type SigninResponse = {
  message: string;
  accessToken: string;
  user: AuthUser;
};

const getApiUrl = (endpoint: string) => {
  if (!API_BASE) {
    throw new Error('NEXT_PUBLIC_API_BASE is not configured');
  }

  return `${API_BASE}${endpoint}`;
};

const getErrorMessage = async (res: Response, fallbackMessage: string) => {
  try {
    const error = await res.json();

    if (typeof error?.message === 'string' && error.message.trim()) {
      return error.message;
    }

    if (typeof error?.error === 'string' && error.error.trim()) {
      return error.error;
    }
  } catch {}

  return fallbackMessage;
};

export const signup = async (data: SignupPayload): Promise<SignupResponse> => {
  const res = await fetch(getApiUrl(API_ENDPOINTS.SIGNUP), {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  });

  if (!res.ok) {
    throw new Error(await getErrorMessage(res, 'Signup failed'));
  }

  return res.json();
};

export const signin = async (data: SigninPayload): Promise<SigninResponse> => {
  const res = await fetch(getApiUrl(API_ENDPOINTS.SIGNIN), {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    credentials: 'include',
    body: JSON.stringify(data),
  });

  if (!res.ok) {
    throw new Error(await getErrorMessage(res, 'Signin failed'));
  }

  return res.json();
};

