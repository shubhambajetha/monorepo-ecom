'use client';

import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { useState } from 'react';

function makeQueryclient() {
  return new QueryClient({
    defaultOptions: {
      queries: {
        staleTime: 1000 * 6,
      },
    },
  });
}

export default function ReactQueryProvider({ children }: { children: React.ReactNode }) {
  const [queryClient] = useState(() => makeQueryclient());

  return <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>;
}
