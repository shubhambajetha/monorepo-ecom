'use client';

import React from 'react';
import { ShirtIcon, Star, Sparkles } from 'lucide-react';
import Link from 'next/link';
import { Product } from '@/app/types/product/productype';
import { Collection } from '@/app/types/collection/collectiontype';
import { resolveApiAssetUrl } from '@/app/lib/config';
import WishLisht from '@/app/common/WishLisht';

export interface SingleCartProps {
  product?: Omit<Partial<Product>, 'collection'> & {
    title?: string;
    category?: string | any;
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
    rating?: number;
    isSpotlight?: boolean;
    isFeatured?: boolean;
    stock?: number;
    collection?: string | Collection | any;
  };
}

const SingleCart: React.FC<SingleCartProps> = ({ product }) => {
  const displayTitle = product?.title || 'Product Item';
  const displayBrand = product?.brand || 'Exclusive';

  const hasDiscount = Boolean(
    typeof product?.discountPrice === 'number' &&
      product.discountPrice < (product.price || 0) &&
      product.discountPrice > 0
  );
  const displayPrice = hasDiscount ? product?.discountPrice! : product?.price || 0;
  const displayOriginalPrice = hasDiscount ? product?.price : (product?.originalPrice ?? undefined);
  const discountPercent =
    hasDiscount && product?.price
      ? Math.round(((product.price - product.discountPrice!) / product.price) * 100)
      : 0;

  const rawImage = product?.thumbnail || product?.images?.[0];
  const imageUrl = resolveApiAssetUrl(rawImage) || rawImage;

  const displayColors = product?.colors?.length ? product.colors : undefined;
  const displaySizes = product?.sizes?.length ? product.sizes : undefined;

  const catStr =
    typeof product?.category === 'object'
      ? product?.category?.slug || product?.category?.name || 'men'
      : product?.category || 'men';

  const colStr =
    typeof product?.collection === 'object'
      ? product?.collection?.slug || product?.collection?.title || 'clothing'
      : product?.collection || 'clothing';

  const productUrl = product?.slug
    ? `/${catStr}/${colStr}/${product.slug}`
    : `/product-details`;

  const isOutOfStock = typeof product?.stock === 'number' && product.stock <= 0;

  return (
    <div className="group relative bg-white w-full rounded-2xl overflow-hidden border border-gray-200/80 shadow-2xs hover:shadow-xl transition-all duration-300 flex flex-col justify-between select-none">
      <div>
        {/* Image Area */}
        <div className="relative overflow-hidden w-full aspect-[3/4] bg-gray-100">
          <Link href={productUrl} className="block w-full h-full">
            {imageUrl ? (
              <img
                src={imageUrl}
                alt={displayTitle}
                loading="lazy"
                className="w-full h-full object-cover transition-transform duration-500 ease-out group-hover:scale-106"
              />
            ) : (
              <div className="w-full h-full flex flex-col items-center justify-center bg-gray-100 text-gray-300">
                <ShirtIcon size={56} className="opacity-40" />
                <span className="text-[11px] text-gray-400 mt-1">No Image</span>
              </div>
            )}
          </Link>

          {/* Top Badges */}
          <div className="absolute top-2.5 left-2.5 z-10 flex flex-col gap-1 pointer-events-none">
            {hasDiscount && (
              <span className="bg-red-600 text-white text-[10px] font-extrabold px-2 py-0.5 rounded-md uppercase tracking-wider shadow-xs">
                {discountPercent}% OFF
              </span>
            )}
            {product?.isSpotlight && (
              <span className="bg-amber-500 text-white text-[9px] font-extrabold px-2 py-0.5 rounded-md uppercase tracking-wider shadow-xs flex items-center gap-0.5">
                <Sparkles size={10} /> Spotlight
              </span>
            )}
            {isOutOfStock && (
              <span className="bg-gray-900/90 text-white text-[9px] font-bold px-2 py-0.5 rounded-md uppercase tracking-wider shadow-xs">
                Sold Out
              </span>
            )}
          </div>

          {/* Rating Chip */}
          {typeof product?.rating === 'number' && product.rating > 0 && (
            <div className="absolute bottom-2.5 left-2.5 z-10 bg-white/90 backdrop-blur-xs text-gray-900 text-[10px] font-bold px-2 py-0.5 rounded-md shadow-xs flex items-center gap-1 border border-gray-100">
              <Star size={11} className="fill-amber-400 text-amber-400" />
              <span>{product.rating.toFixed(1)}</span>
            </div>
          )}

          {/* Wishlist Button */}
          {product?.id && (
            <div className="absolute top-2.5 right-2.5 z-10">
              <WishLisht
                productId={product.id}
                className="w-8 h-8 rounded-full bg-white/90 backdrop-blur-xs text-gray-700 hover:text-red-500 flex items-center justify-center shadow-xs transition-transform hover:scale-110 active:scale-95"
              />
            </div>
          )}
        </div>

        {/* Info Area */}
        <div className="p-3.5 space-y-2">
          <div>
            <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest truncate">
              {displayBrand}
            </p>
            <Link href={productUrl} className="block group-hover:text-red-600 transition-colors">
              <h3 className="font-bold text-xs sm:text-sm text-gray-900 leading-snug truncate mt-0.5">
                {displayTitle}
              </h3>
            </Link>
          </div>

          {/* Price & Savings */}
          <div className="flex items-baseline gap-2 pt-0.5">
            <span className="font-extrabold text-sm sm:text-base text-gray-900">
              ₹{displayPrice.toLocaleString('en-IN')}
            </span>
            {displayOriginalPrice && displayOriginalPrice > displayPrice && (
              <span className="text-xs text-gray-400 line-through">
                ₹{displayOriginalPrice.toLocaleString('en-IN')}
              </span>
            )}
          </div>

          {/* Sizes or Colors Preview Chips */}
          {displaySizes && displaySizes.length > 0 ? (
            <div className="flex gap-1 pt-1 flex-wrap">
              {displaySizes.slice(0, 5).map((size) => (
                <span
                  key={size}
                  className="text-[10px] font-semibold border border-gray-200 bg-gray-50/50 rounded-md px-1.5 py-0.5 text-gray-600 group-hover:border-gray-400 transition-colors"
                >
                  {size}
                </span>
              ))}
              {displaySizes.length > 5 && (
                <span className="text-[10px] font-medium text-gray-400 self-center">
                  +{displaySizes.length - 5}
                </span>
              )}
            </div>
          ) : displayColors && displayColors.length > 0 ? (
            <div className="flex items-center gap-1.5 pt-1 flex-wrap">
              {displayColors.slice(0, 5).map((col, idx) => (
                <span
                  key={idx}
                  title={col}
                  className="w-3.5 h-3.5 rounded-full border border-gray-300 inline-block shadow-2xs"
                  style={{
                    backgroundColor:
                      col.toLowerCase() === 'black'
                        ? '#1a1a1a'
                        : col.toLowerCase() === 'white'
                          ? '#f8f8f8'
                          : col.toLowerCase() === 'blue' || col.toLowerCase() === 'navy'
                            ? '#1e3a8a'
                            : col.toLowerCase() === 'red'
                              ? '#b91c1c'
                              : col.toLowerCase() === 'green' || col.toLowerCase() === 'olive'
                                ? '#3f6212'
                                : col.toLowerCase() === 'sand'
                                  ? '#d2b48c'
                                  : col.toLowerCase() === 'orange'
                                    ? '#ea580c'
                                    : '#9ca3af',
                  }}
                />
              ))}
              {displayColors.length > 5 && (
                <span className="text-[10px] font-medium text-gray-400">
                  +{displayColors.length - 5}
                </span>
              )}
            </div>
          ) : null}
        </div>
      </div>
    </div>
  );
};

export default SingleCart;
