import React from 'react';
import ProductDetails from './ProductDetails';
import { ApiResponse } from '@/app/utils/api';
import { Product } from '@/app/types/product/productype';

type AllDetilsProps = {
  slug?: string;
  category?: string;
  collection?: string;
  initialDetails?: ApiResponse<Product>;
};

const AllDetils = ({
  slug = '',
  category = '',
  collection = '',
  initialDetails,
}: AllDetilsProps) => {
  if (!initialDetails) return null;
  return (
    <div>
      <ProductDetails
        slug={slug}
        category={category}
        collection={collection}
        initialDetails={initialDetails}
      />
    </div>
  );
};

export default AllDetils;
