'use client';

import React, { useRef } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import type { Swiper as SwiperType } from 'swiper';
import { Navigation } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';
type SlideItem = {
  img: string;
  title: string;
};

const items: SlideItem[] = [
  { img: '/swiperimg/slide3.png', title: 'Training' },
  { img: '/swiperimg/slide3.png', title: 'Training' },
  { img: '/swiperimg/slide4.png', title: 'Sportswear' },
  { img: '/swiperimg/slide5.png', title: 'Cricket' },
  { img: '/swiperimg/slide6.png', title: 'Football' },
  { img: '/swiperimg/slide1.png', title: 'Basketball' },
];

const Swiperspo: React.FC = () => {
  const swiperRef = useRef<SwiperType | null>(null);

  return (
    <div className="relative mx-auto w-full max-w-[1550px] px-3 sm:px-6">
      <div className="mb-6 sm:mb-8 flex items-center justify-between">
        <h2 className="text-2xl sm:text-3xl md:text-xl font-semibold text-gray-900">
          Shop by Sport
        </h2>
        <button className="text-md sm:text-base transition text-xl">
          View All →
        </button>
      </div>

      <button className="prev-btn">‹</button>
      <button className="next-btn">›</button>

      <Swiper
        modules={[Navigation]}
        onSwiper={(swiper) => {
          swiperRef.current = swiper;
        }}
        breakpoints={{
          0: {
            slidesPerView: 1.2,
            spaceBetween: 10,
            slidesPerGroup: 1,
          },
          480: {
            slidesPerView: 2,
            spaceBetween: 12,
            slidesPerGroup: 2,
          },
          768: {
            slidesPerView: 3,
            spaceBetween: 16,
            slidesPerGroup: 3,
          },
          1024: {
            slidesPerView: 4,
            spaceBetween: 20,
            slidesPerGroup: 4,
          },
        }}
        loop={false}
        navigation={{
          nextEl: '.next-btn',
          prevEl: '.prev-btn',
        }}
        onSlideChange={(swiper) => {
          const prev = document.querySelector('.prev-btn') as HTMLButtonElement;
          const next = document.querySelector('.next-btn') as HTMLButtonElement;

          if (prev) prev.style.display = swiper.isBeginning ? 'none' : 'flex';
          if (next) next.style.display = swiper.isEnd ? 'none' : 'flex';
        }}
        onInit={(swiper) => {
          const prev = document.querySelector('.prev-btn') as HTMLButtonElement;
          if (prev) prev.style.display = 'none';
        }}
      >
        {items.map((item, i) => (
          <SwiperSlide key={i}>
            <div className="">
              <div className="overflow-hidden">
                <img
                  src={item.img}
                  alt={item.title}
                  className="w-full h-[220px] sm:h-[300px] md:h-[400px] lg:h-[500px] object-cover"
                />
              </div>

              <h2 className="mt-3 text-sm sm:text-base md:text-lg font-medium text-black">
                {item.title}
              </h2>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>

      {/* Custom Styles */}
      <style jsx>{`
        .prev-btn,
        .next-btn {
          position: absolute;
          top: 45%;
          z-index: 10;
          width: 42px;
          height: 42px;
          background: white;
          color: black;
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 18px;
          cursor: pointer;
          box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
        }

        .prev-btn {
          left: 5px;
        }

        .next-btn {
          right: 5px;
        }

        @media (max-width: 640px) {
          .prev-btn,
          .next-btn {
            display: none !important;
          }
        }
      `}</style>
    </div>
  );
};

export default Swiperspo;
