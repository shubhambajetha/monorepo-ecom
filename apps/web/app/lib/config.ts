const apiBaseUrl = process.env.NEXT_PUBLIC_API_BASE?.replace(/\/+$/, '');

export const config = {
  apiBaseUrl,
  timeoutMs: 15000,
};
