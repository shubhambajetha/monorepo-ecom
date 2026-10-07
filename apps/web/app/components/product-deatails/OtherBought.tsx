'use client';

import React, { useRef } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Autoplay } from 'swiper/modules';
import { ChevronLeft, ChevronRight, Sparkles, Heart } from 'lucide-react';
import Link from 'next/link';
import { resolveApiAssetUrl } from '@/app/lib/config';
import WishLisht from '@/app/common/WishLisht';
import useGetAllProducts from '@/app/hooks/products/useGetAllProducts';
import { Product } from '@/app/types/product/productype';

// Swiper styles
import 'swiper/css';
import 'swiper/css/navigation';

interface OtherBoughtProps {
  currentProductId?: string;
  category?: string;
  collection?: string;
}

const fallbackProducts = [
  {
    id: 'rec-1',
    title: 'Solids: Classic Obsidian Black',
    brand: 'The Souled Store',
    category: 'Oversized Tees',
    price: 999,
    discountPrice: 699,
    rating: 4.9,
    thumbnail: 'https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=600&q=80',
    slug: 'solids-obsidian-black',
  },
  {
    id: 'rec-2',
    title: 'Vintage Washed Slate Tee',
    brand: 'Urban Classic',
    category: 'T-Shirts',
    price: 1199,
    discountPrice: 849,
    rating: 4.8,
    thumbnail: 'https://images.unsplash.com/photo-1503341504253-dff4815485f1?w=600&q=80',
    slug: 'vintage-washed-slate',
  },
  {
    id: 'rec-3',
    title: 'Heavyweight Sand Crewneck',
    brand: 'Luxe Basics',
    category: 'Sweatshirts',
    price: 1499,
    discountPrice: 1099,
    rating: 4.7,
    thumbnail: 'https://images.unsplash.com/photo-1562157873-818bc0726f68?w=600&q=80',
    slug: 'heavyweight-sand-crewneck',
  },
  {
    id: 'rec-4',
    title: 'Minimalist Olive Oversized Shirt',
    brand: 'The Souled Store',
    category: 'Shirts',
    price: 1299,
    discountPrice: 899,
    rating: 4.9,
    thumbnail: 'https://images.unsplash.com/photo-1581655353564-df123a1eb820?w=600&q=80',
    slug: 'minimalist-olive-shirt',
  },
  {
    id: 'rec-5',
    title: 'Midnight Navy Resort Shirt',
    brand: 'Luxe Basics',
    category: 'Casual Shirts',
    price: 1399,
    discountPrice: 949,
    rating: 4.8,
    thumbnail: 'https://images.unsplash.com/photo-1571945153237-4929e783af4a?w=600&q=80',
    slug: 'midnight-navy-resort-shirt',
  },
  {
    id: 'rec-6',
    title: 'Textured Linen Blend Tee',
    brand: 'Artisan Fit',
    category: 'T-Shirts',
    price: 1099,
    discountPrice: 799,
    rating: 4.6,
    thumbnail: 'https://images.unsplash.com/photo-1434389677669-e08b4cac3105?w=600&q=80',
    slug: 'textured-linen-blend-tee',
  },
];

