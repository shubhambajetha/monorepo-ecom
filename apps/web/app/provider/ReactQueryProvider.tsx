'use client';

import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { useState } from 'react';

function makeQueryclient() {
  return new QueryClient({
    defaultOptions: {
      queries: {
        staleTime: 1000 * 6,
        retry: (failureCount, error: any) => {
          if (error?.status === 401 || error?.status === 403 || error?.response?.status === 401) {
            return false;
          }
          return failureCount < 2;
        },
      },
    },
  });
}

export default function ReactQueryProvider({ children }: { children: React.ReactNode }) {
  const [queryClient] = useState(() => makeQueryclient());

  return <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>;
}
