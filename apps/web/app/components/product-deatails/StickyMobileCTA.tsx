'use client';

import React, { useEffect, useState } from 'react';
import AddToCart from '@/app/common/AddToCart';
import WishLisht from '@/app/common/WishLisht';

interface StickyMobileCTAProps {
  productId: string;
  title: string;
  price: number;
  discountPrice?: number | null;
  thumbnail: string;
  selectedSize: string | null;
  onSelectSizeClick: () => void;
}

export default function StickyMobileCTA({
  productId,
  title,
  price,
  discountPrice,
  thumbnail,
  selectedSize,
  onSelectSizeClick,
}: StickyMobileCTAProps) {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      // Show sticky bar once user scrolls down past 450px
      if (window.scrollY > 450) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  if (!isVisible) return null;

  const hasDiscount = typeof discountPrice === 'number' && discountPrice < price;
  const displayPrice = hasDiscount ? discountPrice! : price;

  return (
    <div className="lg:hidden fixed bottom-0 left-0 right-0 z-40 bg-white/95 backdrop-blur-md border-t border-gray-200 px-4 py-3 shadow-[0_-4px_20px_rgba(0,0,0,0.08)] animate-in slide-in-from-bottom-5 duration-250">
      <div className="flex items-center gap-3 max-w-md mx-auto">
        {/* Thumb & Details */}
        <div className="flex items-center gap-2.5 min-w-0 flex-1">
          <div className="w-11 h-12 rounded-lg bg-gray-100 overflow-hidden flex-shrink-0 border border-gray-200">
            <img src={thumbnail} alt={title} className="w-full h-full object-cover" />
          </div>
          <div className="min-w-0">
            <h4 className="text-xs font-bold text-gray-900 truncate leading-tight">{title}</h4>
            <div className="flex items-baseline gap-1.5 mt-0.5">
              <span className="text-xs font-extrabold text-gray-900">
                ₹{displayPrice.toLocaleString('en-IN')}
              </span>
              {hasDiscount && (
                <span className="text-[10px] line-through text-gray-400">
                  ₹{price.toLocaleString('en-IN')}
                </span>
              )}
            </div>
            {selectedSize ? (
              <span className="text-[10px] text-gray-500 font-medium">Size: {selectedSize}</span>
            ) : (
              <button
                onClick={onSelectSizeClick}
                className="text-[10px] text-blue-600 font-semibold underline"
              >
                Select size
              </button>
            )}
          </div>
        </div>

        {/* CTA Buttons */}
        <div className="flex items-center gap-2">
          <WishLisht
            productId={productId}
            className="w-10 h-10 rounded-xl border border-gray-200 flex items-center justify-center text-gray-600 hover:text-red-500 bg-white shadow-2xs"
          />
          <div className="w-36">
            <AddToCart productId={productId} className="py-2.5 text-xs font-bold rounded-xl" />
          </div>
        </div>
      </div>
    </div>
  );
}
