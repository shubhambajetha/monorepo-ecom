'use client';

import Image from 'next/image';

import { Trash2, Plus, Heart, Clock } from 'lucide-react';

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

const Carts = () => {
  if (cartItems.length === 0) {
    return (
      <div className="max-w-7xl mx-auto px-6 py-6 mt-6 text-center">
        <h1 className="font-semibold text-xl">BAG</h1>
        <p className="mt-4 text-gray-500">Your bag is empty.</p>
      </div>
    );
  }

  return (
    <div className="w-full">
      <h1 className="font-semibold text-2xl mb-6">Bag</h1>

      <div className="space-y-4">
        {cartItems.map((item) => (
          <div
            key={item.id}
            className="rounded-3xl border border-gray-200 bg-white p-4 shadow-sm sm:p-5"
          >
            <div className="flex flex-col gap-4 lg:flex-row">
              <div className="relative w-full h-64 rounded-3xl bg-gray-100 lg:w-40 lg:h-40">
                <Image
                  src={item.image}
                  fill
                  alt={item.name}
                  className="rounded-3xl object-cover"
                />
              </div>

              <div className="flex-1">
                <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
                  <div>
                    <p className="text-lg font-semibold text-gray-900">{item.name}</p>
                    <p className="text-gray-500 text-sm mt-2">{item.discription}</p>
                    <p className="text-gray-500 text-sm mt-1">{item.color}</p>
                    <p className="text-sm underline mt-2">Size {item.size}</p>
                  </div>

                  <p className="text-lg font-semibold text-gray-900 whitespace-nowrap">
                    ₹ {item.price.toLocaleString('en-IN')}
                  </p>
                </div>

                <div className="mt-5 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                  <div className="flex items-center gap-3 rounded-full border border-gray-200 bg-gray-50 px-3 py-2">
                    <button aria-label="Remove item" className="text-gray-600 hover:text-gray-900">
                      <Trash2 size={16} />
                    </button>
                    <span className="text-sm font-medium w-6 text-center">{item.quantity}</span>
                    <button aria-label="Increase quantity" className="text-gray-600 hover:text-gray-900">
                      <Plus size={16} />
                    </button>
                  </div>

                  <button
                    aria-label="Save to wishlist"
                    className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-gray-200 text-gray-600 transition hover:bg-gray-100"
                  >
                    <Heart size={16} />
                  </button>
                </div>

                {item.stockLeft && item.stockLeft <= 3 && (
                  <div className="mt-4 flex items-center gap-2 text-sm text-amber-600">
                    <Clock size={14} />
                    <span>Only {item.stockLeft} left.</span>
                  </div>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Carts;