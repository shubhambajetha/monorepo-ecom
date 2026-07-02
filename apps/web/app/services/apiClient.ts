import axios, { AxiosInstance, AxiosError, InternalAxiosRequestConfig } from 'axios';
import { config, getApiBaseUrl } from '../lib/config';

import { endpoints } from '@/app/constants/endpoint';

const REFRESH_TOKEN_ENDPOINT = endpoints.auth.refresh;
const REFRESH_TIMEOUT_MS = 10000;
const JWT_EXPIRY_BUFFER_MS = 30000; // Refresh 30s before actual expiry
const MAX_RETRY_ATTEMPTS = 3;
const NETWORK_ERROR_RETRY_DELAY_MS = 1000;
const BACKOFF_MULTIPLIER = 2;

interface RefreshTokenResponse {
  accessToken: string;
  expiresIn?: number; // in seconds
}

interface ApiSuccessResponse<T> {
  success: boolean;
  message: string;
  data: T;
  error?: string;
}

type ApiResponseBody<T> = ApiSuccessResponse<T> | T;

interface RequestConfig extends InternalAxiosRequestConfig {
  _retry?: boolean;
  _retryCount?: number;
  _retryDelayMs?: number;
  _startTime?: number;
}

interface JWTPayload {
  exp?: number;
  iat?: number;
  [key: string]: any;
}

type UnknownRecord = Record<string, unknown>;

export type ApiError = Error & {
  status?: number;
  code?: string;
  details?: unknown;
};

function asRecord(value: unknown): UnknownRecord | null {
  if (!value || typeof value !== 'object') {
    return null;
  }

  return value as UnknownRecord;
}

function extractMessage(payload: unknown): string | null {
  if (typeof payload === 'string' && payload.trim().length > 0) {
    return payload;
  }

  const record = asRecord(payload);
  if (!record) {
    return null;
  }

  const directMessageKeys = ['message', 'error', 'detail'];
  for (const key of directMessageKeys) {
    const value = record[key];
    if (typeof value === 'string' && value.trim().length > 0) {
      return value;
    }
  }

  const directErrors = asRecord(record.errors);
  if (directErrors) {
    for (const value of Object.values(directErrors)) {
      if (Array.isArray(value)) {
        const firstMessage = value.find(
          (item) => typeof item === 'string' && item.trim().length > 0
        );
        if (typeof firstMessage === 'string') {
          return firstMessage;
        }
      }

      if (typeof value === 'string' && value.trim().length > 0) {
        return value;
      }
    }
  }

  const nestedData = asRecord(record.data);
  if (!nestedData) {
    return null;
  }

  for (const key of directMessageKeys) {
    const value = nestedData[key];
    if (typeof value === 'string' && value.trim().length > 0) {
      return value;
    }
  }

  const nestedErrors = asRecord(nestedData.errors);
  if (!nestedErrors) {
    return null;
  }

  for (const value of Object.values(nestedErrors)) {
    if (Array.isArray(value)) {
      const firstMessage = value.find((item) => typeof item === 'string' && item.trim().length > 0);
      if (typeof firstMessage === 'string') {
        return firstMessage;
      }
    }

    if (typeof value === 'string' && value.trim().length > 0) {
      return value;
    }
  }

  return null;
}

export function normalizeApiError(error: unknown): ApiError {
  if (axios.isAxiosError(error)) {
    const axiosError = error as AxiosError<unknown>;
    const apiError = new Error(
      extractMessage(axiosError.response?.data) ?? axiosError.message ?? 'Request failed'
    ) as ApiError;

    apiError.status = axiosError.response?.status;
    apiError.code = axiosError.code;
    apiError.details = axiosError.response?.data;
    return apiError;
  }
  if (error instanceof Error) {
    return error as ApiError;
  }
  return new Error('Unknown request error') as ApiError;
}

type AuthEventListener = (event: AuthEvent) => void;

interface AuthEvent {
  type: 'logout' | 'token_refresh' | 'refresh_failed';
  timestamp: number;
  reason?: string;
}

class AuthEventEmitter {
  private listeners: Set<AuthEventListener> = new Set();

  on(listener: AuthEventListener): void {
    this.listeners.add(listener);
  }

  off(listener: AuthEventListener): void {
    this.listeners.delete(listener);
  }

  emit(event: AuthEvent): void {
    this.listeners.forEach((listener) => {
      try {
        listener(event);
      } catch (err) {
        console.error('[AuthEventEmitter] Error in listener:', err);
      }
    });
  }

