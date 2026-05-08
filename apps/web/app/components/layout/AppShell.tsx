'use client';

import Header from '@/app/components/layout/Header/Header';
import Footer from '@/app/components/layout/Footer/Footer';

export default function AppShell({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />

      <main className="flex-1 pt-[102px]">{children}</main>

      <Footer />
    </div>
  );
}
