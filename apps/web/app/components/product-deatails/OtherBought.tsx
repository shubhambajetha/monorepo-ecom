'use client';

import React from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation } from 'swiper/modules';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/navigation';

interface Product {
  id: number;
  name: string;
  category: string;
  price: number;
  originalPrice?: number;
  fitLabel: string;
  fabricLabel: string;
  image: string;
}

const products: Product[] = [
  {
    id: 1,
    name: 'Solids: Eggshell White',
    category: 'Oversized T-Shirts',
    price: 899,
    fitLabel: 'OVERSIZED FIT',
    fabricLabel: 'PREMIUM HEAVY GAUGE FABRIC',
    image: 'https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=400&q=80',
  },
  {
    id: 2,
    name: 'Solids: White',
    category: 'Oversized T-Shirts',
    price: 749,
    fitLabel: 'OVERSIZED FIT',
    fabricLabel: 'PREMIUM HEAVY GAUGE FABRIC',
    image: 'https://images.unsplash.com/photo-1503341504253-dff4815485f1?w=400&q=80',
  },
  {
    id: 3,
    name: 'Solids: Sunset Orange',
    category: 'Oversized T-Shirts',
    price: 799,
    fitLabel: 'OVERSIZED FIT',
    fabricLabel: 'PREMIUM HEAVY GAUGE FABRIC',
    image: 'https://images.unsplash.com/photo-1562157873-818bc0726f68?w=400&q=80',
  },
  {
    id: 4,
    name: 'Solids: Light Orange',
    category: 'Oversized T-Shirts',
    price: 599,
    originalPrice: 749,
    fitLabel: 'OVERSIZED FIT',
    fabricLabel: 'PREMIUM HEAVY GAUGE FABRIC',
    image: 'https://images.unsplash.com/photo-1581655353564-df123a1eb820?w=400&q=80',
  },
  {
    id: 5,
    name: 'Solids: Navy Blue',
    category: 'Oversized T-Shirts',
    price: 849,
    fitLabel: 'OVERSIZED FIT',
    fabricLabel: 'PREMIUM HEAVY GAUGE FABRIC',
    image: 'https://images.unsplash.com/photo-1571945153237-4929e783af4a?w=400&q=80',
  },
  {
    id: 6,
    name: 'Solids: Olive Green',
    category: 'Oversized T-Shirts',
    price: 799,
    fitLabel: 'OVERSIZED FIT',
    fabricLabel: 'PREMIUM HEAVY GAUGE FABRIC',
    image: 'https://images.unsplash.com/photo-1434389677669-e08b4cac3105?w=400&q=80',
  },
];

const OtherBought: React.FC = () => {
  return (
    <section className="py-8 w-full">
      <h2 className="text-lg font-semibold text-gray-900 mb-4 px-4 tracking-tight">
        Others Also Bought
      </h2>

      {/* Swiper wrapper — overflow-hidden prevents page shrink */}
      <div className="relative px-10 overflow-hidden">
        <Swiper
          modules={[Navigation]}
          navigation={{
            prevEl: '.swiper-btn-prev',
            nextEl: '.swiper-btn-next',
          }}
          slidesPerView={4}
          spaceBetween={16}
          grabCursor={true}
          breakpoints={{
            320: { slidesPerView: 1.2, spaceBetween: 12 },
            480: { slidesPerView: 2.2, spaceBetween: 12 },
            768: { slidesPerView: 3, spaceBetween: 14 },
            1024: { slidesPerView: 4, spaceBetween: 16 },
          }}
        >
          {products.map((product) => (
            <SwiperSlide key={product.id}>
              <ProductCard product={product} />
            </SwiperSlide>
          ))}
        </Swiper>

        {/* Custom nav buttons — centered vertically on image height (h-80 = 320px → top ~140px) */}
        <button
          className="swiper-btn-prev absolute top-[50%] -translate-y-1/2 left-0 z-10
            w-9 h-9 rounded-full border border-gray-300 bg-white shadow-sm
            flex items-center justify-center text-2xl text-gray-600
            hover:border-gray-500 hover:shadow-md transition-all duration-200
            disabled:opacity-30 disabled:cursor-not-allowed"
          aria-label="Previous"
        >
          ‹
        </button>
        <button
          className="swiper-btn-next absolute top-[50%] -translate-y-1/2 right-0 z-10
            w-9 h-9 rounded-full border border-gray-300 bg-white shadow-sm
            flex items-center justify-center text-2xl text-gray-600
            hover:border-gray-500 hover:shadow-md transition-all duration-200
            disabled:opacity-30 disabled:cursor-not-allowed"
          aria-label="Next"
        >
          ›
        </button>
      </div>
    </section>
  );
};

const ProductCard: React.FC<{ product: Product }> = ({ product }) => {
  return (
    <div className="rounded-lg overflow-hidden bg-white">
      {/* Image */}
      <div className="relative w-full h-80 overflow-hidden bg-gray-100">
        <img
          src={product.image}
          alt={product.name}
          className="w-full h-full object-cover block"
          draggable={false}
        />

        {/* Fit badge — top left */}
        <div className="absolute top-2.5 left-2.5 bg-black/70 px-2 py-1 rounded-sm">
          <span className="text-white text-[9px] font-bold tracking-wide leading-none">
            {product.fitLabel}
          </span>
        </div>

        {/* Fabric badge — bottom left */}
        <div className="absolute bottom-2.5 left-2.5 bg-black/70 px-2 py-1 rounded-sm max-w-[90px]">
          <span className="text-white text-[9px] font-bold tracking-wide leading-tight block">
            {product.fabricLabel}
          </span>
        </div>
      </div>

      {/* Info */}
      <div className="pt-3 pb-2 px-1">
        <p className="text-sm font-medium text-gray-900 truncate">{product.name}</p>
        <p className="text-xs text-gray-400 mt-0.5 mb-1.5">{product.category}</p>
        <div className="flex items-center gap-2 flex-wrap">
          <span className="text-sm font-semibold text-gray-900">₹ {product.price}</span>
          {product.originalPrice && (
            <>
              <span className="text-xs text-gray-400 line-through">₹ {product.originalPrice}</span>
              <span className="text-[11px] font-semibold text-red-500 bg-red-50 px-1.5 py-0.5 rounded">
                ₹ {product.originalPrice - product.price} OFF
              </span>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default OtherBought;
