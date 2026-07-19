'use client';

import { collectionParam, homecollection } from '@/app/types/home/hometype';
import Image from 'next/image';
import React from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/navigation';
import { Autoplay } from 'swiper/modules';
import Link from 'next/link';

const fallbackBanners = [
  '/homepage/homepage1.png',
  '/homepage/homepage2.png',
  '/homepage/homepage3.png',
  '/homepage/homepage4.png',
];

const Feature = ({ data,gender }: { data: homecollection[],gender:collectionParam}) => {
  return (
    <section className="bg-brand-surface py-14 px-4 bg-white-400">
      <div className="max-w-[1450px] mx-auto">
        <div className="flex items-end justify-between mb-9">
          <h2 className="text-4xl md:text-5xl font-extrabold uppercase tracking-tight leading-none text-black">
            Shop by <span className="text-red-600">Categories</span>
          </h2>
        </div>

        <div className="max-w-[1450px] mx-auto">
          <Swiper
            modules={[Autoplay]}
            autoplay={{
              delay: 2000,
              disableOnInteraction: false,
            }}
            spaceBetween={24}
            slidesPerView={1.1}
            breakpoints={{
              640: {
                slidesPerView: 1.5,
              },
              768: {
                slidesPerView: 2,
              },
              1024: {
                slidesPerView: 3,
              },
            }}
          >
            {data.map((item, index) => (
              <SwiperSlide key={item.id}>
                <Link href={`${gender}/`} className="group block">
                  <div className="overflow-hidden bg-gray-100">
                    <Image
                      src={item?.bannerImage! ?? fallbackBanners[index % fallbackBanners.length]}
                      alt={item.name}
                      width={1200}
                      height={600}
                      className="block aspect-[4/4] w-full object-cover"
                    />
                  </div>

                  <h3 className="mt-4 text-xl md:text-2xl font-medium uppercase tracking-widest text-black group-hover:text-red-600 transition-colors duration-200">
                    {item.name}
                  </h3>
                </Link>
              
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
      </div>
    </section>
  );
};

export default Feature;
