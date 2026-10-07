'use client';

import React, { useState, useRef, useEffect } from 'react';
import {
  Star,
  Share2,
  Heart,
  ShoppingBag,
  Zap,
  Truck,
  RotateCcw,
  ShieldCheck,
  CreditCard,
  Check,
  Copy,
  ChevronRight,
  ChevronLeft,
  Maximize2,
  Ruler,
  Clock,
  Sparkles,
  AlertCircle,
  Home,
  Flame,
} from 'lucide-react';
import Link from 'next/link';
import DeliveryDetails from './DeliveryDetails';
import ProductAccordion from './ProductAccordion';
import OtherBought from './OtherBought';
import SizeGuideModal from './SizeGuideModal';
import ImageLightbox from './ImageLightbox';
import StickyMobileCTA from './StickyMobileCTA';
import { useProductBySlug } from '@/app/hooks/products/useProductBySlug';
import { ApiResponse } from '@/app/utils/api';
import { Product } from '@/app/types/product/productype';
import AddToCart from '@/app/common/AddToCart';
import WishLisht from '@/app/common/WishLisht';
import { resolveApiAssetUrl } from '@/app/lib/config';
import Swal from 'sweetalert2';

type Props = {
  slug: string;
  category: string;
  collection: string;
  initialDetails?: ApiResponse<Product>;
};

const sharePlatforms = [
  {
    name: 'WhatsApp',
    color: 'hover:bg-emerald-50 hover:text-emerald-600',
    icon: (
      <svg viewBox="0 0 24 24" className="w-4 h-4" fill="currentColor">
        <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
      </svg>
    ),
    action: (title: string) => {
      window.open(
        `https://api.whatsapp.com/send?text=${encodeURIComponent(
          `Check out this ${title} on Owl E-commerce: ${window.location.href}`
        )}`,
        '_blank'
      );
    },
  },
  {
    name: 'X (Twitter)',
    color: 'hover:bg-gray-100 hover:text-black',
    icon: (
      <svg viewBox="0 0 24 24" className="w-4 h-4" fill="currentColor">
        <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-4.714-6.231-5.401 6.231H2.748l7.73-8.835L1.254 2.25H8.08l4.259 5.63zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
      </svg>
    ),
    action: (title: string) => {
      window.open(
        `https://twitter.com/intent/tweet?text=${encodeURIComponent(
          `Check out ${title}`
        )}&url=${encodeURIComponent(window.location.href)}`,
        '_blank'
      );
    },
  },
  {
    name: 'Facebook',
    color: 'hover:bg-blue-50 hover:text-blue-600',
    icon: (
      <svg viewBox="0 0 24 24" className="w-4 h-4" fill="currentColor">
        <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
      </svg>
    ),
    action: () => {
      window.open(
        `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(window.location.href)}`,
        '_blank'
      );
    },
  },
];

