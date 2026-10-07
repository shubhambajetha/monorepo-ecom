'use client';

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

const demoFallbackProduct: ApiResponse<Product> = {
  success: true,
  message: 'Product retrieved successfully',
  data: {
    id: 'demo-prod-001',
    title: 'Solids: Heavyweight Vintage Drop-Shoulder Tee',
    slug: 'solids-heavyweight-vintage-drop-shoulder-tee',
    description:
      'Elevate your daily rotation with this premium heavyweight drop-shoulder tee. Crafted with 100% combed organic cotton, boasting a rich 240 GSM dense knit for effortless drape, structured collar that never loses shape, and pre-shrunk finish for reliable longevity.',
    brand: 'The Souled Store',
    sku: 'TSS-OVR-2026',
    price: 1499,
    discountPrice: 899,
    stock: 8,
    thumbnail: 'https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=1000&q=85',
    images: [
      'https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=1200&q=85',
      'https://images.unsplash.com/photo-1503341504253-dff4815485f1?w=1200&q=85',
      'https://images.unsplash.com/photo-1562157873-818bc0726f68?w=1200&q=85',
      'https://images.unsplash.com/photo-1581655353564-df123a1eb820?w=1200&q=85',
    ],
    sizes: ['XS', 'S', 'M', 'L', 'XL', 'XXL'],
    colors: ['Obsidian Black', 'Chalk White', 'Sage Green', 'Desert Clay'],
    rating: 4.85,
    isFeatured: true,
    isActive: true,
    isSpotlight: true,
    collectionId: 'col-oversized-01',
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
};

const AllDetils = ({
  slug = 'solids-heavyweight-vintage-drop-shoulder-tee',
  category = 'men',
  collection = 'oversized-t-shirts',
  initialDetails,
}: AllDetilsProps) => {
  const detailsToUse = initialDetails || demoFallbackProduct;

  return (
    <div className="w-full">
      <ProductDetails
        slug={slug}
        category={category}
        collection={collection}
        initialDetails={detailsToUse}
      />
    </div>
  );
};

export default AllDetils;
