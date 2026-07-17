const defaultApiBaseUrl =
  process.env.NODE_ENV === 'development' ? 'http://localhost:4000/api/v1' : undefined;

const apiBaseUrl = (process.env.NEXT_PUBLIC_API_BASE || defaultApiBaseUrl)?.replace(/\/+$/, '');

export function getApiBaseUrl(): string {
  if (!apiBaseUrl) {
    throw new Error('NEXT_PUBLIC_API_BASE is not configured');
  }

  return apiBaseUrl;
}

export function getApiOrigin(): string {
  return getApiBaseUrl().replace(/\/api\/v\d+$/, '');
}

export function resolveApiAssetUrl(assetPath?: string | null): string | undefined {
  if (!assetPath) {
    return undefined;
  }

  if (/^https?:\/\//i.test(assetPath)) {
    return assetPath;
  }

  const normalizedPath = assetPath.startsWith('/') ? assetPath : `/${assetPath}`;
  return `${getApiOrigin()}${normalizedPath}`;
}

export const config = {
  apiBaseUrl,
  timeoutMs: 15000,
};
