'use client';

import React, { useRef, useState } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import type { Swiper as SwiperType } from 'swiper';
import { Navigation } from 'swiper/modules';
import Link from 'next/link';
import { ChevronLeft, ChevronRight, ArrowRight, Flame } from 'lucide-react';

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
    <section className="bg-white py-16 md:py-20 px-4 sm:px-6 lg:px-8 border-t border-slate-100">
      <div className="relative max-w-[1560px] mx-auto">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-10 gap-4">
          <div>
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-orange-50 text-orange-600 text-xs font-bold uppercase tracking-wider mb-3">
              <Flame className="w-3.5 h-3.5 text-orange-600" />
              <span>Athletic Discipline</span>
            </div>

            <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold uppercase tracking-tight leading-none text-slate-900">
              Shop by <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-600 to-red-600">Sport</span>
            </h2>
          </div>

          <div className="flex items-center gap-3">
            <Link
              href="/product-listing"
              className="inline-flex items-center gap-1.5 text-xs sm:text-sm font-bold uppercase tracking-wider text-slate-900 hover:text-red-600 transition-colors group mr-2"
            >
              <span>Explore All Sports</span>
              <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
            </Link>

            {/* Prev Button */}
            <button
              onClick={() => swiperRef.current?.slidePrev()}
              disabled={isBeginning}
              aria-label="Previous sport"
              className="w-10 h-10 rounded-full border border-slate-200 bg-white hover:bg-slate-900 hover:text-white text-slate-700 flex items-center justify-center shadow-xs transition-colors disabled:opacity-30 disabled:pointer-events-none"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>

            {/* Next Button */}
            <button
              onClick={() => swiperRef.current?.slideNext()}
              disabled={isEnd}
              aria-label="Next sport"
              className="w-10 h-10 rounded-full border border-slate-200 bg-white hover:bg-slate-900 hover:text-white text-slate-700 flex items-center justify-center shadow-xs transition-colors disabled:opacity-30 disabled:pointer-events-none"
            >
              <ChevronRight className="w-5 h-5" />
            </button>
          </div>
        </div>

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
              <Link
                href={`/product-listing?search=${encodeURIComponent(item.title)}`}
                className="group block"
              >
                {/* Image */}
                <div className="relative overflow-hidden rounded-2xl bg-slate-100 aspect-[3/4] shadow-xs group-hover:shadow-xl transition-all duration-300">
                  <img
                    src={item.img}
                    alt={item.title}
                    loading="lazy"
                    className="w-full h-full object-cover transition-transform duration-500 ease-out group-hover:scale-108"
                  />

                  {/* Gradient Overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/10 to-transparent flex flex-col justify-end p-5">
                    <span className="text-[11px] font-bold uppercase tracking-widest text-orange-400 mb-1">
                      {item.tag}
                    </span>
                    <h3 className="text-xl font-black uppercase text-white tracking-tight group-hover:text-orange-400 transition-colors">
                      {item.title}
                    </h3>
                  </div>

                  {/* Hover overlay button */}
                  <div className="absolute inset-x-3 bottom-3 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <span className="w-full block text-center text-slate-900 bg-white/95 backdrop-blur-sm text-xs font-bold uppercase tracking-wider py-2.5 rounded-xl shadow-md">
                      Shop {item.title}
                    </span>
                  </div>
                </div>
              </Link>
            </SwiperSlide>
          ))}
        </Swiper>

        {/* Progress bar */}
        <div className="mt-8 h-1 bg-slate-100 rounded-full overflow-hidden">
          <div
            className="h-full bg-slate-900 rounded-full transition-all duration-300"
            style={{ width: progressWidth }}
          />
        </div>
      </div>
    </section>
  );
};

export default Swiperspo;

