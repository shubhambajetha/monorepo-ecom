import React from 'react';

const categories = [
  { src: '/homepage/homepage1.png', title: 'T-Shirts' },
  { src: '/homepage/homepage2.png', title: 'Shirts' },
  { src: '/homepage/homepage3.png', title: 'Polos' },
  { src: '/homepage/homepage4.png', title: 'Hoodies' },
  { src: '/homepage/homepage4.png', title: 'Joggers' },
  { src: '/homepage/homepage4.png', title: 'Shorts' },
];

const Feature = () => {
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
            {categories.map((item, i) => (
              <a key={i} href="#" className="group cursor-pointer">
                {/* Image */}
                <div className="overflow-hidden bg-gray-100">
                  <img
                    src={item.src}
                    alt={item.title}
                    className="block w-full h-auto object-cover transition-transform duration-500 ease-out group-hover:scale-105"
                  />
                </div>

                {/* Title below image — exactly like reference */}
                <h3 className="mt-4 text-xl md:text-2xl font-medium uppercase tracking-widest text-black group-hover:text-red-600 transition-colors duration-200">
                  {item.title}
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
