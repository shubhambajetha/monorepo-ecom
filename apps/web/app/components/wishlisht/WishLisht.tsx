'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import { X } from 'lucide-react';
import { WishlistItem } from '@/app/services/wishlistapi/wishlistApi.ts';

import useGetWishlist from '@/app/hooks/wishlisht/useGetWishlist';
import useDeleteWishlist from '@/app/hooks/wishlisht/useDeleteWishlist';

interface WishLishtProps {
  wishlist: WishlistItem[];
}

const WishLisht = ({ wishlist }: WishLishtProps) => {
  const { data: wishlistResponse } = useGetWishlist({
    success: true,
    message: '',
    data: wishlist,
  });
  const deleteWishlistMutation = useDeleteWishlist();

  const wishlishts = wishlistResponse?.data ?? wishlist;

  const handleRemove = (productId: string) => {
    deleteWishlistMutation.mutate(productId);
  };

  const handleAddToCart = (item: WishlistItem) => {
    console.log('Add to cart:', item);
  };

  return (
    <div className="max-w-[1450px] mx-auto px-4 py-6">
      <h1 className="text-xl font-semibold mb-4">Favourites</h1>

      {wishlishts.length === 0 ? (
        <p className="text-gray-500">Your wishlist is empty.</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {wishlishts.map((item) => {
            const discount = item.product.discountPrice
              ? Math.round(
                  ((item.product.price - item.product.discountPrice) / item.product.price) * 100
                )
              : null;

            return (
              <div key={item.id} className="flex flex-col">
                <div className="relative bg-gray-100 aspect-square overflow-hidden">
                  <button
                    onClick={() => handleRemove(item.productId)}
                    aria-label={`Remove ${item.product.title} from wishlist`}
                    className="absolute top-3 right-3 z-10 flex h-8 w-8 items-center justify-center rounded-full bg-white shadow hover:bg-gray-100 transition-colors"
                  >
                    <X size={16} />
                  </button>

                  <Image
                    src={item.product.thumbnail}
                    alt={item.product.title}
                    fill
                    className="object-contain p-6"
                    sizes="(max-width: 768px) 100vw, 33vw"
                  />
                </div>

                <div className="mt-3 space-y-1">
                  <p className="text-sm font-semibold">{item.product.title}</p>
                  <p className="text-sm text-gray-600">{item.product.description}</p>

                  <div className="flex items-center gap-2 pt-1">
                    <span className="text-sm font-medium">
                      ₹{(item.product.discountPrice ?? item.product.price).toLocaleString('en-IN')}
                    </span>
                    {item.product.discountPrice ? (
                      <>
                        <span className="text-sm text-gray-400 line-through">
                          ₹{item.product.price.toLocaleString('en-IN')}
                        </span>
                        {discount !== null && (
                          <span className="text-sm text-green-600">{discount}% off</span>
                        )}
                      </>
                    ) : null}
                  </div>
                </div>

                <button
                  onClick={() => handleAddToCart(item)}
                  className="mt-3 w-full rounded-full border border-gray-300 py-2.5 text-sm font-medium hover:bg-gray-50 transition-colors"
                >
                  Add to cart
                </button>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default WishLisht;
