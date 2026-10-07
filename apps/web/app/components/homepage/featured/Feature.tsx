'use client';

import React, { useRef, useState } from 'react';
import { homecollection } from '@/app/types/home/hometype';
import Image from 'next/image';
import { Swiper, SwiperSlide } from 'swiper/react';
import type { Swiper as SwiperType } from 'swiper';
import { Autoplay, Navigation } from 'swiper/modules';
import { ChevronLeft, ChevronRight, ArrowRight, Sparkles } from 'lucide-react';
import Link from 'next/link';

import 'swiper/css';
import 'swiper/css/navigation';

const fallbackBanners = [
  '/homepage/homepage1.png',
  '/homepage/homepage2.png',
  '/homepage/homepage3.png',
  '/homepage/homepage4.png',
];

type FeaturedProps = {
  category?: string;
  data: homecollection[];
};

const Feature = ({ category, data }: FeaturedProps) => {
  const swiperRef = useRef<SwiperType | null>(null);
  const [isBeginning, setIsBeginning] = useState(true);
  const [isEnd, setIsEnd] = useState(false);

  if (!data || data.length === 0) return null;

  return (
    <section className="bg-white py-16 md:py-20 px-4 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-[1560px]">
        {/* Section Header */}
        <div className="mb-10 flex flex-col md:flex-row md:items-end justify-between gap-4">
          <div>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold uppercase leading-none tracking-tight text-slate-900">
              Shop by <span className="text-transparent bg-clip-text bg-gradient-to-r from-red-600 to-orange-600">Categories</span>
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

            {/* Prev / Next Arrows */}
            <button
              onClick={() => swiperRef.current?.slidePrev()}
              disabled={isBeginning}
              aria-label="Previous"
              className="w-10 h-10 rounded-full border border-slate-200 bg-white hover:bg-slate-900 hover:text-white text-slate-700 flex items-center justify-center shadow-xs transition-colors disabled:opacity-30 disabled:pointer-events-none"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>

            <button
              onClick={() => swiperRef.current?.slideNext()}
              disabled={isEnd}
              aria-label="Next"
              className="w-10 h-10 rounded-full border border-slate-200 bg-white hover:bg-slate-900 hover:text-white text-slate-700 flex items-center justify-center shadow-xs transition-colors disabled:opacity-30 disabled:pointer-events-none"
            >
              <ChevronRight className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Carousel */}
        <Swiper
          modules={[Autoplay, Navigation]}
          autoplay={{
            delay: 4000,
            disableOnInteraction: false,
          }}
          onSwiper={(swiper) => {
            swiperRef.current = swiper;
            setIsBeginning(swiper.isBeginning);
            setIsEnd(swiper.isEnd);
          }}
          onSlideChange={(swiper) => {
            setIsBeginning(swiper.isBeginning);
            setIsEnd(swiper.isEnd);
          }}
          spaceBetween={20}
          slidesPerView={1.2}
          breakpoints={{
            480: {
              slidesPerView: 1.8,
              spaceBetween: 20,
            },
            768: {
              slidesPerView: 2.5,
              spaceBetween: 24,
            },
            1024: {
              slidesPerView: 3.5,
              spaceBetween: 28,
            },
          }}
        >
          {data.map((item, index) => {
            const categorySlug =
              (category && category !== 'undefined' ? category : undefined) ||
              item.subcategory?.category?.slug ||
              'all';

            return (
              <SwiperSlide key={item.id}>
                <Link href={`/${categorySlug}/${item.slug}`} className="group block">
                  <div className="relative overflow-hidden rounded-2xl bg-slate-100 aspect-[4/5] shadow-xs group-hover:shadow-xl transition-all duration-500">
                    <Image
                      src={item.bannerImage || fallbackBanners[index % fallbackBanners.length]!}
                      alt={item.name}
                      width={1200}
                      height={600}
                      className="block h-full w-full object-cover transition-transform duration-700 group-hover:scale-108"
                    />

                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent flex flex-col justify-end p-6">
                      <p className="text-xs uppercase tracking-widest text-orange-400 font-bold mb-1">
                        Collection
                      </p>
                      <h3 className="text-xl sm:text-2xl font-black uppercase tracking-tight text-white transition-colors duration-200 group-hover:text-orange-400">
                        {item.name}
                      </h3>
                      <div className="mt-2 flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-white/90 group-hover:text-white">
                        <span>Shop Now</span>
                        <ArrowRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-1" />
                      </div>
                    </div>
                  </div>
                </Link>
              </SwiperSlide>
            );
          })}
        </Swiper>
      </div>
    </section>
  );
};

export default Feature;


