'use client';

import React, { useState } from 'react';
import {
  ChevronDown,
  Sparkles,
  Shirt,
  Layers,
  Truck,
  RotateCcw,
  Star,
  ThumbsUp,
  MessageSquare,
  CheckCircle2,
  ShieldAlert,
} from 'lucide-react';
import { Product } from '@/app/types/product/productype';
import WriteReviewModal from './WriteReviewModal';

interface ProductAccordionProps {
  product?: Partial<Product>;
}

interface UserReview {
  id: string;
  name: string;
  rating: number;
  date: string;
  title: string;
  comment: string;
  verified: boolean;
  helpfulCount: number;
}

const initialReviews: UserReview[] = [
  {
    id: '1',
    name: 'Rahul Sharma',
    rating: 5,
    date: '2 days ago',
    title: 'Outstanding quality and perfect fit!',
    comment:
      'The fabric feels super premium and breathable. Stitching is immaculate and the color is exactly as shown in the pictures. Highly recommended!',
    verified: true,
    helpfulCount: 14,
  },
  {
    id: '2',
    name: 'Pooja Verma',
    rating: 5,
    date: '1 week ago',
    title: 'Loved the modern silhouette',
    comment:
      'Got so many compliments when I wore this! The material is durable and does not shrink after washing. Will definitely buy more colors.',
    verified: true,
    helpfulCount: 9,
  },
  {
    id: '3',
    name: 'Vikram Mehta',
    rating: 4,
    date: '2 weeks ago',
    title: 'Great value for money',
    comment:
      'Really comfortable for all-day wear. The size chart was accurate. Fast delivery as well.',
    verified: true,
    helpfulCount: 6,
  },
];

