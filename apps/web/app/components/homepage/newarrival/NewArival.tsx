'use client';

import React, { useRef, useState } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import type { Swiper as SwiperType } from 'swiper';
import { Navigation } from 'swiper/modules';

import 'swiper/css';

import { spotlight } from '@/app/types/home/hometype';

interface NewArrivalProps {
  data: spotlight[];
}

const NewArival = ({ data }: NewArrivalProps) => {
  const swiperRef = useRef<SwiperType | null>(null);
  const [isBeginning, setIsBeginning] = useState(true);
  const [isEnd, setIsEnd] = useState(false);

  return (
    <section className="bg-brand-paper py-14 px-4">
      <div className="relative max-w-[1560px] mx-auto">
        {/* Header */}
        <div className="flex items-end justify-between mb-9">
          <h2 className="text-4xl md:text-5xl font-extrabold uppercase tracking-tight leading-none text-brand-ink">
            Our <span className="text-brand-accent">New Arrival</span>
          </h2>

          <a
            href="#"
            className="text-xs font-bold uppercase tracking-widest text-brand-ink border-b-2 border-brand-ink pb-0.5 hover:text-brand-accent hover:border-brand-accent transition-colors"
          >
            View All
          </a>
        </div>

        {/* Previous Button */}
        <button
          onClick={() => swiperRef.current?.slidePrev()}
          disabled={isBeginning}
          aria-label="Previous"
          className="absolute left-0 top-1/2 -translate-y-1/2 z-20 w-11 h-11 rounded-full bg-brand-ink text-white flex items-center justify-center shadow-lg hover:bg-brand-accent transition disabled:opacity-0 disabled:pointer-events-none max-sm:hidden"
        >
          <svg
            className="w-4 h-4"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <polyline points="15 18 9 12 15 6" />
          </svg>
        </button>

        {/* Next Button */}
        <button
          onClick={() => swiperRef.current?.slideNext()}
          disabled={isEnd}
          aria-label="Next"
          className="absolute right-0 top-1/2 -translate-y-1/2 z-20 w-11 h-11 rounded-full bg-brand-ink text-white flex items-center justify-center shadow-lg hover:bg-brand-accent transition disabled:opacity-0 disabled:pointer-events-none max-sm:hidden"
        >
          <svg
            className="w-4 h-4"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <polyline points="9 18 15 12 9 6" />
          </svg>
        </button>

        {/* Swiper */}
        <Swiper
          modules={[Navigation]}
          slidesPerView="auto"
          spaceBetween={16}
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
          {data.map((item) => (
            <SwiperSlide key={item.id} className="!w-75">
              <a href="#" className="group block">
                <div className="relative overflow-hidden rounded-sm bg-brand-surface w-full h-96">
                  <img
                    src={item.thumbnail}
                    alt={item.title}
                    loading="lazy"
                    className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                  />
                </div>

                <div className="mt-4">
                  <h3 className="text-lg font-medium uppercase text-brand-ink group-hover:text-brand-accent transition-colors">
                    {item.title}
                  </h3>
                </div>
              </a>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </section>
  );
};

export default NewArival;