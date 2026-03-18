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
  { img: '/swiperimg/slide2.png', title: 'Running' },
  { img: '/swiperimg/slide3.png', title: 'Training' },
  { img: '/swiperimg/slide4.png', title: 'Sportswear' },
  { img: '/swiperimg/slide5.png', title: 'Cricket' },
  { img: '/swiperimg/slide6.png', title: 'Football' },
  { img: '/swiperimg/slide1.png', title: 'Basketball' },
];

const Swiperspo: React.FC = () => {
  const swiperRef = useRef<SwiperType | null>(null);

  return (
    <div className="relative mx-auto w-full max-w-8xl">
      {/* Navigation Buttons */}
      <button className="prev-btn">‹</button>
      <button className="next-btn">›</button>

      <Swiper
        modules={[Navigation]}
        onSwiper={(swiper: SwiperType) => {
          swiperRef.current = swiper;
        }}
        slidesPerView={3}
        slidesPerGroup={3}
        spaceBetween={10}
        loop={false}
        navigation={{
          nextEl: '.next-btn',
          prevEl: '.prev-btn',
        }}
        onSlideChange={(swiper: SwiperType) => {
          const prev = document.querySelector('.prev-btn') as HTMLButtonElement;
          const next = document.querySelector('.next-btn') as HTMLButtonElement;

          if (swiper.isBeginning) {
            prev.style.display = 'none';
          } else {
            prev.style.display = 'flex';
          }

          if (swiper.isEnd) {
            next.style.display = 'none';
          } else {
            next.style.display = 'flex';
          }
        }}
        onInit={(swiper: SwiperType) => {
          // initial hide
          const prev = document.querySelector('.prev-btn') as HTMLButtonElement;
          if (prev) prev.style.display = 'none';
        }}
      >
        {items.map((item: SlideItem, i: number) => (
          <SwiperSlide key={i}>
            <div className="overflow-hidden cursor-pointer">
              {/* Image */}
              <div className="overflow-hidden">
                <img
                  src={item.img}
                  alt={item.title}
                  className="w-full h-[600px] object-cover"
                />
              </div>

              {/* Text */}
              <h2 className="mt-3 text-lg font-medium text-black">{item.title}</h2>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>

      {/* Styles */}
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
      `}</style>
    </div>
  );
};

export default Swiperspo;
