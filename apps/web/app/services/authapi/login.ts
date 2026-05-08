import { AxiosError } from 'axios';
import { ZodError } from 'zod';
import { signinSchema, signupSchema, type SigninInput, type SignupInput } from '@repo/shared';
import { endpoints } from '@/app/constants/endpoint';
import api, { setAuthToken } from '../apiClient';

export type SignupPayload = SignupInput;
export type SigninPayload = SigninInput;

type ApiSuccessResponse<T> = {
  success: boolean;
  message: string;
  data: T;
  error?: string;
};

type ApiResponseBody<T> = ApiSuccessResponse<T> | T;

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

function unwrapApiData<T>(responseBody: ApiResponseBody<T>): T {
  if (
    responseBody &&
    typeof responseBody === 'object' &&
    'success' in responseBody &&
    'data' in responseBody
  ) {
    return responseBody.data as T;
  }

  return responseBody as T;
}

function getErrorMessage(error: unknown, fallbackMessage: string): string {
  if (error instanceof ZodError) {
    return error.issues[0]?.message || fallbackMessage;
  }

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
    const validatedPayload = signupSchema.parse(payload);
    const response = await api.post<ApiResponseBody<UserResponse>>(
      endpoints.auth.signup,
      validatedPayload
    );
    return unwrapApiData(response.data);
  } catch (error) {
    throw new Error(getErrorMessage(error, 'Signup failed'));
  }
}

export async function signin(payload: SigninPayload): Promise<SigninResponse> {
  try {
    const validatedPayload = signinSchema.parse(payload);
    const response = await api.post<ApiResponseBody<SigninResponse>>(
      endpoints.auth.signin,
      validatedPayload
    );
    const data = unwrapApiData(response.data);
    setAuthToken(data.accessToken);
    return data;
  } catch (error) {
    throw new Error(getErrorMessage(error, 'Login failed'));
  }
}