  clear(): void {
    this.listeners.clear();
  }
}

const authEventEmitter = new AuthEventEmitter();

class TokenRefreshManager {
  private isRefreshing = false;
  private refreshPromise: Promise<string> | null = null;
  private resolveRefresh: ((token: string) => void) | null = null;
  private rejectRefresh: ((error: Error) => void) | null = null;
  private requestQueue: Array<(token: string) => void> = [];
  private rejectionQueue: Array<(error: Error) => void> = [];
  private refreshAbortController: AbortController | null = null;

  /**
   * Initiate token refresh lock
   */
  startRefresh(): boolean {
    if (this.isRefreshing) return false;
    this.isRefreshing = true;
    this.refreshAbortController = new AbortController();
    return true;
  }

  isCurrentlyRefreshing(): boolean {
    return this.isRefreshing;
  }

  /**
   * Create shared promise for refresh
   */
  createRefreshPromise(): Promise<string> {
    this.refreshPromise = new Promise((resolve, reject) => {
      this.resolveRefresh = resolve;
      this.rejectRefresh = reject;
    });
    return this.refreshPromise;
  }

  getRefreshPromise(): Promise<string> | null {
    return this.refreshPromise;
  }

  /**
   * Enqueue request to retry after refresh
   */
  enqueueRequest(callback: (token: string) => void): void {
    this.requestQueue.push(callback);
  }

  /**
   * Enqueue rejection handler (called on refresh failure)
   */
  enqueueRejection(callback: (error: Error) => void): void {
    this.rejectionQueue.push(callback);
  }

  /**
   * Process all queued requests on successful refresh
   */
  processQueue(token: string): void {
    const queue = this.requestQueue;
    this.requestQueue = [];

    queue.forEach((cb) => {
      try {
        cb(token);
      } catch (err) {
        console.error('[TokenRefreshManager] Error processing queued request:', err);
      }
    });
  }

  /**
   * Reject all queued requests on refresh failure
   */
  rejectQueue(error: Error): void {
    const rejections = this.rejectionQueue;
    this.rejectionQueue = [];

    rejections.forEach((cb) => {
      try {
        cb(error);
      } catch (err) {
        console.error('[TokenRefreshManager] Error processing rejection queue:', err);
      }
    });

    const queue = this.requestQueue;
    this.requestQueue = [];
    queue.forEach(() => {
      try {
        // Callbacks won't be called, but we need to handle them
      } catch (err) {
        console.error('[TokenRefreshManager] Error clearing queue:', err);
      }
    });
  }

  /**
   * Resolve the shared refresh promise
   */
  resolveRefreshPromise(token: string): void {
    if (this.resolveRefresh) {
      this.resolveRefresh(token);
    }
  }

  /**
   * Reject the shared refresh promise
   */
  rejectRefreshPromise(error: Error): void {
    if (this.rejectRefresh) {
      this.rejectRefresh(error);
    }
  }

  /**
   * Clear refresh state
   */
  clearRefresh(): void {
    this.isRefreshing = false;
    this.refreshPromise = null;
    this.resolveRefresh = null;
    this.rejectRefresh = null;

    if (this.refreshAbortController) {
      this.refreshAbortController.abort();
      this.refreshAbortController = null;
    }
  }

  getAbortSignal(): AbortSignal | undefined {
    return this.refreshAbortController?.signal;
  }

  getQueueLength(): number {
    return this.requestQueue.length;
  }
}

const tokenManager = new TokenRefreshManager();

class TokenStorage {
  private accessToken: string | null = null;
  private tokenExpiryTime: number | null = null;

  setAccessToken(token: string, expiresIn?: number): void {
    this.accessToken = token;
    if (expiresIn) {
      this.tokenExpiryTime = Date.now() + expiresIn * 1000;
    } else {
      // Try to decode JWT and extract expiry
      this.tokenExpiryTime = this.extractJWTExpiry(token);
    }
  }

  getAccessToken(): string | null {
    return this.accessToken;
  }

  clearAccessToken(): void {
    this.accessToken = null;
    this.tokenExpiryTime = null;
  }

  /**
   * Check if token should be refreshed before expiry
   */
  shouldRefreshToken(): boolean {
    if (!this.tokenExpiryTime) return false;
    const now = Date.now();
    return now >= this.tokenExpiryTime - JWT_EXPIRY_BUFFER_MS;
  }

