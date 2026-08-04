'use client';

import React, { useState } from 'react';
import { Heart, ShirtIcon } from 'lucide-react';
import Link from 'next/link';
import { Product } from '@/app/types/product/productype';
import { resolveApiAssetUrl } from '@/app/lib/config';
import useGetWishlisht from '@/app/hooks/wishlisht/useGetWishlist';
import { createWishlist } from '@/app/services/wishlistapi/wishlistApi.ts';
import useCreateWishlist from '@/app/hooks/wishlisht/useCreateWishlist';

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
    collection?: string;
  };
}

const SingleCart: React.FC<SingleCartProps> = ({ product }) => {
  const createwishlist = useCreateWishlist();

  
  const [liked, setLiked] = useState(false);

  const displayTitle = product?.title;
  const displayCategory = product?.brand || (product as any)?.category;

  const hasDiscount = Boolean(product?.discountPrice && product.discountPrice < (product.price || 0));
  const displayPrice = hasDiscount ? product?.discountPrice! : product?.price;
  const displayOriginalPrice = hasDiscount ? product?.price : (product?.discountPrice ?? undefined);

  const rawImage = product?.thumbnail || product?.images?.[0];
  const imageUrl = resolveApiAssetUrl(rawImage) || rawImage;

  const displayColors = product?.colors?.length ? product.colors : undefined;
  const displaySizes = product?.sizes?.length ? product.sizes : undefined;

  const productUrl =
    product?.category && product?.collection && product?.slug
      ? `/${product.category}/${product.collection}/${product.slug}`
      : '#';

  return (
    <div className="group bg-white w-full rounded-sm overflow-hidden border border-gray-100 shadow-sm hover:shadow-md transition-shadow cursor-pointer flex flex-col justify-between">
      <div>
        {/* Image Area */}
        <div className="relative overflow-hidden w-full aspect-[4/5] bg-gray-100">
          <Link href={productUrl} className="block w-full h-full">
            {imageUrl ? (
              <img
                src={imageUrl}
                alt={displayTitle}
                className="w-full h-full object-cover transition-transform duration-400 group-hover:scale-105"
              />
            ) : (
              <div className="w-full h-full flex items-center justify-center bg-gray-200">
                <ShirtIcon size={80} className="text-white opacity-40" />
              </div>
            )}
          </Link>

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