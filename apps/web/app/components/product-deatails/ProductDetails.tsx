'use client';
import React, { useState } from 'react';
import DeliveryDetails from './DeliveryDetails';
import ProductAccordion from './ProductAccordion';

const ProductDetails = () => {
  const [selectedSize, setSelectedSize] = useState<string | null>(null);
  const [quantity, setQuantity] = useState(1);
  const [activeImage, setActiveImage] = useState(0);
  const [wishlist, setWishlist] = useState(false);

  const sizes = [
    { label: 'XS', available: false },
    { label: 'S', available: true, lowStock: true, stockLeft: 9 },
    { label: 'M', available: true },
    { label: 'L', available: true },
    { label: 'XL', available: true },
    { label: 'XXL', available: true },
    { label: 'XXXL', available: true },
  ];

  const images = [
    'https://placehold.co/600x750/d1cfc9/6b6b6b?text=Product+Front',
    'https://placehold.co/600x750/c5c3bd/6b6b6b?text=Product+Side',
    'https://placehold.co/600x750/b8b5ae/6b6b6b?text=Product+Detail',
    'https://placehold.co/600x750/cccac4/6b6b6b?text=Product+Back',
  ];

  return (
    <div className="min-h-screen bg-white font-sans">
      {/* Breadcrumb */}
      <div className="max-w-[1450px] mx-auto px-6 py-3 text-sm text-gray-500">
        <span className="hover:text-gray-800 cursor-pointer transition-colors">Home</span>
        <span className="mx-2 text-gray-300">/</span>
        <span className="hover:text-gray-800 cursor-pointer transition-colors">
          Cotton Linen Shirts
        </span>
        <span className="mx-2 text-gray-300">/</span>
        <span className="hover:text-gray-800 cursor-pointer transition-colors">
          The Souled Store
        </span>
        <span className="mx-2 text-gray-300">/</span>
        <span className="text-gray-900 font-medium">Cotton Linen Stripes: Horizon</span>
      </div>

      {/* Main Content */}
      <div className="max-w-[1450px] mx-auto px-6 py-4">
        <div className="grid grid-cols-12 gap-10">
          {/* LEFT: Image Gallery */}
          <div className="col-span-12 lg:col-span-7 flex gap-4">
            {/* Thumbnails */}
            <div className="flex flex-col gap-3 w-[80px] flex-shrink-0">
              {images.map((img, i) => (
                <button
                  key={i}
                  onClick={() => setActiveImage(i)}
                  className={`w-[80px] h-[100px] overflow-hidden rounded border-2 transition-all duration-200 ${
                    activeImage === i
                      ? 'border-gray-900 opacity-100'
                      : 'border-gray-200 opacity-60 hover:opacity-90'
                  }`}
                >
                  <img src={img} alt={`View ${i + 1}`} className="w-full h-full object-cover" />
                </button>
              ))}
            </div>

            {/* Main Image */}
            <div className="flex-1 relative overflow-hidden rounded-lg">
              <div className="absolute top-3 left-3 z-10">
                <span className="bg-white text-gray-700 text-xs font-semibold px-3 py-1 rounded-full border border-gray-200 uppercase tracking-wider">
                  Linen Blend
                </span>
              </div>
              <img
                src={images[activeImage]}
                alt="Product"
                className="w-full h-ful object-cover transition-all duration-500"
                style={{ minHeight: '560px' }}
              />
            </div>
          </div>

          {/* RIGHT: Product Info */}
          <div className="col-span-12 lg:col-span-5 pt-2">
            {/* Category */}
            <p className="text-xs text-gray-400 uppercase tracking-widest font-medium mb-2">
              Cotton Linen Shirts
            </p>

            {/* Title */}
            <h1 className="text-3xl font-bold text-gray-900 leading-tight mb-4">
              Cotton Linen Stripes: Horizon
            </h1>

            {/* Price */}
            <div className="flex items-baseline gap-3 mb-1">
              <span className="text-2xl font-bold text-gray-900">₹ 1,199</span>
              <span className="text-sm line-through text-gray-400">₹ 1,499</span>
              <span className="text-sm font-semibold text-green-600 bg-green-50 px-2 py-0.5 rounded">
                20% OFF
              </span>
            </div>
            <p className="text-xs text-gray-400 mb-6">Price incl. of all taxes</p>

            <hr className="border-gray-100 mb-6" />

            {/* Size Selector */}
            <div className="mb-6">
              <div className="flex items-center justify-between mb-3">
                <span className="text-sm font-semibold text-gray-800 uppercase tracking-wide">
                  Please select a size
                </span>
                <button className="text-sm font-semibold text-blue-600 hover:text-blue-800 underline underline-offset-2 transition-colors">
                  SIZE CHART
                </button>
              </div>

              <div className="flex flex-wrap gap-2">
                {sizes.map((size) => (
                  <button
                    key={size.label}
                    disabled={!size.available}
                    onClick={() => size.available && setSelectedSize(size.label)}
                    className={`
                      relative w-[52px] h-[52px] rounded border text-sm font-medium transition-all duration-150
                      ${
                        !size.available
                          ? 'border-gray-200 text-gray-300 cursor-not-allowed bg-gray-50 line-through'
                          : selectedSize === size.label
                            ? 'border-gray-900 bg-gray-900 text-white shadow-md'
                            : 'border-gray-300 text-gray-700 hover:border-gray-800 hover:text-gray-900 bg-white'
                      }
                    `}
                  >
                    {size.label}
                    {size.lowStock && (
                      <span className="absolute -bottom-5 left-1/2 -translate-x-1/2 text-[10px] font-semibold text-red-500 whitespace-nowrap">
                        {size.stockLeft} Left
                      </span>
                    )}
                  </button>
                ))}
              </div>

              {/* Low stock note spacing */}
              <div className="mt-6" />

              {/* Size not available */}
              <p className="text-sm text-gray-500 mt-1">
                Size not available?{' '}
                <button className="text-blue-600 hover:text-blue-800 font-medium underline underline-offset-2">
                  Notify Me
                </button>
              </p>
            </div>

            <hr className="border-gray-100 mb-6" />

            {/* Quantity */}
            <div className="flex items-center gap-4 mb-6">
              <span className="text-sm font-semibold text-gray-800 uppercase tracking-wide">
                Quantity
              </span>
              <div className="flex items-center border border-gray-300 rounded-md overflow-hidden">
                <button
                  onClick={() => setQuantity((q) => Math.max(1, q - 1))}
                  className="w-9 h-9 flex items-center justify-center text-gray-600 hover:bg-gray-100 transition-colors text-lg font-light"
                >
                  −
                </button>
                <span className="w-10 text-center text-sm font-semibold text-gray-900">
                  {String(quantity).padStart(2, '0')}
                </span>
                <button
                  onClick={() => setQuantity((q) => q + 1)}
                  className="w-9 h-9 flex items-center justify-center text-gray-600 hover:bg-gray-100 transition-colors text-lg font-light"
                >
                  +
                </button>
              </div>
            </div>

            {/* CTA Buttons */}
            <div className="flex gap-3 mb-6">
              <button className="flex-1 bg-red-600 hover:bg-red-700 active:scale-[0.98] text-white font-bold py-4 rounded-md text-sm uppercase tracking-wider transition-all duration-150 shadow-sm hover:shadow-md">
                Add to Cart
              </button>
              <button
                onClick={() => setWishlist(!wishlist)}
                className={`flex-1 border-2 font-bold py-4 rounded-md text-sm uppercase tracking-wider transition-all duration-150 flex items-center justify-center gap-2
                  ${
                    wishlist
                      ? 'border-red-400 text-red-500 bg-red-50'
                      : 'border-gray-300 text-gray-700 hover:border-gray-500 bg-white'
                  }`}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="w-4 h-4"
                  fill={wishlist ? 'currentColor' : 'none'}
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={2}
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
                  />
                </svg>
                {wishlist ? 'Wishlisted' : 'Add to Wishlist'}
              </button>
            </div>

            {/* Share */}
            <div className="flex items-center gap-4">
              <span className="text-sm font-semibold text-gray-700 uppercase tracking-wide">
                Share
              </span>
              {[
                {
                  label: 'WhatsApp',
                  icon: (
                    <svg viewBox="0 0 24 24" className="w-5 h-5" fill="currentColor">
                      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
                    </svg>
                  ),
                  color: 'text-green-600 hover:text-green-700',
                },
                {
                  label: 'Facebook',
                  icon: (
                    <svg viewBox="0 0 24 24" className="w-5 h-5" fill="currentColor">
                      <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
                    </svg>
                  ),
                  color: 'text-blue-600 hover:text-blue-800',
                },
                {
                  label: 'Twitter',
                  icon: (
                    <svg viewBox="0 0 24 24" className="w-5 h-5" fill="currentColor">
                      <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-4.714-6.231-5.401 6.231H2.748l7.73-8.835L1.254 2.25H8.08l4.259 5.63zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
                    </svg>
                  ),
                  color: 'text-gray-800 hover:text-black',
                },
                {
                  label: 'Instagram',
                  icon: (
                    <svg viewBox="0 0 24 24" className="w-5 h-5" fill="currentColor">
                      <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
                    </svg>
                  ),
                  color: 'text-pink-600 hover:text-pink-700',
                },
              ].map((s) => (
                <button
                  key={s.label}
                  title={s.label}
                  className={`${s.color} transition-colors duration-150`}
                >
                  {s.icon}
                </button>
              ))}
            </div>

            <hr className="border-gray-100 my-6" />

            {/* Quick Info Pills */}
            <div className="flex flex-wrap gap-2">
              {['100% Cotton Linen', 'Machine Washable', 'Regular Fit', 'Full Sleeve'].map(
                (tag) => (
                  <span
                    key={tag}
                    className="text-xs text-gray-600 bg-gray-100 px-3 py-1.5 rounded-full border border-gray-200 font-medium"
                  >
                    {tag}
                  </span>
                )
              )}
            </div>

            <div className="gap-2 mt-6">
              <DeliveryDetails />
            </div>

            <div className="gap-2 mt-6">
              <ProductAccordion />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetails;
