'use client';

import { homecollection } from '@/app/types/home/hometype';
import Image from 'next/image';
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

type FeaturedProps = {
  category: string;
  data: homecollection[];
};

const Feature = ({ category, data }: FeaturedProps) => {
  return (
    <section className="bg-brand-surface bg-white-400 px-4 py-14">
      <div className="mx-auto max-w-[1450px]">
        <div className="mb-9 flex items-end justify-between">
          <h2 className="text-4xl font-extrabold uppercase leading-none tracking-tight text-black md:text-5xl">
            Shop by <span className="text-red-600">Categories</span>
          </h2>
        </div>

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
              <Link href={`/${category}/${item.slug}`} className="group block">
                <div className="overflow-hidden bg-gray-100">
                  <Image
                    src={item.bannerImage || fallbackBanners[index % fallbackBanners.length]!}
                    alt={item.name}
                    width={1200}
                    height={600}
                    className="block aspect-[4/4] w-full object-cover"
                  />
                </div>

                <h3 className="mt-4 text-xl font-medium uppercase tracking-widest text-black transition-colors duration-200 group-hover:text-red-600 md:text-2xl">
                  {item.name}
                </h3>
              </Link>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </section>
  );
};

export default Feature;
