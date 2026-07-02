import type { Metadata } from 'next';
import localFont from 'next/font/local';
import AppShell from '@/app/components/layout/AppShell';
import './globals.css';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import ReactQueryProvider from '@/provider/ReactQueryProvider';

const geistSans = localFont({
  src: './fonts/GeistVF.woff',
  variable: '--font-geist-sans',
});
const geistMono = localFont({
  src: './fonts/GeistMonoVF.woff',
  variable: '--font-geist-mono',
});

export const metadata: Metadata = {
  title: 'owl ecomrse',
  description: 'an ecomrse site ',
};

const queryClient = new QueryClient();

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${geistSans.variable} ${geistMono.variable}`}>
         <ReactQueryProvider>
          <AppShell>{children}</AppShell>
        </ReactQueryProvider>
      </body>
    </html>
  );
}
