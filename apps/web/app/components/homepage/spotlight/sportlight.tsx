import Image from 'next/image';
import { spotlight } from '@/app/types/home/hometype';
import React from 'react';

interface SpotlightProps {
  data: spotlight[];
}

const Sportlight = ({ data }: SpotlightProps) => {
  return (
    <section className="max-w-[1550px] mx-auto py-10">
      <div className="text-center">
        <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-extrabold tracking-tight uppercase mb-3">
          SPOTLIGHT
        </h1>

        <p className="text-sm sm:text-base md:text-lg text-gray-600 mb-8 md:mb-10">
          Iconic styles engineered with innovation—built to push your performance further.
        </p>
      </div>

      <div className="grid justify-center gap-4 grid-cols-4 sm:grid-cols-6 md:grid-cols-8">
        {data.map((item) => (
          <button key={item.id} className="flex flex-col items-center justify-center group">
            <div className="relative w-20 h-20 md:w-24 md:h-24 overflow-hidden rounded-lg">
              <Image
                src={item.thumbnail}
                alt={item.title}
                fill
                className="object-cover group-hover:scale-105 transition-transform duration-300"
              />
            </div>

            <span className="mt-2 text-sm font-medium text-center">{item.title}</span>
          </button>
        ))}
      </div>
    </section>
  );
};

export default Sportlight;
