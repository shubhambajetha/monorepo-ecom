import { homecollection } from '@/app/types/home/hometype';
import Image from 'next/image';
import React from 'react';

const fallbackBanners = [
  '/homepage/homepage1.png',
  '/homepage/homepage2.png',
  '/homepage/homepage3.png',
  '/homepage/homepage4.png',
];

const Feature = ({ data }: { data: homecollection[] }) => {
  return (
    <section className="bg-brand-surface py-14 px-4">
      {/* Grid */}
      <div className="max-w-[1550px] mx-auto">
        {/* Header */}
        <div className="flex items-end justify-between mb-9">
          <h2 className="text-4xl md:text-5xl font-extrabold uppercase tracking-tight leading-none text-black">
            Shop by <span className="text-red-600">Categories</span>
          </h2>
        </div>

        <div className="max-w-[1220px] mx-auto ">
          <div className="grid grid-cols-3 md:grid-cols-3 lg:gap-6 gap-2 sm:px-3">
            {data.map((item, index) => (
              <a key={item.id} href="#" className="group cursor-pointer">
                <div className="overflow-hidden bg-gray-100">
                  <Image
                    src={item.bannerImage! ?? fallbackBanners[index % fallbackBanners.length ]}
                    alt={item.name}
                    width={1200}
                    height={600}
                    className="block aspect-[2/1] w-full object-cover transition-transform duration-500 ease-out group-hover:scale-105"
                  />
                </div>

                <h3 className="mt-4 text-xl md:text-2xl font-medium uppercase tracking-widest text-black group-hover:text-red-600 transition-colors duration-200">
                  {item.name}
                </h3>
              </a>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Feature;
