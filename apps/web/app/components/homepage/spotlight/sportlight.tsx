import React from 'react';

type ProductImageProps = {
  src: string;
  alt: string;
};

const ProductImage = ({ src, alt }: ProductImageProps) => (
  <img src={src} alt={alt} className="w-15 h-15 sm:w-16 sm:h-16 md:w-26 md:h-26 object-contain" />
);

const spotlightItems = [
  { id: 1, label: 'Air Jordan 1', img: '/swiperimgg/1.png' },
  { id: 2, label: 'Air Force 1', img: '/swiperimgg/2.png' },
  { id: 3, label: 'Graphic Tees', img: '/swiperimgg/3.png' },
  { id: 4, label: 'Pegasus 41', img: '/swiperimgg/4.png' },
  { id: 5, label: 'Tights', img: '/swiperimgg/5.png' },
  { id: 6, label: 'Metcon', img: '/swiperimgg/6.png' },
  { id: 7, label: 'Jackets', img: '/swiperimgg/7.png' },
  { id: 8, label: 'Quest', img: '/swiperimgg/8.png' },
  { id: 9, label: 'Dunk', img: '/swiperimgg/9.png' },
  { id: 10, label: 'Bottoms', img: '/swiperimgg/10.png' },
  { id: 11, label: 'P-6000', img: '/swiperimgg/11.png' },
  { id: 12, label: 'Caps', img: '/swiperimgg/12.png' },
  { id: 13, label: 'Air Max', img: '/swiperimgg/13.png' },
  { id: 14, label: 'Sports Bras', img: '/swiperimgg/14.png' },
  { id: 15, label: 'Court Vision', img: '/swiperimgg/15.png' },
  { id: 16, label: 'Shorts', img: '/swiperimgg/16.png' },
];

const Spotlight = () => {
  return (
    <section className="max-w-[1440px] mx-auto py-10 h-[500px]">
      <div className="text-center">
        <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-extrabold tracking-tight uppercase mb-3">
          SPOTLIGHT
        </h1>

        <p className="text-sm sm:text-base md:text-lg text-gray-600 mb-8 md:mb-10">
          Iconic styles engineered with innovation—built to push your performance further.
        </p>
      </div>
      <div className="grid justify-center gap-1 grid-cols-[repeat(4,auto)] sm:grid-cols-[repeat(6,auto)] md:grid-cols-[repeat(8,auto)] mt-2 ">
        {spotlightItems.map((item) => (
          <button key={item.id} className="flex flex-col items-center justify-center group">
            <ProductImage src={item.img} alt={item.label} />
          </button>
        ))}
      </div>
    </section>
  );
};

export default Spotlight;
