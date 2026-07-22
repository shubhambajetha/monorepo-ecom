'use client';

import { useState } from 'react';
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

  const {
    data,
    isLoading,
    isError,
  } = useGetProductByCollections(category, collection);

  const rawData = initialProducts ?? data;
  const products: Product[] = Array.isArray(rawData)
    ? rawData
    : Array.isArray(rawData?.data)
    ? rawData.data
    : [];

  return (
    <div className="py-2 mx-2">
      <TopBar
        title={collection ? collection.toUpperCase() : 'Products'}
        count={products.length}
        filtersVisible={filtersVisible}
        onToggleFilters={() => setFiltersVisible(!filtersVisible)}
      />

      <div className="flex flex-col lg:flex-row gap-6 mt-4">
        {/* Sidebar */}
        <div
          className={`
            overflow-hidden transition-all duration-300
            ${
              filtersVisible
                ? 'w-full lg:w-64 opacity-100'
                : 'w-0 opacity-0 hidden lg:block'
            }
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
            <div
              className={`
                grid gap-4
                grid-cols-2
                sm:grid-cols-2
                ${
                  filtersVisible
                    ? 'lg:grid-cols-3'
                    : 'lg:grid-cols-4'
                }
              `}
            >
              {products.map((product) => (
                <SingleCart
                  key={product.id || product.slug}
                  product={product}
                />
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProductCard;