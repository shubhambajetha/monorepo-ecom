'use client';
import { ShirtIcon } from 'lucide-react';
import Link from 'next/link';
import { Product } from '@/app/types/product/productype';
import { resolveApiAssetUrl } from '@/app/lib/config';
import WishLisht from '@/app/common/WishLisht';

export interface SingleCartProps {
  product?: Partial<Product> & {
    title?: string;
    category?: string;
    brand?: string;
    price?: number;
    originalPrice?: number;
    discountPrice?: number | null;
    colors?: string[];
    sizes?: string[];
    thumbnail?: string;
    images?: string[];
    slug?: string;
    id?: string;
    collection?: string;
  };
}

const SingleCart: React.FC<SingleCartProps> = ({ product }) => {
  const displayTitle = product?.title;
  const displayCategory = product?.brand || (product as any)?.category;

  const hasDiscount = Boolean(
    product?.discountPrice && product.discountPrice < (product.price || 0)
  );
  const displayPrice = hasDiscount ? product?.discountPrice! : product?.price;
  const displayOriginalPrice = hasDiscount ? product?.price : (product?.discountPrice ?? undefined);

  const rawImage = product?.thumbnail || product?.images?.[0];
  const imageUrl = resolveApiAssetUrl(rawImage) || rawImage;

  const displayColors = product?.colors?.length ? product.colors : undefined;
  const displaySizes = product?.sizes?.length ? product.sizes : undefined;

  const productUrl =
    product?.category && product?.collection && product?.slug
      ? `/${product.category}/${product.collection}/${product.slug}`
      : '#';
  const WishlistButton = WishLisht;
  return (
    <div className="group bg-white w-full rounded-sm overflow-hidden border border-gray-100 shadow-sm hover:shadow-md transition-shadow cursor-pointer flex flex-col justify-between">
      <div>
        {/* Image Area */}
        <div className="relative overflow-hidden w-full aspect-[4/5] bg-gray-100">
          <Link href={productUrl} className="block w-full h-full">
            {imageUrl ? (
              <img
                src={imageUrl}
                alt={displayTitle}
                className="w-full h-full object-cover transition-transform duration-400 group-hover:scale-105"
              />
            ) : (
              <div className="w-full h-full flex items-center justify-center bg-gray-200">
                <ShirtIcon size={80} className="text-white opacity-40" />
              </div>
            )}
          </Link>

          {/* Wishlist Button */}
          {product?.id && <WishlistButton productId={product?.id} />}
        </div>

        {/* Info Area */}
        <div className="p-3">
          <Link href={productUrl} className="block group-hover:text-red-600 transition-colors">
            <h3 className="font-bold text-[13px] text-gray-900 leading-tight truncate">
              {displayTitle}
            </h3>
          </Link>
          <p className="text-[11px] font-medium text-gray-400 mt-[2px] truncate">
            {displayCategory}
          </p>

          <div className="flex items-center justify-between mt-2">
            <span className="font-bold text-[15px] text-gray-900">
              ₹{displayPrice?.toLocaleString()}
            </span>
            {displayOriginalPrice && displayOriginalPrice > displayPrice! && (
              <span className="text-[11px] text-gray-400 line-through">
                ₹{displayOriginalPrice.toLocaleString()}
              </span>
            )}
          </div>

          {/* Sizes or Colors */}
          {displaySizes && displaySizes.length > 0 ? (
            <div className="flex gap-1 mt-2 flex-wrap">
              {displaySizes.map((size) => (
                <span
                  key={size}
                  className="text-[10px] border border-gray-200 rounded px-[6px] py-[2px] text-gray-600 hover:border-black hover:text-black transition-colors cursor-pointer"
                >
                  {size}
                </span>
              ))}
            </div>
          ) : displayColors && displayColors.length > 0 ? (
            <div className="flex gap-1 mt-2 flex-wrap">
              {displayColors.map((col, idx) => (
                <span
                  key={idx}
                  className="text-[10px] border border-gray-200 rounded px-[6px] py-[2px] text-gray-600 hover:border-black hover:text-black transition-colors cursor-pointer"
                >
                  {col}
                </span>
              ))}
            </div>
          ) : null}
        </div>
      </div>
    </div>
  );
};

export default SingleCart;
