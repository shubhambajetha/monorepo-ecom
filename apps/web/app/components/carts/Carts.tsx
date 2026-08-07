'use client';

import Image from 'next/image';
import React, { useState } from 'react';
import { Trash2, Plus, Minus, Heart, Clock } from 'lucide-react';

interface CartItem {
  id: string;
  name: string;
  image: string;
  price: number;
  discription: string;
  color: string;
  size: string;
  quantity: number;
  stockLeft?: number;
}

const cartItems: CartItem[] = [
  {
    id: '1',
    name: 'Nike Universe',
    image: '/nike-logo.png',
    price: 5495,
    discription: "Women's High-Waisted 7/8 Leggings with No Front",
    color: 'Black',
    size: 'XS',
    quantity: 1,
    stockLeft: 2,
  },
];

const Cart = () => {
  if (cartItems.length === 0) {
    return (
      <div className="max-w-7xl mx-auto px-6 py-6 mt-6 text-center">
        <h1 className="font-semibold text-xl">BAG</h1>
        <p className="mt-4 text-gray-500">Your bag is empty.</p>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-6 py-6 mt-6">
      <h1 className="font-semibold text-xl mb-4">Bag</h1>

      <div className="flex flex-col divide-y divide-gray-200">
        {cartItems.map((item) => (
          <div key={item.id} className="py-6">
            <div className="flex gap-4">
              <div className="relative w-28 h-28 shrink-0 bg-gray-100">
                <Image
                  src={item.image}
                  fill
                  alt={item.name}
                  className="object-cover"
                />
              </div>

              <div className="flex-1 flex justify-between">
                <div>
                  <p className="font-semibold">{item.name}</p>
                  <p className="text-gray-600 text-sm mt-1">{item.discription}</p>
                  <p className="text-gray-600 text-sm">{item.color}</p>
                  <p className="text-sm underline mt-1">Size {item.size}</p>
                </div>
                <p className="font-semibold whitespace-nowrap ml-4">
                  ₹ {item.price.toLocaleString('en-IN')}
                </p>
              </div>
            </div>

            <div className="flex items-center gap-4 mt-4 ">
              <div className="flex items-center gap-3 border rounded-full px-3 py-1.5">
                <button aria-label="Remove item">
                  <Trash2 size={16} />
                </button>
                <span className="text-sm w-4 text-center">{item.quantity}</span>
                <button aria-label="Increase quantity">
                  <Plus size={16} />
                </button>
              </div>
              <button
                aria-label="Save to wishlist"
                className="border rounded-full w-9 h-9 flex items-center justify-center"
              >
                <Heart size={16} />
              </button>
            </div>

            {item.stockLeft && item.stockLeft <= 3 && (
              <div className="flex items-center gap-2 mt-3  text-amber-600 text-sm">
                <Clock size={14} />
                <span>Only {item.stockLeft} left.</span>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default Cart;