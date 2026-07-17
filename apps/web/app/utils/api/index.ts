export type ApiResponse<T> = {
  data?: T;
  success?: boolean;
  message?: string;
  error?: string;
  status?: number;
};

export async function getHealthcheck(): Promise<ApiResponse<{ ok: boolean }>> {
  return {
    data: { ok: true },
    status: 200,
  };
}