  /**
   * Extract expiry time from JWT
   */
  private extractJWTExpiry(token: string): number | null {
    try {
      const payload = this.decodeJWT(token);
      if (payload.exp) {
        return payload.exp * 1000; // Convert to milliseconds
      }
    } catch (err) {
      console.debug('[TokenStorage] Could not decode JWT:', err);
    }
    return null;
  }

  /**
   * Simple JWT decoder (doesn't validate signature)
   */
  private decodeJWT(token: string): JWTPayload {
    const parts = token.split('.');

    if (parts.length !== 3 || !parts[1]) {
      throw new Error('Invalid JWT format');
    }

    try {
      const base64 = parts[1].replace(/-/g, '+').replace(/_/g, '/');

      const decoded = JSON.parse(atob(base64));

      return decoded;
    } catch (err) {
      throw new Error('Failed to decode JWT');
    }
  }
}

const tokenStorage = new TokenStorage();

const api: AxiosInstance = axios.create({
  baseURL: getApiBaseUrl(),
  timeout: config.timeoutMs || 30000,
  withCredentials: true,
  headers: {
    'Content-Type': 'application/json',
  },
});

/**
 * REQUEST INTERCEPTOR: Attach access token + pre-expiry check
 */
api.interceptors.request.use(
  async (config: RequestConfig) => {
    try {
      // Pre-emptive token refresh if close to expiry
      if (tokenStorage.shouldRefreshToken() && !tokenManager.isCurrentlyRefreshing()) {
        console.debug('[API] Token close to expiry, pre-emptive refresh');
        try {
          await performTokenRefresh();
        } catch (err) {
          console.warn('[API] Pre-emptive token refresh failed:', err);
        }
      }

      // Attach access token if available
      const accessToken = tokenStorage.getAccessToken();
      if (accessToken) {
        config.headers.Authorization = `Bearer ${accessToken}`;
      }
    } catch (err) {
      console.error('[API] Error in request interceptor:', err);
    }

    return config;
  },
  (error) => {
    console.error('[API] Request interceptor error:', error);
    return Promise.reject(error);
  }
);

/**
 * RESPONSE INTERCEPTOR: Handle 401 + network errors with exponential backoff
 */
api.interceptors.response.use(
  (response) => response,
  async (error: AxiosError) => {
    const originalRequest = error.config as RequestConfig;

    // Not an AxiosError or missing config, reject
    if (!originalRequest || !axios.isAxiosError(error)) {
      return Promise.reject(error);
    }

    if (error.response?.status === 401) {
      return handleUnauthorized(originalRequest);
    }

    if (isNetworkError(error)) {
      return handleNetworkError(error, originalRequest);
    }

    // Other errors, don't retry
    return Promise.reject(error);
  }
);

async function handleUnauthorized(originalRequest: RequestConfig): Promise<any> {
  // Prevent infinite retry loops
  if (originalRequest._retry) {
    console.warn('[API] Token refresh already attempted, rejecting');
    handleAuthFailure('Token refresh failed');
    return Promise.reject(new AxiosError('Unauthorized after token refresh'));
  }

  originalRequest._retry = true;

  // If refresh already in progress, wait for it
  if (tokenManager.isCurrentlyRefreshing()) {
    console.debug('[API] Token refresh in progress, waiting...');
    return waitForRefresh(originalRequest);
  }

  // Attempt refresh
  if (!tokenManager.startRefresh()) {
    return waitForRefresh(originalRequest);
  }

  try {
    console.debug('[API] Starting token refresh');
    const newToken = await performTokenRefresh();

    tokenManager.resolveRefreshPromise(newToken);
    tokenManager.clearRefresh();

    // Attach new token and retry
    originalRequest.headers.Authorization = `Bearer ${newToken}`;
    tokenManager.processQueue(newToken);

    console.debug('[API] Token refreshed, retrying request');
    return api(originalRequest);
  } catch (refreshError) {
    tokenManager.rejectRefreshPromise(
      refreshError instanceof Error ? refreshError : new Error('Token refresh failed')
    );
    tokenManager.rejectQueue(
      refreshError instanceof Error ? refreshError : new Error('Token refresh failed')
    );
    tokenManager.clearRefresh();

    console.error('[API] Token refresh failed:', refreshError);
    handleAuthFailure('Token refresh failed');

    return Promise.reject(refreshError);
  }
}

/**
 * Handle network errors with exponential backoff
 */
