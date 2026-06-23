'use client';

import React, { useState } from 'react';
import SingleCart from '../cards/SingleCart';
import FilterOption from './FilterOption';
import TopBar from './TopBar';

const ProductCard = () => {
  const [filtersVisible, setFiltersVisible] = useState(true);

  return (
    <div className="py-2 mx-2">
      <TopBar
        filtersVisible={filtersVisible}
        onToggleFilters={() => setFiltersVisible(!filtersVisible)}
      />

      <div className="flex flex-col lg:flex-row gap-6 mt-4">
        {/* Sidebar */}
        <div
          className={`
            overflow-hidden transition-all duration-300 scroll-behavior:smooth;
            ${filtersVisible ? 'w-full lg:w-64 opacity-100' : 'w-0 opacity-0 hidden lg:block'}
          `}
        >
          {filtersVisible && <FilterOption />}
        </div>

        {/* Products */}
        <div className="flex-1 transition-all duration-300">
          <div
            className={`
              grid gap-4
              grid-cols-2
              sm:grid-cols-2
              ${filtersVisible ? 'lg:grid-cols-3' : 'lg:grid-cols-3 xl:grid-cols-3 '}
            `}
          >
            <SingleCart />
            <SingleCart />
            <SingleCart />
            <SingleCart />
            <SingleCart />
            <SingleCart />
            <SingleCart />
            <SingleCart />
            <SingleCart />
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