export default function OtherBought({
  currentProductId,
  category = 'men',
  collection = 'clothing',
}: OtherBoughtProps) {
  const { data: apiProducts } = useGetAllProducts({
    limit: '10',
  });

  // Extract products list or fallback
  const fetchedList = apiProducts?.data?.filter((p) => p.id !== currentProductId) || [];
  const displayItems = fetchedList.length >= 3 ? fetchedList : fallbackProducts;

  return (
    <section className="py-12 border-t border-gray-100">
      <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-8 gap-4">
        <div>
          <div className="flex items-center gap-2 mb-1.5 text-xs font-bold text-amber-600 uppercase tracking-wider">
            <Sparkles size={14} />
            <span>Curated For You</span>
          </div>
          <h2 className="text-xl sm:text-2xl font-extrabold text-gray-900 tracking-tight">
            You Might Also Like
          </h2>
          <p className="text-xs text-gray-500 mt-1">
            Handpicked matching styles trending in this collection
          </p>
        </div>

        {/* Custom Navigation Buttons */}
        <div className="flex items-center gap-2">
          <button
            id="other-bought-prev"
            aria-label="Previous styles"
            className="w-9 h-9 rounded-full border border-gray-200 bg-white hover:bg-gray-900 hover:text-white hover:border-gray-900 flex items-center justify-center text-gray-700 shadow-2xs transition-all active:scale-95 disabled:opacity-30"
          >
            <ChevronLeft size={18} />
          </button>
          <button
            id="other-bought-next"
            aria-label="Next styles"
            className="w-9 h-9 rounded-full border border-gray-200 bg-white hover:bg-gray-900 hover:text-white hover:border-gray-900 flex items-center justify-center text-gray-700 shadow-2xs transition-all active:scale-95 disabled:opacity-30"
          >
            <ChevronRight size={18} />
          </button>
        </div>
      </div>

      {/* Swiper Carousel */}
      <div className="relative -mx-2 px-2">
        <Swiper
          modules={[Navigation, Autoplay]}
          navigation={{
            prevEl: '#other-bought-prev',
            nextEl: '#other-bought-next',
          }}
          autoplay={{
            delay: 4500,
            disableOnInteraction: true,
            pauseOnMouseEnter: true,
          }}
          slidesPerView={4}
          spaceBetween={20}
          grabCursor={true}
          breakpoints={{
            320: { slidesPerView: 1.3, spaceBetween: 12 },
            480: { slidesPerView: 2.2, spaceBetween: 14 },
            768: { slidesPerView: 3.2, spaceBetween: 18 },
            1024: { slidesPerView: 4, spaceBetween: 20 },
          }}
          className="pb-4"
        >
          {displayItems.map((item: any) => {
            const rawImg = item.thumbnail || item.images?.[0];
            const imgSrc = resolveApiAssetUrl(rawImg) || rawImg;
            const hasDiscount =
              typeof item.discountPrice === 'number' && item.discountPrice < item.price;
            const displayPrice = hasDiscount ? item.discountPrice : item.price;
            const discountPct = hasDiscount
              ? Math.round(((item.price - item.discountPrice) / item.price) * 100)
              : 0;

            const productUrl = item.slug
              ? `/${category}/${collection}/${item.slug}`
              : `/product-details`;

            return (
              <SwiperSlide key={item.id}>
                <div className="group relative bg-white rounded-2xl overflow-hidden border border-gray-200/80 shadow-2xs hover:shadow-lg transition-all duration-300 flex flex-col h-full">
                  {/* Image Area */}
                  <div className="relative w-full aspect-[3/4] bg-gray-100 overflow-hidden">
                    <Link href={productUrl} className="block w-full h-full">
                      <img
                        src={imgSrc}
                        alt={item.title || item.name}
                        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-106"
                        loading="lazy"
                      />
                    </Link>

                    {/* Discount Badge */}
                    {hasDiscount && (
                      <span className="absolute top-2.5 left-2.5 bg-red-600 text-white text-[10px] font-bold px-2 py-0.5 rounded-md uppercase tracking-wide shadow-xs">
                        {discountPct}% OFF
                      </span>
                    )}

                    {/* Wishlist Button */}
                    {item.id && (
                      <div className="absolute top-2.5 right-2.5 z-10">
                        <WishLisht
                          productId={item.id}
                          className="w-8 h-8 rounded-full bg-white/90 backdrop-blur-xs text-gray-700 hover:text-red-500 flex items-center justify-center shadow-xs transition-transform hover:scale-110"
                        />
                      </div>
                    )}
                  </div>

                  {/* Info Area */}
                  <div className="p-3.5 flex flex-col justify-between flex-1">
                    <div>
                      <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest truncate">
                        {item.brand || 'Exclusive'}
                      </p>
                      <Link href={productUrl}>
                        <h3 className="text-xs font-bold text-gray-900 mt-1 line-clamp-1 group-hover:text-red-600 transition-colors">
                          {item.title || item.name}
                        </h3>
                      </Link>
                    </div>

                    <div className="flex items-baseline gap-2 mt-2 pt-2 border-t border-gray-100">
                      <span className="text-sm font-extrabold text-gray-900">
                        ₹{displayPrice?.toLocaleString('en-IN')}
                      </span>
                      {hasDiscount && (
                        <span className="text-[11px] text-gray-400 line-through">
                          ₹{item.price?.toLocaleString('en-IN')}
                        </span>
                      )}
                    </div>
                  </div>
                </div>
              </SwiperSlide>
            );
          })}
        </Swiper>
      </div>
    </section>
  );
}
