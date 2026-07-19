import Image from 'next/image';
import { spotlight } from '@/app/types/home/hometype';
import React from 'react';

interface SpotlightProps {
  data: spotlight[];
}

const Spotlight = ({ data }: SpotlightProps) => {
  return (
    <section className="max-w-[1550px] mx-auto py-16 md:py-20 px-4">
      <div className="text-center mb-10 md:mb-14">
        <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-extrabold tracking-tight uppercase text-[#0D0D0D]">
          Spotlight
        </h1>

        <p className="text-sm sm:text-base md:text-lg text-[#6B6B6B] mt-4 max-w-2xl mx-auto">
          Iconic styles engineered with innovation—built to push your performance further.
        </p>
      </div>

      <div className="flex flex-wrap gap-y-10">
        {data.map((item) => (
          <button
            key={item.id}
            className="group flex flex-col items-center outline-none
                       basis-1/4 sm:basis-1/6 md:basis-1/8 px-2"
          >
            <div className="h-16 sm:h-20 w-full flex items-end justify-center mb-3">
              <Image
                src={item.thumbnail}
                alt={item.title}
                width={80}
                height={80}
                className="max-h-16 sm:max-h-20 w-auto object-contain
                           transition-transform duration-300 ease-out group-hover:scale-105"
              />
            </div>

            <span className="text-xs sm:text-sm font-semibold text-center text-[#0D0D0D] leading-tight">
              {item.title}
            </span>
          </button>
        ))}
      </div>
    </section>
  );
};

export default Spotlight;