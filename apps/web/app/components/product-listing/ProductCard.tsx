'use client';

import { useEffect, useRef, useState } from 'react';
import SingleCart from '../cards/SingleCart';
import FilterOption from './FilterOption';
import TopBar from './TopBar';
import { Product } from '@/app/types/product/productype';
import useGetProductByCollections from '@/app/hooks/collection/useGetProductByCollection';
import { ApiResponse } from '@/app/utils/api';

interface ProductCardProps {
  category?: string;
  collection?: string;
  initialProducts?: ApiResponse<Product[]> | Product[] | any;
}

const ProductCard = ({ category = '', collection = '', initialProducts }: ProductCardProps) => {
  const [filtersVisible, setFiltersVisible] = useState(true);
  const loadMoreRef = useRef<HTMLDivElement | null>(null);

  const {
    data,
    isLoading,
    isError,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
  } = useGetProductByCollections(category, collection);

  const products: Product[] = initialProducts
    ? (Array.isArray(initialProducts) ? initialProducts : initialProducts?.data ?? [])
    : (data?.pages.flatMap((page) => page.data ?? []) ?? []);

  const totalCount = initialProducts
    ? products.length
    : (data?.pages[0]?.pagination?.total ?? products.length);

  useEffect(() => {
    if (!loadMoreRef.current || !hasNextPage || isFetchingNextPage) return;

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0]?.isIntersecting && hasNextPage && !isFetchingNextPage) {
          fetchNextPage();
        }
      },
      { threshold: 0.1 }
    );

    observer.observe(loadMoreRef.current);

    return () => observer.disconnect();
  }, [hasNextPage, isFetchingNextPage, fetchNextPage]);

  return (
    <div className="py-2 mx-2">
      <TopBar
        title={collection ? collection.toUpperCase() : 'Products'}
        count={totalCount}
        filtersVisible={filtersVisible}
        onToggleFilters={() => setFiltersVisible(!filtersVisible)}
      />

      <div className="flex flex-col lg:flex-row gap-6 mt-4">
        {/* Sidebar */}
        <div
          className={`
            overflow-hidden transition-all duration-300
            ${filtersVisible ? 'w-full lg:w-64 opacity-100' : 'w-0 opacity-0 hidden lg:block'}
          `}
        >
          {filtersVisible && <FilterOption />}
        </div>

        {/* Products */}
        <div className="flex-1">
          {isLoading && !initialProducts ? (
            <div className="flex justify-center items-center h-80">
              <p>Loading...</p>
            </div>
          ) : isError && !initialProducts ? (
            <div className="flex justify-center items-center h-80">
              <p className="text-red-500">Something went wrong.</p>
            </div>
          ) : products.length === 0 ? (
            <div className="flex justify-center items-center h-80">
              <p className="text-gray-500">No products found.</p>
            </div>
          ) : (
            <>
              <div
                className={`
                  grid gap-4
                  grid-cols-2
                  sm:grid-cols-2
                  ${filtersVisible ? 'lg:grid-cols-3' : 'lg:grid-cols-4'}
                `}
              >
                {products.map((product) => (
                  <SingleCart
                    key={product.id || product.slug}
                    product={{ ...product, category, collection }}
                  />
                ))}
              </div>

              {/* Scroll Trigger Sentinel */}
              <div ref={loadMoreRef} className="py-6 flex justify-center items-center">
                {isFetchingNextPage && (
                  <p className="text-sm text-gray-500 animate-pulse">Loading more products...</p>
                )}
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
