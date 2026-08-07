'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import { X } from 'lucide-react';

export interface WishlistItem {
  id: string;
  image: string;
  title: string;
  disc: string;
  price: number;
  originalPrice?: number;
  cart: string;
}

const initialWishlist: WishlistItem[] = [
  {
    id: '1',
    image: '/images/shirt.jpg',
    title: 'T-Shirt',
    disc: 'Cotton T-Shirt',
    price: 999,
    cart: 'Add to Cart',
  },
];

const WishList = () => {
  const [wishlist, setWishlist] = useState<WishlistItem[]>(initialWishlist);

  const handleRemove = (id: string) => {
    setWishlist((prev) => prev.filter((item) => item.id !== id));
  };

  const handleAddToCart = (item: WishlistItem) => {
    console.log('Add to cart:', item);
  };

  const getDiscountPercent = (price: number, originalPrice?: number) => {
    if (!originalPrice || originalPrice <= price) return null;
    return Math.round(((originalPrice - price) / originalPrice) * 100);
  };

  return (
    <div className="max-w-[1450px] mx-auto px-4 py-6">
      <h1 className="text-xl font-semibold mb-4">Favourites</h1>

      {wishlist.length === 0 ? (
        <p className="text-gray-500">Your wishlist is empty.</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {wishlist.map((item) => {
            const discount = getDiscountPercent(item.price, item.originalPrice);

            return (
              <div key={item.id} className="flex flex-col">
                <div className="relative bg-gray-100 aspect-square overflow-hidden">
                  <button
                    onClick={() => handleRemove(item.id)}
                    aria-label={`Remove ${item.title} from wishlist`}
                    className="absolute top-3 right-3 z-10 flex h-8 w-8 items-center justify-center rounded-full bg-white shadow hover:bg-gray-100 transition-colors"
                  >
                    <X size={16} />
                  </button>

                  <Image
                    src={item.image}
                    alt={item.title}
                    fill
                    className="object-contain p-6"
                    sizes="(max-width: 768px) 100vw, 33vw"
                  />
                </div>

                <div className="mt-3 space-y-1">
                  <p className="text-sm font-semibold">{item.title}</p>
                  <p className="text-sm text-gray-600">{item.disc}</p>

                  <div className="flex items-center gap-2 pt-1">
                    <span className="text-sm font-medium">
                      ₹{item.price.toLocaleString('en-IN')}
                    </span>
                    {item.originalPrice && (
                      <>
                        <span className="text-sm text-gray-400 line-through">
                          ₹{item.originalPrice.toLocaleString('en-IN')}
                        </span>
                        {discount && (
                          <span className="text-sm text-green-600">{discount}% off</span>
                        )}
                      </>
                    )}
                  </div>
                </div>

                <button
                  onClick={() => handleAddToCart(item)}
                  className="mt-3 w-full rounded-full border border-gray-300 py-2.5 text-sm font-medium hover:bg-gray-50 transition-colors"
                >
                  {item.cart}
                </button>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default WishList;
