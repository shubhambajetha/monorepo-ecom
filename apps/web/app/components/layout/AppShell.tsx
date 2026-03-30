'use client';

import Header from '@/app/components/layout/Header/Header';
import Footer from '@/app/components/layout/Footer/Footer';
import { usePathname } from 'next/navigation';

export default function AppShell({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const pathname = usePathname();
  const isAuthPage = pathname === '/auth' || pathname.startsWith('/auth/');

  if (isAuthPage) {
    return <>{children}</>;
  }

  return (
    <>
      <Header />
      {children}
      <Footer />
    </>
  );
}
