'use client';

import React, { useRef, useState } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import type { Swiper as SwiperType } from 'swiper';
import { Navigation } from 'swiper/modules';
import Link from 'next/link';
import { ChevronLeft, ChevronRight, ArrowRight, Sparkles } from 'lucide-react';

import 'swiper/css';
import 'swiper/css/navigation';

import { spotlight } from '@/app/types/home/hometype';
import WishLisht from '@/app/common/WishLisht';

interface NewArrivalProps {
  data: spotlight[];
}

const NewArival = ({ data }: NewArrivalProps) => {
  const swiperRef = useRef<SwiperType | null>(null);
  const [isBeginning, setIsBeginning] = useState(true);
  const [isEnd, setIsEnd] = useState(false);

  if (!data || data.length === 0) return null;

  return (
    <section className="bg-slate-50/60 py-16 md:py-20 px-4 sm:px-6 lg:px-8 border-t border-slate-100">
      <div className="relative max-w-[1560px] mx-auto">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-10 gap-4">
          <div>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold uppercase tracking-tight leading-none text-slate-900">
              Our <span className="text-red-600">New Arrivals</span>
            </h2>
          </div>

          <div className="flex items-center gap-3">
            <Link
              href="/product-listing"
              className="inline-flex items-center gap-1.5 text-xs sm:text-sm font-bold uppercase tracking-wider text-slate-900 hover:text-red-600 transition-colors group mr-2"
            >
              <span>View All</span>
              <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
            </Link>

            {/* Previous Button */}
            <button
              onClick={() => swiperRef.current?.slidePrev()}
              disabled={isBeginning}
              aria-label="Previous slide"
              className="w-10 h-10 rounded-full border border-slate-200 bg-white hover:bg-slate-900 hover:text-white text-slate-700 flex items-center justify-center shadow-xs transition-colors disabled:opacity-30 disabled:pointer-events-none"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>

            {/* Next Button */}
            <button
              onClick={() => swiperRef.current?.slideNext()}
              disabled={isEnd}
              aria-label="Next slide"
              className="w-10 h-10 rounded-full border border-slate-200 bg-white hover:bg-slate-900 hover:text-white text-slate-700 flex items-center justify-center shadow-xs transition-colors disabled:opacity-30 disabled:pointer-events-none"
            >
              <ChevronRight className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Swiper */}
        <Swiper
          modules={[Navigation]}
          slidesPerView="auto"
          spaceBetween={20}
          loop={false}
          onSwiper={(swiper) => {
            swiperRef.current = swiper;
            setIsBeginning(swiper.isBeginning);
            setIsEnd(swiper.isEnd);
          }}
          onSlideChange={(swiper) => {
            setIsBeginning(swiper.isBeginning);
            setIsEnd(swiper.isEnd);
          }}
        >
          {data.map((item) => {
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
              <SwiperSlide key={item.id} className="!w-64 sm:!w-72 md:!w-80">
                <div className="group relative bg-white rounded-2xl border border-slate-200/80 shadow-xs hover:shadow-xl transition-all duration-300 overflow-hidden flex flex-col justify-between">
                  <div>
                    {/* Image Area */}
                    <div className="relative overflow-hidden bg-slate-100 aspect-[4/5] w-full flex items-center justify-center p-3">
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
                        className="absolute top-3 right-3 z-10 inline-flex h-8 w-8 items-center justify-center rounded-full bg-white/90 text-gray-700 shadow-sm backdrop-blur-sm transition hover:scale-110 hover:bg-white hover:text-red-500"
                      />

                      {/* Discount badge */}
                      {hasDiscount && (
                        <span className="absolute top-3 left-3 bg-red-600 text-white text-[10px] font-extrabold uppercase px-2 py-0.5 rounded-md shadow-xs tracking-wider">
                          {discountPercent}% OFF
                        </span>
                      )}

                      {/* Quick view button overlay */}
                      <Link
                        href={productUrl}
                        className="absolute inset-x-3 bottom-3 py-2 bg-white/95 backdrop-blur-sm text-slate-900 text-xs font-bold uppercase tracking-wider text-center rounded-xl shadow-md opacity-0 translate-y-2 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-300 hover:bg-slate-900 hover:text-white"
                      >
                        View Details
                      </Link>
                    </div>

                    {/* Metadata */}
                    <div className="p-4">
                      <p className="text-[11px] uppercase tracking-wider font-semibold text-slate-400 mb-0.5 truncate">
                        {item.brand || item.collection?.name || 'Latest'}
                      </p>

                      <Link href={productUrl} className="block">
                        <h3 className="text-sm sm:text-base font-bold uppercase text-slate-900 group-hover:text-red-600 transition-colors line-clamp-1">
                          {item.title}
                        </h3>
                      </Link>

                      {activePrice !== undefined && (
                        <div className="flex items-baseline gap-2 mt-2">
                          <span className="font-extrabold text-base text-slate-900">
                            ₹{activePrice.toLocaleString()}
                          </span>
                          {originalPrice && (
                            <span className="text-xs text-slate-400 line-through font-medium">
                              ₹{originalPrice.toLocaleString()}
                            </span>
                          )}
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </SwiperSlide>
            );
          })}
        </Swiper>
      </div>
    </section>
  );
};

export default NewArival;