export default function ProductDetails({ slug, category, collection, initialDetails }: Props) {
  const { data, isLoading } = useProductBySlug(category, collection, slug, initialDetails);

  const productResponse = data ?? initialDetails;
  const details = productResponse?.data;

  // Selected options state
  const [selectedSize, setSelectedSize] = useState<string | null>(null);
  const [selectedColor, setSelectedColor] = useState<string | null>(null);
  const [quantity, setQuantity] = useState(1);
  const [activeImage, setActiveImage] = useState(0);

  // Modals & UI states
  const [isSizeGuideOpen, setIsSizeGuideOpen] = useState(false);
  const [isLightboxOpen, setIsLightboxOpen] = useState(false);
  const [copiedLink, setCopiedLink] = useState(false);

  // Image Zoom Lens
  const [zoomStyle, setZoomStyle] = useState<React.CSSProperties>({});
  const [isZooming, setIsZooming] = useState(false);
  const imageContainerRef = useRef<HTMLDivElement>(null);
  const sizeSelectorRef = useRef<HTMLDivElement>(null);

  // Default selection effect
  useEffect(() => {
    if (details) {
      if (details.sizes?.length && !selectedSize) {
        setSelectedSize(details.sizes[0] || null);
      }
      if (details.colors?.length && !selectedColor) {
        setSelectedColor(details.colors[0] || null);
      }
    }
  }, [details, selectedSize, selectedColor]);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!imageContainerRef.current) return;
    const { left, top, width, height } = imageContainerRef.current.getBoundingClientRect();
    const x = ((e.clientX - left) / width) * 100;
    const y = ((e.clientY - top) / height) * 100;

    setZoomStyle({
      transformOrigin: `${x}% ${y}%`,
      transform: 'scale(2)',
    });
  };

  const handleMouseEnter = () => setIsZooming(true);
  const handleMouseLeave = () => {
    setIsZooming(false);
    setZoomStyle({ transform: 'scale(1)', transformOrigin: 'center center' });
  };

  const handleCopyLink = () => {
    navigator.clipboard.writeText(window.location.href);
    setCopiedLink(true);
    setTimeout(() => setCopiedLink(false), 2000);
  };

  const scrollToSizes = () => {
    sizeSelectorRef.current?.scrollIntoView({ behavior: 'smooth', block: 'center' });
  };

  if (isLoading && !details) {
    return (
      <div className="min-h-[70vh] flex flex-col items-center justify-center space-y-4">
        <div className="w-12 h-12 rounded-full border-3 border-gray-200 border-t-gray-900 animate-spin" />
        <p className="text-xs font-semibold uppercase tracking-widest text-gray-500">
          Loading Luxury Details...
        </p>
      </div>
    );
  }

  if (!details) {
    return (
      <div className="min-h-[70vh] flex flex-col items-center justify-center p-6 text-center space-y-4">
        <div className="w-16 h-16 rounded-full bg-gray-100 flex items-center justify-center text-gray-400">
          <AlertCircle size={32} />
        </div>
        <h2 className="text-xl font-bold text-gray-900">Product Not Found</h2>
        <p className="text-xs text-gray-500 max-w-sm">
          The requested product might have been moved or is currently unavailable.
        </p>
        <Link
          href="/"
          className="px-5 py-2.5 bg-gray-900 text-white text-xs font-bold rounded-xl hover:bg-black transition-colors"
        >
          Return to Catalog
        </Link>
      </div>
    );
  }

  // Gallery Preparation
  const rawGallery = details.images?.length ? details.images : [details.thumbnail];
  const gallery = rawGallery.map((img) => resolveApiAssetUrl(img) || img);
  const activeSrc = gallery[activeImage] || gallery[0] || '';

  const hasDiscount =
    typeof details.discountPrice === 'number' && details.discountPrice < details.price;
  const displayPrice = hasDiscount ? details.discountPrice! : details.price;
  const discountPercent = hasDiscount
    ? Math.round(((details.price - details.discountPrice!) / details.price) * 100)
    : 0;
  const savingsAmount = hasDiscount ? details.price - details.discountPrice! : 0;

  const outOfStock = details.stock <= 0;
  const isLowStock = details.stock > 0 && details.stock <= 5;

  return (
    <div className="min-h-screen bg-white text-gray-900 selection:bg-gray-900 selection:text-white pb-16">
      {/* Top Breadcrumb Navigation */}
      <nav
        aria-label="Breadcrumb"
        className="border-b border-gray-100/80 bg-gray-50/50 backdrop-blur-xs sticky top-0 z-20"
      >
        <div className="max-w-[1400px] mx-auto px-4 sm:px-6 py-3 flex items-center justify-between text-xs">
          <div className="flex items-center gap-1.5 text-gray-500 overflow-x-auto scrollbar-none py-0.5">
            <Link
              href="/"
              className="flex items-center gap-1 hover:text-gray-900 transition-colors flex-shrink-0"
            >
              <Home size={13} />
              <span className="font-medium">Home</span>
            </Link>
            <ChevronRight size={12} className="text-gray-300 flex-shrink-0" />
            <Link
              href={`/${category || 'men'}`}
              className="hover:text-gray-900 transition-colors capitalize font-medium flex-shrink-0"
            >
              {category || 'Collection'}
            </Link>
            <ChevronRight size={12} className="text-gray-300 flex-shrink-0" />
            <Link
              href={`/${category || 'men'}/${collection || 'all'}`}
              className="hover:text-gray-900 transition-colors capitalize font-medium flex-shrink-0"
            >
              {collection || 'Apparel'}
            </Link>
            <ChevronRight size={12} className="text-gray-300 flex-shrink-0" />
            <span className="text-gray-900 font-semibold truncate max-w-[200px] sm:max-w-xs">
              {details.title}
            </span>
          </div>

          {/* Status Badge */}
          <div className="hidden sm:flex items-center gap-2">
            {outOfStock ? (
              <span className="inline-flex items-center gap-1 text-[11px] font-bold text-red-600 bg-red-50 px-2.5 py-1 rounded-full border border-red-200">
                Out of Stock
              </span>
            ) : isLowStock ? (
              <span className="inline-flex items-center gap-1 text-[11px] font-bold text-amber-700 bg-amber-50 px-2.5 py-1 rounded-full border border-amber-200 animate-pulse">
                <Flame size={12} className="text-amber-600" /> Only {details.stock} Left!
              </span>
            ) : (
              <span className="inline-flex items-center gap-1 text-[11px] font-semibold text-emerald-700 bg-emerald-50 px-2.5 py-1 rounded-full border border-emerald-200">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-ping" />
                In Stock & Ready to Ship
              </span>
            )}
          </div>
        </div>
      </nav>

      {/* Main Product Container */}
      <div className="max-w-[1400px] mx-auto px-4 sm:px-6 pt-6 sm:pt-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 xl:gap-14 items-start">
          {/* ========================================================= */}
          {/* LEFT COLUMN: Ultra-Premium Interactive Gallery (7 Cols) */}
          {/* ========================================================= */}
          <div className="lg:col-span-7 flex flex-col-reverse md:flex-row gap-4 lg:sticky lg:top-16">
            {/* Thumbnail Strip */}
            {gallery.length > 1 && (
              <div className="flex md:flex-col gap-3 overflow-x-auto md:overflow-y-auto scrollbar-none max-h-[620px] pb-2 md:pb-0 flex-shrink-0">
                {gallery.map((img, i) => (
                  <button
                    key={img + i}
                    onClick={() => setActiveImage(i)}
                    onMouseEnter={() => setActiveImage(i)}
                    className={`relative w-16 h-20 md:w-20 md:h-26 rounded-xl overflow-hidden border-2 transition-all duration-200 flex-shrink-0 ${
                      activeImage === i
                        ? 'border-gray-900 ring-2 ring-gray-900/20 shadow-md opacity-100 scale-102'
                        : 'border-gray-200/80 opacity-60 hover:opacity-95 hover:border-gray-400'
                    }`}
                  >
                    <img
                      src={img}
                      alt={`${details.title} thumbnail ${i + 1}`}
                      className="w-full h-full object-cover"
                    />
                  </button>
                ))}
              </div>
            )}

            {/* Main Stage Image Viewer */}
            <div className="relative flex-1 rounded-2xl overflow-hidden bg-gray-100/80 border border-gray-200/80 group select-none shadow-xs">
              {/* Badges Overlay */}
              <div className="absolute top-4 left-4 z-10 flex flex-col gap-2 pointer-events-none">
                {details.brand && (
                  <span className="bg-white/95 backdrop-blur-md text-gray-900 text-[11px] font-bold px-3 py-1.5 rounded-full border border-gray-200 shadow-xs uppercase tracking-wider">
                    {details.brand}
                  </span>
                )}
                {details.isSpotlight && (
                  <span className="bg-amber-500 text-white text-[10px] font-extrabold px-2.5 py-1 rounded-full shadow-xs uppercase tracking-widest flex items-center gap-1">
                    <Sparkles size={11} /> Spotlight
                  </span>
                )}
                {hasDiscount && (
                  <span className="bg-red-600 text-white text-[10px] font-extrabold px-2.5 py-1 rounded-full shadow-xs uppercase tracking-wider">
                    {discountPercent}% OFF
                  </span>
                )}
              </div>

              {/* Top Right Fullscreen Trigger */}
              <div className="absolute top-4 right-4 z-10 flex items-center gap-2">
                <button
                  type="button"
                  onClick={() => setIsLightboxOpen(true)}
                  title="Expand Fullscreen View"
                  className="w-9 h-9 rounded-full bg-white/90 hover:bg-white text-gray-700 hover:text-black shadow-md backdrop-blur-xs flex items-center justify-center transition-all hover:scale-110"
                >
                  <Maximize2 size={16} />
                </button>
              </div>

              {/* Main Image with Hover Zoom Lens */}
              <div
                ref={imageContainerRef}
                onMouseMove={handleMouseMove}
                onMouseEnter={handleMouseEnter}
                onMouseLeave={handleMouseLeave}
                onClick={() => setIsLightboxOpen(true)}
                className="relative w-full aspect-[4/5] min-h-[420px] sm:min-h-[580px] overflow-hidden cursor-zoom-in flex items-center justify-center"
              >
                <img
                  src={activeSrc}
                  alt={details.title}
                  style={zoomStyle}
                  className="w-full h-full object-cover transition-transform duration-200 ease-out"
                />

                {/* Hover Lens Hint Pill */}
                {!isZooming && (
                  <div className="absolute bottom-4 left-1/2 -translate-x-1/2 bg-black/60 backdrop-blur-md text-white/90 text-[11px] font-medium px-3.5 py-1.5 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none flex items-center gap-1.5 shadow-lg">
                    <Maximize2 size={12} />
                    <span>Roll over to zoom • Click for full screen</span>
                  </div>
                )}
              </div>

              {/* Gallery Arrow Controls */}
              {gallery.length > 1 && (
                <>
                  <button
                    type="button"
                    onClick={(e) => {
                      e.stopPropagation();
                      setActiveImage((prev) => (prev === 0 ? gallery.length - 1 : prev - 1));
                    }}
                    className="absolute left-3 top-1/2 -translate-y-1/2 z-10 w-9 h-9 rounded-full bg-white/80 hover:bg-white text-gray-800 shadow-md backdrop-blur-xs flex items-center justify-center transition-all opacity-0 group-hover:opacity-100 hover:scale-105"
                    aria-label="Previous photo"
                  >
                    <ChevronLeft size={18} />
                  </button>
                  <button
                    type="button"
                    onClick={(e) => {
                      e.stopPropagation();
                      setActiveImage((prev) => (prev === gallery.length - 1 ? 0 : prev + 1));
                    }}
                    className="absolute right-3 top-1/2 -translate-y-1/2 z-10 w-9 h-9 rounded-full bg-white/80 hover:bg-white text-gray-800 shadow-md backdrop-blur-xs flex items-center justify-center transition-all opacity-0 group-hover:opacity-100 hover:scale-105"
                    aria-label="Next photo"
                  >
                    <ChevronRight size={18} />
                  </button>
                </>
              )}

              {/* Image Counter Badge */}
              <div className="absolute bottom-4 right-4 z-10 bg-black/65 backdrop-blur-xs text-white text-[10px] font-bold px-2.5 py-1 rounded-full">
                {activeImage + 1} / {gallery.length}
              </div>
            </div>
          </div>

          {/* ========================================================= */}
          {/* RIGHT COLUMN: Product Information & Purchase Area (5 Cols) */}
          {/* ========================================================= */}
          <div className="lg:col-span-5 space-y-6">
            {/* Header / Brand & Title */}
            <div>
              <div className="flex items-center justify-between mb-2">
                <span className="text-xs font-bold text-gray-500 uppercase tracking-widest">
                  {details.brand || 'Official Merchandise'}
                </span>
                {details.sku && (
                  <span className="text-[11px] font-mono text-gray-400">
                    SKU: {details.sku}
                  </span>
                )}
              </div>

              <h1 className="text-2xl sm:text-3xl font-extrabold text-gray-900 tracking-tight leading-tight">
                {details.title}
              </h1>

              {/* Rating & Review Counter Bar */}
              <div className="flex items-center gap-3 mt-3">
                <div className="flex items-center gap-1.5 bg-amber-50 border border-amber-200/80 px-2.5 py-1 rounded-lg">
                  <span className="text-xs font-bold text-amber-900">
                    {details.rating > 0 ? details.rating.toFixed(1) : '4.8'}
                  </span>
                  <div className="flex items-center text-amber-400">
                    <Star size={13} className="fill-amber-400" />
                  </div>
                </div>
                <span className="text-xs text-gray-500 font-medium hover:text-gray-800 cursor-pointer transition-colors">
                  • 128 Customer Ratings & Reviews
                </span>
              </div>
            </div>

            {/* Pricing Presentation */}
            <div className="p-4 rounded-2xl bg-gray-50/70 border border-gray-200/80 space-y-2">
              <div className="flex items-baseline gap-3 flex-wrap">
                <span className="text-3xl font-black text-gray-900 tracking-tight">
                  ₹{displayPrice.toLocaleString('en-IN')}
                </span>
                {hasDiscount && (
                  <>
                    <span className="text-base font-semibold text-gray-400 line-through">
                      ₹{details.price.toLocaleString('en-IN')}
                    </span>
                    <span className="text-xs font-extrabold text-emerald-700 bg-emerald-100 px-2.5 py-1 rounded-md uppercase tracking-wider">
                      {discountPercent}% OFF
                    </span>
                  </>
                )}
              </div>

              {hasDiscount && (
                <p className="text-xs font-semibold text-emerald-700 flex items-center gap-1">
                  <Check size={14} /> You save ₹{savingsAmount.toLocaleString('en-IN')} on this order
                </p>
              )}

              <p className="text-[11px] text-gray-500 leading-none pt-0.5">
                Inclusive of all taxes. Free shipping on prepaid orders over ₹999.
              </p>

              {/* Promo code badge */}
              <div className="mt-3 pt-3 border-t border-gray-200/80 flex items-center gap-2 text-xs text-gray-800">
                <span className="w-5 h-5 rounded-md bg-amber-100 text-amber-800 flex items-center justify-center flex-shrink-0 font-bold text-[10px]">
                  %
                </span>
                <span>
                  Use coupon <strong className="font-bold text-gray-900">EXTRA10</strong> for extra
                  10% off at checkout.
                </span>
              </div>
            </div>

            {/* Color Swatch Options (if available) */}
            {details.colors && details.colors.length > 0 && (
              <div className="space-y-2.5 pt-1">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold text-gray-900 uppercase tracking-wider">
                    Select Color
                  </span>
                  <span className="text-xs font-semibold text-gray-600 capitalize">
                    {selectedColor || details.colors[0]}
                  </span>
                </div>
                <div className="flex items-center gap-2.5 flex-wrap">
                  {details.colors.map((color) => {
                    const isSelected = selectedColor === color;
                    return (
                      <button
                        key={color}
                        type="button"
                        onClick={() => setSelectedColor(color)}
                        title={color}
                        className={`group relative px-3.5 py-1.5 rounded-xl border text-xs font-semibold capitalize transition-all duration-150 flex items-center gap-2 ${
                          isSelected
                            ? 'border-gray-900 bg-gray-900 text-white shadow-xs'
                            : 'border-gray-200 bg-white text-gray-700 hover:border-gray-400 hover:bg-gray-50'
                        }`}
                      >
                        <span
                          className="w-3 h-3 rounded-full border border-gray-300 inline-block"
                          style={{
                            backgroundColor:
                              color.toLowerCase() === 'black'
                                ? '#1a1a1a'
                                : color.toLowerCase() === 'white'
                                  ? '#ffffff'
                                  : color.toLowerCase() === 'blue' || color.toLowerCase() === 'navy'
                                    ? '#1e3a8a'
                                    : color.toLowerCase() === 'red'
                                      ? '#b91c1c'
                                      : color.toLowerCase() === 'green' ||
                                          color.toLowerCase() === 'olive'
                                        ? '#3f6212'
                                        : color.toLowerCase() === 'orange'
                                          ? '#ea580c'
                                          : '#d1d5db',
                          }}
                        />
                        <span>{color}</span>
                      </button>
                    );
                  })}
                </div>
              </div>
            )}

            {/* Size Selector with Size Guide */}
            {details.sizes && details.sizes.length > 0 && (
              <div ref={sizeSelectorRef} className="space-y-3 pt-1">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold text-gray-900 uppercase tracking-wider">
                    Select Size
                  </span>
                  <button
                    type="button"
                    onClick={() => setIsSizeGuideOpen(true)}
                    className="flex items-center gap-1 text-xs font-bold text-blue-600 hover:text-blue-800 underline underline-offset-4 transition-colors"
                  >
                    <Ruler size={13} />
                    <span>SIZE GUIDE</span>
                  </button>
                </div>

                <div className="flex flex-wrap gap-2.5">
                  {details.sizes.map((size) => {
                    const isSelected = selectedSize === size;
                    return (
                      <button
                        key={size}
                        type="button"
                        disabled={outOfStock}
                        onClick={() => !outOfStock && setSelectedSize(size)}
                        className={`relative min-w-[50px] h-12 px-3 rounded-xl border text-xs font-bold transition-all duration-150 flex items-center justify-center ${
                          outOfStock
                            ? 'border-gray-200 bg-gray-50 text-gray-300 line-through cursor-not-allowed'
                            : isSelected
                              ? 'border-gray-900 bg-gray-900 text-white shadow-md scale-102'
                              : 'border-gray-300 bg-white text-gray-800 hover:border-gray-900 hover:text-black shadow-2xs'
                        }`}
                      >
                        {size}
                      </button>
                    );
                  })}
                </div>

                <p className="text-[11px] text-gray-500 flex items-center gap-1 pt-0.5">
                  <Sparkles size={12} className="text-amber-500" />
                  <span>Model is 6&apos;1&quot; and is wearing size <strong>L</strong>. Standard regular fit.</span>
                </p>
              </div>
            )}

            {/* Quantity Stepper & Stock Warning */}
            <div className="flex items-center gap-6 pt-1">
              <div className="space-y-1.5">
                <span className="block text-xs font-bold text-gray-900 uppercase tracking-wider">
                  Quantity
                </span>
                <div className="flex items-center border border-gray-300 rounded-xl overflow-hidden bg-white shadow-2xs">
                  <button
                    type="button"
                    onClick={() => setQuantity((q) => Math.max(1, q - 1))}
                    disabled={quantity <= 1 || outOfStock}
                    className="w-10 h-10 flex items-center justify-center text-gray-700 hover:bg-gray-100 disabled:opacity-30 disabled:cursor-not-allowed transition-colors text-base font-semibold"
                  >
                    −
                  </button>
                  <span className="w-10 text-center text-xs font-bold text-gray-900 font-mono">
                    {String(quantity).padStart(2, '0')}
                  </span>
                  <button
                    type="button"
                    onClick={() => setQuantity((q) => Math.min(details.stock || 10, q + 1))}
                    disabled={outOfStock || quantity >= details.stock}
                    className="w-10 h-10 flex items-center justify-center text-gray-700 hover:bg-gray-100 disabled:opacity-30 disabled:cursor-not-allowed transition-colors text-base font-semibold"
                  >
                    +
                  </button>
                </div>
              </div>

              {/* Urgency tag */}
              {isLowStock && (
                <div className="pt-5 text-xs text-amber-800 font-semibold flex items-center gap-1.5">
                  <Clock size={15} className="text-amber-600 animate-bounce" />
                  <span>Hurry! Only {details.stock} units left in warehouse</span>
                </div>
              )}
            </div>

            {/* Primary Action Buttons */}
            <div className="space-y-3 pt-2">
              <div className="flex items-center gap-3">
                {details?.id && (
                  <div className="flex-1">
                    <AddToCart
                      productId={details.id}
                      className="py-3.5 px-6 rounded-xl font-bold text-xs tracking-wider uppercase shadow-md hover:shadow-lg transition-all"
                    />
                  </div>
                )}
                {details?.id && (
                  <WishLisht
                    productId={details.id}
                    className="h-12 px-5 rounded-xl border border-gray-300 hover:border-gray-900 text-gray-800 hover:text-red-500 flex items-center justify-center transition-all bg-white shadow-2xs font-bold text-xs"
                    showText
                  />
                )}
              </div>
            </div>

            {/* Trust Badges 4-Grid */}
            <div className="grid grid-cols-2 gap-3 pt-2">
              <div className="flex items-center gap-2.5 p-3 rounded-xl bg-gray-50 border border-gray-100">
                <div className="w-8 h-8 rounded-lg bg-white border border-gray-200 flex items-center justify-center text-gray-900 flex-shrink-0">
                  <Truck size={16} />
                </div>
                <div>
                  <h4 className="text-xs font-bold text-gray-900 leading-tight">Free Shipping</h4>
                  <p className="text-[10px] text-gray-500 mt-0.5">On orders over ₹999</p>
                </div>
              </div>

              <div className="flex items-center gap-2.5 p-3 rounded-xl bg-gray-50 border border-gray-100">
                <div className="w-8 h-8 rounded-lg bg-white border border-gray-200 flex items-center justify-center text-gray-900 flex-shrink-0">
                  <RotateCcw size={16} />
                </div>
                <div>
                  <h4 className="text-xs font-bold text-gray-900 leading-tight">30-Day Returns</h4>
                  <p className="text-[10px] text-gray-500 mt-0.5">Doorstep easy pickup</p>
                </div>
              </div>

              <div className="flex items-center gap-2.5 p-3 rounded-xl bg-gray-50 border border-gray-100">
                <div className="w-8 h-8 rounded-lg bg-white border border-gray-200 flex items-center justify-center text-gray-900 flex-shrink-0">
                  <ShieldCheck size={16} />
                </div>
                <div>
                  <h4 className="text-xs font-bold text-gray-900 leading-tight">100% Genuine</h4>
                  <p className="text-[10px] text-gray-500 mt-0.5">Verified authentic quality</p>
                </div>
              </div>

              <div className="flex items-center gap-2.5 p-3 rounded-xl bg-gray-50 border border-gray-100">
                <div className="w-8 h-8 rounded-lg bg-white border border-gray-200 flex items-center justify-center text-gray-900 flex-shrink-0">
                  <CreditCard size={16} />
                </div>
                <div>
                  <h4 className="text-xs font-bold text-gray-900 leading-tight">Secure Payment</h4>
                  <p className="text-[10px] text-gray-500 mt-0.5">UPI, Cards & COD</p>
                </div>
              </div>
            </div>

            {/* Social Share & Link Copy */}
            <div className="flex items-center justify-between pt-2 border-t border-gray-100">
              <span className="text-xs font-bold text-gray-600 uppercase tracking-wider flex items-center gap-1.5">
                <Share2 size={13} />
                <span>Share Style</span>
              </span>

              <div className="flex items-center gap-2">
                {sharePlatforms.map((platform) => (
                  <button
                    key={platform.name}
                    type="button"
                    onClick={() => platform.action(details.title)}
                    title={`Share on ${platform.name}`}
                    className={`w-8 h-8 rounded-lg border border-gray-200 flex items-center justify-center text-gray-600 ${platform.color} transition-colors`}
                  >
                    {platform.icon}
                  </button>
                ))}

                <button
                  type="button"
                  onClick={handleCopyLink}
                  title="Copy Page Link"
                  className="px-2.5 py-1.5 rounded-lg border border-gray-200 hover:bg-gray-100 text-gray-700 flex items-center gap-1 text-xs font-semibold transition-colors"
                >
                  {copiedLink ? (
                    <>
                      <Check size={13} className="text-emerald-600" />
                      <span className="text-emerald-600 text-[11px]">Copied!</span>
                    </>
                  ) : (
                    <>
                      <Copy size={13} />
                      <span className="text-[11px]">Copy Link</span>
                    </>
                  )}
                </button>
              </div>
            </div>

            {/* Delivery Details Module */}
            <div className="pt-2">
              <DeliveryDetails />
            </div>

            {/* Product Specifications & Reviews Accordion */}
            <div className="pt-2">
              <ProductAccordion product={details} />
            </div>
          </div>
        </div>

        {/* Curated Recommendations Carousel */}
        <div className="mt-16">
          <OtherBought
            currentProductId={details.id}
            category={category}
            collection={collection}
          />
        </div>
      </div>

      {/* Sticky Bottom CTA on Mobile Viewports */}
      {details?.id && (
        <StickyMobileCTA
          productId={details.id}
          title={details.title}
          price={details.price}
          discountPrice={details.discountPrice}
          thumbnail={activeSrc}
          selectedSize={selectedSize}
          onSelectSizeClick={scrollToSizes}
        />
      )}

      {/* Lightbox Fullscreen Modal */}
      <ImageLightbox
        isOpen={isLightboxOpen}
        onClose={() => setIsLightboxOpen(false)}
        images={gallery}
        initialIndex={activeImage}
        title={details.title}
      />

      {/* Size Guide Modal */}
      <SizeGuideModal
        isOpen={isSizeGuideOpen}
        onClose={() => setIsSizeGuideOpen(false)}
        category={category}
      />
    </div>
  );
}