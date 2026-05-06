import { AxiosError } from 'axios';
import { endpoints } from '@/app/constants/endpoint';
import api, { setAuthToken } from '../apiClient';

export type SignupPayload = {
  firstName: string;
  lastName?: string;
  email: string;
  password: string;
  passwordConfirm: string;
};

export type SigninPayload = {
  email: string;
  password: string;
};

type ApiSuccessResponse<T> = {
  success: boolean;
  message: string;
  data: T;
  error?: string;
};

type ApiErrorResponse = {
  message?: string;
  error?: string;
};

export type UserResponse = {
  id: string;
  email: string;
  firstName: string;
  lastName: string | null;
  role: string;
};

export type SigninResponse = {
  accessToken: string;
  user: UserResponse;
};

function getErrorMessage(error: unknown, fallbackMessage: string): string {
  if (error instanceof AxiosError) {
    const responseData = error.response?.data as ApiErrorResponse | undefined;

    return (
      responseData?.message ||
      responseData?.error ||
      error.message ||
      fallbackMessage
    );
  }

  if (error instanceof Error) {
    return error.message;
  }

  return fallbackMessage;
}

export async function signup(payload: SignupPayload): Promise<UserResponse> {
  try {
    const response = await api.post<ApiSuccessResponse<UserResponse>>(endpoints.auth.signup, payload);
    return response.data.data;
  } catch (error) {
    throw new Error(getErrorMessage(error, 'Signup failed'));
  }
}

export async function signin(payload: SigninPayload): Promise<SigninResponse> {
  try {
    const response = await api.post<ApiSuccessResponse<SigninResponse>>(endpoints.auth.signin, payload);
    setAuthToken(response.data.data.accessToken);
    return response.data.data;
  } catch (error) {
    throw new Error(getErrorMessage(error, 'Login failed'));
  }
}