async function handleNetworkError(error: AxiosError, originalRequest: RequestConfig): Promise<any> {
  originalRequest._retryCount = (originalRequest._retryCount || 0) + 1;
  originalRequest._retryDelayMs = originalRequest._retryDelayMs || NETWORK_ERROR_RETRY_DELAY_MS;

  // Check if we've exceeded max retries
  if (originalRequest._retryCount > MAX_RETRY_ATTEMPTS) {
    console.warn('[API] Max retry attempts exceeded for network error');
    return Promise.reject(error);
  }

  // Calculate exponential backoff
  const delay =
    originalRequest._retryDelayMs * Math.pow(BACKOFF_MULTIPLIER, originalRequest._retryCount - 1);

  console.debug(
    `[API] Network error, retrying in ${delay}ms (attempt ${originalRequest._retryCount}/${MAX_RETRY_ATTEMPTS})`
  );

  // Wait before retrying
  await new Promise((resolve) => setTimeout(resolve, delay));

  return api(originalRequest);
}

/**
 * Wait for ongoing refresh without polling
 */
function waitForRefresh(originalRequest: RequestConfig): Promise<any> {
  return new Promise((resolve, reject) => {
    const refreshPromise = tokenManager.getRefreshPromise();

    if (!refreshPromise) {
      reject(new Error('No refresh promise available'));
      return;
    }

    refreshPromise
      .then((token) => {
        originalRequest.headers.Authorization = `Bearer ${token}`;
        resolve(api(originalRequest));
      })
      .catch((err) => {
        reject(err);
      });

    // Enqueue rejection callback for failure case
    tokenManager.enqueueRejection((error: Error) => {
      reject(error);
    });
  });
}

/**
 * Perform token refresh (actual HTTP call)
 */
async function performTokenRefresh(): Promise<string> {
  const signal = tokenManager.getAbortSignal();

  try {
    const response = await axios.post<ApiResponseBody<RefreshTokenResponse>>(
      `${getApiBaseUrl()}${REFRESH_TOKEN_ENDPOINT}`,
      {},
      {
        withCredentials: true, // HttpOnly cookies
        timeout: REFRESH_TIMEOUT_MS,
        signal,
      }
    );

    const data = unwrapApiData(response.data);

    if (!data?.accessToken) {
      throw new Error('No access token in refresh response');
    }

    // Store token with expiry info if available
    tokenStorage.setAccessToken(data.accessToken, data.expiresIn);

    console.debug('[API] Token refreshed successfully');
    authEventEmitter.emit({
      type: 'token_refresh',
      timestamp: Date.now(),
    });

    return data.accessToken;
  } catch (err) {
    console.error('[API] Token refresh request failed:', err);

    if (axios.isAxiosError(err) && err.code === 'ERR_CANCELED') {
      throw new Error('Token refresh was canceled');
    }

    throw err;
  }
}

/**
 * Handle authentication failure
 */
function handleAuthFailure(reason: string): void {
  tokenStorage.clearAccessToken();

  authEventEmitter.emit({
    type: 'logout',
    timestamp: Date.now(),
    reason,
  });

  // Let UI layer handle navigation
  if (typeof window !== 'undefined') {
    // Could emit event or use app-level state management instead
    console.warn('[API] Authentication failed:', reason);
  }
}

/**
 * Check if error is a network error (not HTTP error)
 */
function isNetworkError(error: AxiosError): boolean {
  return (
    !error.response &&
    (error.code === 'ECONNABORTED' ||
      error.code === 'ENOTFOUND' ||
      error.code === 'ECONNREFUSED' ||
      error.code === 'ERR_NETWORK' ||
      error.message === 'Network Error')
  );
}

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

/**
 * Set the initial access token (call after login)
 */
export function setAuthToken(token: string, expiresIn?: number): void {
  tokenStorage.setAccessToken(token, expiresIn);
}

/**
 * Clear all auth data (call on logout)
 */
export function clearAuth(): void {
  tokenStorage.clearAccessToken();
  tokenManager.clearRefresh();
  authEventEmitter.emit({
    type: 'logout',
    timestamp: Date.now(),
    reason: 'Manual logout',
  });
}

/**
 * Subscribe to auth events
 */
export function onAuthEvent(listener: AuthEventListener): () => void {
  authEventEmitter.on(listener);
  return () => authEventEmitter.off(listener);
}

export default api;
export const apiClient = api;
export { TokenRefreshManager, tokenManager, TokenStorage, tokenStorage, authEventEmitter,};