'use client';

import React, { useRef, useState } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import type { Swiper as SwiperType } from 'swiper';
import { Navigation } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';

type SlideItem = {
  img: string;
  title: string;
  tag: string;
};

const items: SlideItem[] = [
  { img: '/swiperimg/slide3.png', title: 'Training', tag: 'Performance' },
  { img: '/swiperimg/slide3.png', title: 'Running', tag: 'Endurance' },
  { img: '/swiperimg/slide4.png', title: 'Sportswear', tag: 'Style' },
  { img: '/swiperimg/slide5.png', title: 'Cricket', tag: 'Classic' },
  { img: '/swiperimg/slide6.png', title: 'Football', tag: 'Team Sport' },
  { img: '/swiperimg/slide1.png', title: 'Basketball', tag: 'Street' },
];

const Swiperspo: React.FC = () => {
  const swiperRef = useRef<SwiperType | null>(null);
  const [isBeginning, setIsBeginning] = useState(true);
  const [isEnd, setIsEnd] = useState(false);

  const totalSlides = items.length;
  const progressWidth = isBeginning ? `${(1 / totalSlides) * 100}%` : isEnd ? '100%' : '50%';

  return (
    <section className="bg-brand-paper py-14 px-4">
      <div className="relative max-w-[1560px] mx-auto">
        {/* Header */}
        <div className="flex items-end justify-between mb-9">
          <h2 className="text-4xl md:text-5xl font-extrabold uppercase tracking-tight leading-none text-brand-ink">
            Shop by <span className="text-brand-accent">Featured</span>
          </h2>
          <a
            href="#"
            className="text-xs font-bold uppercase tracking-widest text-brand-ink border-b-2 border-brand-ink pb-0.5 hover:text-brand-accent hover:border-brand-accent transition-colors"
          >
            View All
          </a>
        </div>

        {/* Prev Button */}
        <button
          onClick={() => swiperRef.current?.slidePrev()}
          disabled={isBeginning}
          aria-label="Previous"
          className="absolute left-0 top-1/2 -translate-y-1/2 z-20 w-11 h-11 rounded-full bg-brand-ink text-brand-elevated flex items-center justify-center shadow-lg transition-all duration-200 hover:bg-brand-accent hover:scale-110 disabled:opacity-0 disabled:pointer-events-none max-sm:hidden"
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
          className="absolute right-0 top-1/2 -translate-y-1/2 z-20 w-11 h-11 rounded-full bg-brand-ink text-brand-elevated flex items-center justify-center shadow-lg transition-all duration-200 hover:bg-brand-accent hover:scale-110 disabled:opacity-0 disabled:pointer-events-none max-sm:hidden"
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
            <polyline points="9 6 15 12 9 18" />
          </svg>
        </button>

        {/* Swiper */}
        <Swiper
          modules={[Navigation]}
          onSwiper={(swiper) => {
            swiperRef.current = swiper;
            setIsBeginning(swiper.isBeginning);
            setIsEnd(swiper.isEnd);
          }}
          onSlideChange={(swiper) => {
            setIsBeginning(swiper.isBeginning);
            setIsEnd(swiper.isEnd);
          }}
          breakpoints={{
            0: { slidesPerView: 1.25, spaceBetween: 14 },
            480: { slidesPerView: 2, spaceBetween: 16 },
            768: { slidesPerView: 2.6, spaceBetween: 20 },
            1024: { slidesPerView: 3.5, spaceBetween: 22 },
            1280: { slidesPerView: 4.2, spaceBetween: 24 },
          }}
          loop={false}
        >
          {items.map((item, i) => (
            <SwiperSlide key={i}>
              <a href="#" className="group block">
                {/* Image */}
                <div className="relative overflow-hidden rounded-sm bg-brand-surface aspect-[3/4]">
                  <img
                    src={item.img}
                    alt={item.title}
                    loading="lazy"
                    className="w-full h-full object-cover transition-transform duration-500 ease-out group-hover:scale-105"
                  />

                  {/* Hover overlay */}
                  <div className="absolute inset-0 bg-brand-ink/40 flex items-end p-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <span className="w-full text-center text-brand-elevated bg-brand-accent text-xs font-bold uppercase tracking-widest py-2.5 rounded-sm">
                      Shop Now
                    </span>
                  </div>
                </div>

                {/* Footer */}
                <div className="flex items-center justify-between mt-3">
                  <h3 className="text-lg font-medium uppercase text-brand-ink">
                    {item.title}
                  </h3>
                  <svg
                    className="w-5 h-5 text-brand-muted/50 transition-all duration-200 group-hover:text-brand-accent group-hover:translate-x-1"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2.2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <line x1="5" y1="12" x2="19" y2="12" />
                    <polyline points="12 5 19 12 12 19" />
                  </svg>
                </div>
              </a>
            </SwiperSlide>
          ))}
        </Swiper>

        {/* Progress bar */}
        <div className="mt-7 h-0.5 bg-brand-border rounded-full overflow-hidden">
          <div
            className="h-full bg-brand-ink rounded-full transition-all duration-300"
            style={{ width: progressWidth }}
          />
        </div>
      </div>
    </section>
  );
};

export default Swiperspo;
