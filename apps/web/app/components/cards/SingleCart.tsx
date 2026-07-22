'use client';

import React, { useState } from 'react';
import { Heart, ShirtIcon } from 'lucide-react';
import Link from 'next/link';
import { Product } from '@/app/types/product/productype';
import { resolveApiAssetUrl } from '@/app/lib/config';

export interface SingleCartProps {
  product?: Partial<Product> & {
    title?: string;
    category?: string;
    brand?: string;
    price?: number;
    originalPrice?: number;
    discountPrice?: number | null;
    colors?: string[];
    sizes?: string[];
    thumbnail?: string;
    images?: string[];
    slug?: string;
    id?: string;
  };
  title?: string;
  category?: string;
  price?: number;
  originalPrice?: number;
  colors?: string[];
  bgColor?: string;
}

const SingleCart: React.FC<SingleCartProps> = ({
  product,
  title = 'Ben 10: Omnitrix',
  category = 'Oversized T-Shirts',
  price = 1099,
  originalPrice = 1399,
  colors = ['#2563eb', '#000000', '#dc2626', '#16a34a'],
  bgColor = 'from-[#c9b99a] to-[#a0856a]',
}) => {
  const [liked, setLiked] = useState(false);

  const displayTitle = product?.title || title;
  const displayCategory = product?.brand || (product as any)?.category || category;

  const hasDiscount = Boolean(product?.discountPrice && product.discountPrice < (product.price || 0));
  const displayPrice = product
    ? (hasDiscount ? product.discountPrice! : product.price)
    : price;
  const displayOriginalPrice = product
    ? (hasDiscount ? product.price : (product.discountPrice ?? undefined))
    : originalPrice;

  const rawImage = product?.thumbnail || product?.images?.[0];
  const imageUrl = resolveApiAssetUrl(rawImage) || rawImage;

  const displayColors = product?.colors?.length ? product.colors : colors;
  const displaySizes = product?.sizes?.length ? product.sizes : undefined;

  const productUrl = product?.slug
    ? `/product-details/${product.slug}`
    : product?.id
    ? `/product-details?id=${product.id}`
    : '#';

  return (
    <div className="group bg-white w-full rounded-sm overflow-hidden border border-gray-100 shadow-sm hover:shadow-md transition-shadow cursor-pointer flex flex-col justify-between">
      <div>
        {/* Image Area */}
        <div className="relative overflow-hidden w-full aspect-[4/5] bg-gray-100">
          {imageUrl ? (
            <Link href={productUrl} className="block w-full h-full">
              <img
                src={imageUrl}
                alt={displayTitle}
                className="w-full h-full object-cover transition-transform duration-400 group-hover:scale-105"
              />
            </Link>
          ) : (
            <Link href={productUrl} className="block w-full h-full">
              <div
                className={`w-full h-full flex items-center justify-center bg-gradient-to-br ${bgColor} transition-transform duration-400 group-hover:scale-105`}
              >
                <ShirtIcon size={80} className="text-white opacity-30" />
              </div>
            </Link>
          )}

          {/* Wishlist Button */}
          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              e.preventDefault();
              setLiked(!liked);
            }}
            className="absolute top-2 right-2 bg-white/90 backdrop-blur-sm rounded-full p-2 shadow-sm transition-transform duration-200 hover:scale-110 z-10"
            aria-label="Add to wishlist"
          >
            <Heart
              size={16}
              className={`transition-colors duration-200 ${
                liked ? 'fill-red-500 stroke-red-500' : 'stroke-gray-400'
              }`}
            />
          </button>
        </div>

        {/* Info Area */}
        <div className="p-3">
          <Link href={productUrl} className="block group-hover:text-red-600 transition-colors">
            <h3 className="font-bold text-[13px] text-gray-900 leading-tight truncate">
              {displayTitle}
            </h3>
          </Link>
          <p className="text-[11px] font-medium text-gray-400 mt-[2px] truncate">
            {displayCategory}
          </p>

          <div className="flex items-center justify-between mt-2">
            <span className="font-bold text-[15px] text-gray-900">
              ₹{displayPrice?.toLocaleString()}
            </span>
            {displayOriginalPrice && displayOriginalPrice > displayPrice! && (
              <span className="text-[11px] text-gray-400 line-through">
                ₹{displayOriginalPrice.toLocaleString()}
              </span>
            )}
          </div>

          {/* Sizes or Colors */}
          {displaySizes && displaySizes.length > 0 ? (
            <div className="flex gap-1 mt-2 flex-wrap">
              {displaySizes.map((size) => (
                <span
                  key={size}
                  className="text-[10px] border border-gray-200 rounded px-[6px] py-[2px] text-gray-600 hover:border-black hover:text-black transition-colors cursor-pointer"
                >
                  {size}
                </span>
              ))}
            </div>
          ) : displayColors && displayColors.length > 0 ? (
            <div className="flex gap-1 mt-2 flex-wrap">
              {displayColors.map((col, idx) => (
                <span
                  key={idx}
                  className="text-[10px] border border-gray-200 rounded px-[6px] py-[2px] text-gray-600 hover:border-black hover:text-black transition-colors cursor-pointer"
                >
                  {col}
                </span>
              ))}
            </div>
          ) : null}
        </div>
      </div>
    </div>
  );
};

export default SingleCart;
