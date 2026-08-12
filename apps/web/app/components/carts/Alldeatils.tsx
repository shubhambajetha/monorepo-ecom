'use client';

import React from 'react';
import Carts from './Carts';
import Summary from './Summary';
import useGetCart from '@/app/hooks/cart/useGetCart';
import { CartItem } from '@/app/services/cartapi/cartapi';

interface AlldeatilsProps {
  getcarts?: CartItem[];
}

const Alldeatils = ({ getcarts = [] }: AlldeatilsProps) => {
  const { data: cartResponse, isLoading } = useGetCart();
  const cartItems = cartResponse?.data ?? getcarts;

  return (
    <main className="mx-auto w-full max-w-[1200px] px-4 py-8 sm:px-6 lg:px-8">
      {/* Page title */}
      <h1 className="mb-8 text-2xl font-semibold tracking-tight">Bag</h1>

      {/* Main cart layout */}
      <div className="grid grid-cols-1 gap-10 lg:grid-cols-[minmax(0,1fr)_380px] lg:items-start">
        {/* Cart products */}
        <section className="min-w-0">
          <Carts cartItems={cartItems} isLoading={isLoading} />
        </section>

        {/* Summary */}
        <aside className="lg:sticky lg:top-6">
          <div className="rounded-2xl border border-gray-200 bg-white p-5 sm:p-6">
            <Summary cartItems={cartItems} />
          </div>
        </aside>
      </div>
    </main>
  );
};

export default Alldeatils;
