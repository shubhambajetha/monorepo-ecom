import React from 'react';
import Carts from './Carts';
import Summary from './Summary';

import { Product } from '@/app/types/product/productype';

export interface CartItem {
  id: string;
  userId: string;
  productId: string;
  quantity: number;
  createdAt: string;
  updatedAt: string;
  product: Product;
}

interface AlldeatilsProps {
  getcarts: CartItem[];
}

const Alldeatils = ({ getcarts }: AlldeatilsProps) => {
  return (
    <div>
      <Carts getcarts={getcarts} />

      <div className="rounded-3xl border border-gray-200 bg-white p-4 shadow-sm sm:p-6">
        <Summary />
      </div>
    </div>
  );
};

export default Alldeatils;