export default function ProductAccordion({ product }: ProductAccordionProps) {
  const [openIndex, setOpenIndex] = useState<number | null>(0);
  const [reviews, setReviews] = useState<UserReview[]>(initialReviews);
  const [isReviewModalOpen, setIsReviewModalOpen] = useState(false);
  const [helpfulVoted, setHelpfulVoted] = useState<Record<string, boolean>>({});

  const toggle = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  const handleHelpful = (id: string) => {
    if (helpfulVoted[id]) return;
    setHelpfulVoted((prev) => ({ ...prev, [id]: true }));
    setReviews((prev) =>
      prev.map((r) => (r.id === id ? { ...r, helpfulCount: r.helpfulCount + 1 } : r))
    );
  };

  const handleAddReview = (newReview: {
    name: string;
    rating: number;
    title: string;
    comment: string;
    date: string;
  }) => {
    const created: UserReview = {
      id: String(Date.now()),
      name: newReview.name,
      rating: newReview.rating,
      date: newReview.date,
      title: newReview.title,
      comment: newReview.comment,
      verified: true,
      helpfulCount: 0,
    };
    setReviews([created, ...reviews]);
  };

  const avgRating = product?.rating || 4.8;
  const ratingDistribution = [
    { stars: 5, pct: 75, count: 18 },
    { stars: 4, pct: 18, count: 4 },
    { stars: 3, pct: 5, count: 1 },
    { stars: 2, pct: 2, count: 0 },
    { stars: 1, pct: 0, count: 0 },
  ];

  const sections = [
    {
      id: 'details',
      title: 'Product Highlights & Description',
      icon: <Sparkles size={16} className="text-amber-500" />,
      content: (
        <div className="space-y-4 text-xs text-gray-600 leading-relaxed">
          <p className="text-gray-700">
            {product?.description ||
              'Crafted from high-grade combed fabric with precision stitching, designed for supreme all-day comfort and long-lasting durability.'}
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
            <div className="bg-gray-50 p-3 rounded-xl border border-gray-100 space-y-1">
              <span className="font-bold text-gray-900 block">✨ Fabric & Composition</span>
              <p className="text-gray-600">85% Combed Cotton, 15% Linen Blend</p>
            </div>
            <div className="bg-gray-50 p-3 rounded-xl border border-gray-100 space-y-1">
              <span className="font-bold text-gray-900 block">👔 Fit & Cut</span>
              <p className="text-gray-600">Tailored Relaxed Fit with comfort drape</p>
            </div>
            <div className="bg-gray-50 p-3 rounded-xl border border-gray-100 space-y-1">
              <span className="font-bold text-gray-900 block">🧼 Wash & Care</span>
              <p className="text-gray-600">Machine wash cold with like colors, tumble dry low</p>
            </div>
            <div className="bg-gray-50 p-3 rounded-xl border border-gray-100 space-y-1">
              <span className="font-bold text-gray-900 block">🇮🇳 Origin</span>
              <p className="text-gray-600">Proudly designed and manufactured in India</p>
            </div>
          </div>
        </div>
      ),
    },
    {
      id: 'specifications',
      title: 'Specifications & Info',
      icon: <Layers size={16} className="text-blue-500" />,
      content: (
        <div className="overflow-hidden rounded-xl border border-gray-200">
          <div className="divide-y divide-gray-100 text-xs">
            <div className="grid grid-cols-2 p-3 bg-white">
              <span className="text-gray-500 font-medium">Brand</span>
              <span className="text-gray-900 font-semibold">{product?.brand || 'Premium Brand'}</span>
            </div>
            <div className="grid grid-cols-2 p-3 bg-gray-50/50">
              <span className="text-gray-500 font-medium">SKU</span>
              <span className="text-gray-900 font-mono font-medium">{product?.sku || 'SKU-09823'}</span>
            </div>
            <div className="grid grid-cols-2 p-3 bg-white">
              <span className="text-gray-500 font-medium">Available Sizes</span>
              <span className="text-gray-900 font-semibold">
                {product?.sizes?.join(', ') || 'S, M, L, XL, XXL'}
              </span>
            </div>
            <div className="grid grid-cols-2 p-3 bg-gray-50/50">
              <span className="text-gray-500 font-medium">Color Variants</span>
              <span className="text-gray-900 font-semibold capitalize">
                {product?.colors?.join(', ') || 'Standard Colorway'}
              </span>
            </div>
            <div className="grid grid-cols-2 p-3 bg-white">
              <span className="text-gray-500 font-medium">Weave & Pattern</span>
              <span className="text-gray-900 font-semibold">Fine Knit / Solid</span>
            </div>
            <div className="grid grid-cols-2 p-3 bg-gray-50/50">
              <span className="text-gray-500 font-medium">Country of Origin</span>
              <span className="text-gray-900 font-semibold">India</span>
            </div>
          </div>
        </div>
      ),
    },
    {
      id: 'shipping',
      title: 'Shipping, Returns & Guarantee',
      icon: <Truck size={16} className="text-emerald-500" />,
      content: (
        <div className="space-y-3.5 text-xs text-gray-600">
          <div className="flex gap-3 items-start">
            <div className="p-2 rounded-lg bg-emerald-50 text-emerald-700 flex-shrink-0">
              <Truck size={16} />
            </div>
            <div>
              <h4 className="font-bold text-gray-900">Standard & Express Shipping</h4>
              <p className="text-gray-600 mt-0.5">
                Orders are processed and dispatched within 24 hours. Standard delivery takes 3–5 business days. Free shipping on orders over ₹999.
              </p>
            </div>
          </div>

          <div className="flex gap-3 items-start">
            <div className="p-2 rounded-lg bg-blue-50 text-blue-700 flex-shrink-0">
              <RotateCcw size={16} />
            </div>
            <div>
              <h4 className="font-bold text-gray-900">30-Day Hassle-Free Returns</h4>
              <p className="text-gray-600 mt-0.5">
                If the size or fit isn&apos;t ideal, schedule an instant doorstep pickup for free exchange or full refund to your original payment method.
              </p>
            </div>
          </div>
        </div>
      ),
    },
    {
      id: 'reviews',
      title: `Ratings & Verified Reviews (${reviews.length})`,
      icon: <Star size={16} className="text-amber-500 fill-amber-500" />,
      content: (
        <div className="space-y-6 pt-1">
          {/* Rating Summary Card */}
          <div className="p-4 bg-gray-50/80 rounded-2xl border border-gray-200/80 flex flex-col sm:flex-row gap-6 items-center">
            {/* Overall Score */}
            <div className="text-center sm:border-r sm:border-gray-200 sm:pr-6 sm:min-w-[140px]">
              <span className="text-4xl font-extrabold text-gray-900">{avgRating.toFixed(1)}</span>
              <div className="flex items-center justify-center gap-1 my-1">
                {[1, 2, 3, 4, 5].map((s) => (
                  <Star
                    key={s}
                    size={15}
                    className={
                      s <= Math.round(avgRating)
                        ? 'fill-amber-400 text-amber-400'
                        : 'text-gray-300'
                    }
                  />
                ))}
              </div>
              <p className="text-[11px] text-gray-500 font-medium">
                Based on {reviews.length + 20} ratings
              </p>
            </div>

            {/* Distribution Bars */}
            <div className="flex-1 w-full space-y-1.5">
              {ratingDistribution.map((r) => (
                <div key={r.stars} className="flex items-center gap-2 text-xs">
                  <span className="w-6 text-gray-600 font-medium flex items-center gap-0.5">
                    {r.stars} <Star size={10} className="fill-gray-400 text-gray-400" />
                  </span>
                  <div className="flex-1 h-2 bg-gray-200 rounded-full overflow-hidden">
                    <div
                      className="h-full bg-amber-400 rounded-full transition-all duration-500"
                      style={{ width: `${r.pct}%` }}
                    />
                  </div>
                  <span className="w-8 text-right text-gray-400 text-[11px] font-mono">
                    {r.pct}%
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Write Review CTA Button */}
          <div className="flex items-center justify-between pt-1">
            <span className="text-xs font-bold text-gray-900 uppercase tracking-wider">
              Customer Experiences
            </span>
            <button
              type="button"
              onClick={() => setIsReviewModalOpen(true)}
              className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg bg-gray-900 hover:bg-black text-white text-xs font-semibold shadow-xs transition-all hover:scale-102"
            >
              <MessageSquare size={13} />
              Write a Review
            </button>
          </div>

          {/* Reviews List */}
          <div className="space-y-3 divide-y divide-gray-100">
            {reviews.map((rev) => (
              <div key={rev.id} className="pt-3.5 first:pt-0 space-y-2">
                <div className="flex items-start justify-between">
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="text-xs font-bold text-gray-900">{rev.name}</span>
                      {rev.verified && (
                        <span className="inline-flex items-center gap-0.5 text-[10px] font-semibold text-emerald-700 bg-emerald-50 px-1.5 py-0.5 rounded-md border border-emerald-200">
                          <CheckCircle2 size={11} /> Verified Buyer
                        </span>
                      )}
                    </div>
                    <div className="flex items-center gap-1.5 mt-0.5">
                      <div className="flex items-center gap-0.5">
                        {[1, 2, 3, 4, 5].map((s) => (
                          <Star
                            key={s}
                            size={11}
                            className={
                              s <= rev.rating ? 'fill-amber-400 text-amber-400' : 'text-gray-200'
                            }
                          />
                        ))}
                      </div>
                      <span className="text-[10px] text-gray-400 font-medium">• {rev.date}</span>
                    </div>
                  </div>
                </div>

                <h5 className="text-xs font-semibold text-gray-900">{rev.title}</h5>
                <p className="text-xs text-gray-600 leading-relaxed">{rev.comment}</p>

                <div className="flex items-center gap-2 pt-1">
                  <button
                    type="button"
                    onClick={() => handleHelpful(rev.id)}
                    className={`flex items-center gap-1 text-[11px] font-medium px-2 py-1 rounded-md transition-colors ${
                      helpfulVoted[rev.id]
                        ? 'bg-gray-100 text-gray-900 font-semibold'
                        : 'text-gray-500 hover:text-gray-900 hover:bg-gray-50'
                    }`}
                  >
                    <ThumbsUp size={12} />
                    <span>Helpful ({rev.helpfulCount})</span>
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      ),
    },
  ];

  return (
    <div className="w-full space-y-3 pt-2">
      {sections.map((section, idx) => {
        const isOpen = openIndex === idx;
        return (
          <div
            key={section.id}
            className="border border-gray-200/90 rounded-2xl bg-white overflow-hidden shadow-2xs transition-all"
          >
            {/* Accordion Header */}
            <button
              type="button"
              onClick={() => toggle(idx)}
              className="w-full flex items-center justify-between p-4.5 text-left hover:bg-gray-50/80 transition-colors"
            >
              <div className="flex items-center gap-2.5">
                <div className="w-7 h-7 rounded-lg bg-gray-50 border border-gray-100 flex items-center justify-center flex-shrink-0">
                  {section.icon}
                </div>
                <span className="text-xs font-bold text-gray-900 uppercase tracking-wide">
                  {section.title}
                </span>
              </div>
              <ChevronDown
                size={17}
                className={`text-gray-500 transition-transform duration-250 ease-out ${
                  isOpen ? 'rotate-180 text-gray-900' : 'rotate-0'
                }`}
              />
            </button>

            {/* Accordion Body */}
            {isOpen && (
              <div className="px-5 pb-5 pt-1 border-t border-gray-100 animate-in fade-in duration-200">
                {section.content}
              </div>
            )}
          </div>
        );
      })}

      {/* Review Modal */}
      <WriteReviewModal
        isOpen={isReviewModalOpen}
        onClose={() => setIsReviewModalOpen(false)}
        productTitle={product?.title || 'Product'}
        onSubmitSuccess={handleAddReview}
      />
    </div>
  );
}
