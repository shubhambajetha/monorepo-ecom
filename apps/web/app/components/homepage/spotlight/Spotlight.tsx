'use client';

import React from 'react';
import Link from 'next/link';
import { Sparkles, ArrowRight, Star, Flame } from 'lucide-react';
import { spotlight } from '@/app/types/home/hometype';
import WishLisht from '@/app/common/WishLisht';

interface SpotlightProps {
  data: spotlight[];
}

const Spotlight = ({ data }: SpotlightProps) => {
  if (!data || data.length === 0) return null;

  // Initial 30 products only
  const spotlightItems = data.slice(0, 30);

  return (
    <section className="bg-gradient-to-b from-white via-slate-50/50 to-white py-16 md:py-24 px-4 sm:px-6 lg:px-8 border-t border-slate-100">
      <div className="max-w-[1560px] mx-auto">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-10 md:mb-14 gap-4">
          <div>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold uppercase tracking-tight text-slate-900">
              Spotlight <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-600 to-red-600">Collection</span>
            </h2>

            <p className="text-sm sm:text-base text-slate-600 mt-2 max-w-2xl">
              Iconic styles engineered with innovation—hand-selected for peak performance and timeless streetwear aesthetics.
            </p>
          </div>

          <div className="flex items-center gap-3 self-start md:self-end">
            <Link
              href="/product-listing"
              className="inline-flex items-center gap-1.5 text-xs sm:text-sm font-bold uppercase tracking-wider text-slate-900 hover:text-red-600 transition-colors group"
            >
              <span>Explore All</span>
              <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
            </Link>
          </div>
        </div>

        {/* Product Cards Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4 sm:gap-6">
          {spotlightItems.map((item) => {
            const categorySlug = item.collection?.subcategory?.category?.slug;
            const collectionSlug = item.collection?.slug;
            const productUrl =
              categorySlug && collectionSlug && item.slug
                ? `/${categorySlug}/${collectionSlug}/${item.slug}`
                : item.slug
                  ? `/product-listing?search=${encodeURIComponent(item.title)}`
                  : '#';

            const hasDiscount = Boolean(
              item.discountPrice && item.price && item.discountPrice < item.price
            );
            const activePrice = hasDiscount ? item.discountPrice! : item.price;
            const originalPrice = hasDiscount ? item.price : undefined;
            const discountPercent =
              hasDiscount && item.price
                ? Math.round(((item.price - item.discountPrice!) / item.price) * 100)
                : 0;

            return (
              <div
                key={item.id}
                className="group relative flex flex-col justify-between bg-white rounded-2xl border border-slate-200/80 shadow-xs hover:shadow-xl hover:border-orange-200 transition-all duration-300 overflow-hidden"
              >
                <div>
                  {/* Image Container */}
                  <div className="relative w-full aspect-[4/5] bg-gradient-to-b from-slate-50 via-slate-100/60 to-slate-100 overflow-hidden p-3 flex items-center justify-center">
                    <Link href={productUrl} className="block w-full h-full">
                      <img
                        src={item.thumbnail || '/placeholder.png'}
                        alt={item.title}
                        loading="lazy"
                        className="w-full h-full object-contain mix-blend-multiply transition-transform duration-500 ease-out group-hover:scale-108"
                      />
                    </Link>

                    {/* Wishlist Button */}
                    <WishLisht
                      productId={item.id}
                      className="absolute top-3 right-3 z-10 inline-flex h-8 w-8 sm:h-9 sm:w-9 items-center justify-center rounded-full bg-white/90 text-gray-700 shadow-sm backdrop-blur-sm transition hover:scale-110 hover:bg-white hover:text-red-500 focus:outline-none"
                    />

                    {/* Discount or Spotlight Badge */}
                    <div className="absolute top-3 left-3 z-10 flex flex-col gap-1 pointer-events-none">
                      {hasDiscount ? (
                        <span className="bg-red-600 text-white text-[10px] sm:text-xs font-extrabold uppercase px-2 py-0.5 rounded-md shadow-xs tracking-wider">
                          {discountPercent}% OFF
                        </span>
                      ) : (
                        <span className="bg-slate-900/85 backdrop-blur-sm text-amber-400 text-[10px] font-bold uppercase px-2 py-0.5 rounded-md shadow-xs flex items-center gap-1">
                          <Sparkles size={11} className="text-amber-400" />
                          <span className="text-white">Spotlight</span>
                        </span>
                      )}
                    </div>

                    {/* Quick View Link overlay */}
                    <Link
                      href={productUrl}
                      className="absolute inset-x-3 bottom-3 py-2 bg-white/95 backdrop-blur-sm text-slate-900 text-xs font-bold uppercase tracking-wider text-center rounded-xl shadow-md opacity-0 translate-y-2 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-300 hover:bg-slate-900 hover:text-white"
                    >
                      View Product
                    </Link>
                  </div>

                  {/* Product Details */}
                  <div className="p-3.5 sm:p-4">
                    {/* Brand & Collection */}
                    <div className="flex items-center justify-between gap-1 text-[11px] font-semibold text-slate-400 uppercase tracking-wider">
                      <span className="truncate">{item.brand || item.collection?.name || 'Curated'}</span>
                      {item.rating !== undefined && item.rating > 0 && (
                        <span className="inline-flex items-center gap-0.5 text-amber-500 font-bold shrink-0">
                          <Star size={11} className="fill-amber-400 text-amber-400" />
                          {item.rating.toFixed(1)}
                        </span>
                      )}
                    </div>

                    {/* Title */}
                    <Link href={productUrl} className="block mt-1">
                      <h3 className="font-bold text-sm sm:text-base text-slate-900 group-hover:text-red-600 transition-colors line-clamp-1 leading-snug">
                        {item.title}
                      </h3>
                    </Link>

                    {/* Price */}
                    <div className="flex items-baseline gap-2 mt-2">
                      {activePrice !== undefined && (
                        <span className="font-extrabold text-base sm:text-lg text-slate-900">
                          ₹{activePrice.toLocaleString()}
                        </span>
                      )}
                      {originalPrice && (
                        <span className="text-xs text-slate-400 line-through font-medium">
                          ₹{originalPrice.toLocaleString()}
                        </span>
                      )}
                    </div>

                    {/* Sizes chips */}
                    {item.sizes && item.sizes.length > 0 && (
                      <div className="flex items-center gap-1 mt-2.5 flex-wrap">
                        {item.sizes.slice(0, 4).map((size) => (
                          <span
                            key={size}
                            className="text-[10px] font-semibold border border-slate-200 text-slate-600 px-1.5 py-0.5 rounded-md hover:border-slate-800 transition-colors"
                          >
                            {size}
                          </span>
                        ))}
                        {item.sizes.length > 4 && (
                          <span className="text-[10px] text-slate-400 font-medium">
                            +{item.sizes.length - 4}
                          </span>
                        )}
                      </div>
                    )}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default Spotlight;

