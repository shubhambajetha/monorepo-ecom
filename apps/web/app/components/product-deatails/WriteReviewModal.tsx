'use client';

import React, { useState } from 'react';
import { X, Star, CheckCircle, Sparkles } from 'lucide-react';
import Swal from 'sweetalert2';

interface WriteReviewModalProps {
  isOpen: boolean;
  onClose: () => void;
  productTitle: string;
  onSubmitSuccess?: (review: {
    name: string;
    rating: number;
    title: string;
    comment: string;
    date: string;
  }) => void;
}

export default function WriteReviewModal({
  isOpen,
  onClose,
  productTitle,
  onSubmitSuccess,
}: WriteReviewModalProps) {
  const [rating, setRating] = useState(5);
  const [hoverRating, setHoverRating] = useState(0);
  const [name, setName] = useState('');
  const [title, setTitle] = useState('');
  const [comment, setComment] = useState('');
  const [recommended, setRecommended] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !comment.trim()) {
      Swal.fire({
        icon: 'warning',
        title: 'Missing Fields',
        text: 'Please provide your name and review details.',
        timer: 2000,
        showConfirmButton: false,
      });
      return;
    }

    setIsSubmitting(true);
    setTimeout(() => {
      setIsSubmitting(false);
      const newReview = {
        name: name.trim(),
        rating,
        title: title.trim() || 'Verified Buyer Review',
        comment: comment.trim(),
        date: 'Just now',
      };
      if (onSubmitSuccess) {
        onSubmitSuccess(newReview);
      }
      Swal.fire({
        icon: 'success',
        title: 'Thank you!',
        text: 'Your review has been submitted successfully.',
        timer: 2000,
        showConfirmButton: false,
      });
      onClose();
      // reset form
      setName('');
      setTitle('');
      setComment('');
      setRating(5);
    }, 600);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs transition-opacity animate-in fade-in duration-200">
      <div
        className="relative w-full max-w-lg bg-white rounded-2xl shadow-2xl border border-gray-100 overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-gray-100 bg-gray-50/70">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-amber-500 text-white flex items-center justify-center shadow-xs">
              <Sparkles size={16} />
            </div>
            <div>
              <h3 className="text-base font-bold text-gray-900 leading-none">Write a Review</h3>
              <p className="text-xs text-gray-500 mt-1 truncate max-w-xs">{productTitle}</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="w-8 h-8 rounded-full flex items-center justify-center text-gray-400 hover:text-gray-700 hover:bg-gray-100 transition-colors"
          >
            <X size={18} />
          </button>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="p-6 space-y-4 max-h-[80vh] overflow-y-auto">
          {/* Rating Selection */}
          <div className="text-center py-2 bg-amber-50/50 rounded-xl border border-amber-100/80">
            <label className="block text-xs font-semibold text-gray-700 uppercase tracking-wider mb-2">
              Overall Rating
            </label>
            <div className="flex items-center justify-center gap-1.5">
              {[1, 2, 3, 4, 5].map((star) => {
                const active = hoverRating ? star <= hoverRating : star <= rating;
                return (
                  <button
                    key={star}
                    type="button"
                    onMouseEnter={() => setHoverRating(star)}
                    onMouseLeave={() => setHoverRating(0)}
                    onClick={() => setRating(star)}
                    className="p-1 transition-transform hover:scale-115 focus:outline-hidden"
                  >
                    <Star
                      size={28}
                      className={
                        active
                          ? 'fill-amber-400 text-amber-400 drop-shadow-xs'
                          : 'text-gray-300'
                      }
                    />
                  </button>
                );
              })}
            </div>
            <span className="text-xs font-bold text-amber-900 mt-1.5 inline-block">
              {rating === 5 && 'Excellent - Highly recommended!'}
              {rating === 4 && 'Good - Satisfied with quality'}
              {rating === 3 && 'Average - Met expectations'}
              {rating === 2 && 'Below Average - Could be better'}
              {rating === 1 && 'Poor - Disappointed'}
            </span>
          </div>

          {/* Name & Title */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-semibold text-gray-700 mb-1">
                Your Name <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                required
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="e.g. Alex M."
                className="w-full text-xs px-3.5 py-2.5 rounded-lg border border-gray-300 focus:outline-hidden focus:border-gray-900 focus:ring-1 focus:ring-gray-900 transition-all"
              />
            </div>
            <div>
              <label className="block text-xs font-semibold text-gray-700 mb-1">
                Review Headline
              </label>
              <input
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="e.g. Perfect fit and great fabric"
                className="w-full text-xs px-3.5 py-2.5 rounded-lg border border-gray-300 focus:outline-hidden focus:border-gray-900 focus:ring-1 focus:ring-gray-900 transition-all"
              />
            </div>
          </div>

          {/* Detailed Comment */}
          <div>
            <label className="block text-xs font-semibold text-gray-700 mb-1">
              Detailed Feedback <span className="text-red-500">*</span>
            </label>
            <textarea
              required
              rows={4}
              value={comment}
              onChange={(e) => setComment(e.target.value)}
              placeholder="What did you love about the fabric, fit, comfort, or style?"
              className="w-full text-xs px-3.5 py-2.5 rounded-lg border border-gray-300 focus:outline-hidden focus:border-gray-900 focus:ring-1 focus:ring-gray-900 transition-all resize-none"
            />
          </div>

          {/* Recommend checkbox */}
          <div className="flex items-center gap-2 pt-1">
            <input
              type="checkbox"
              id="recommendProduct"
              checked={recommended}
              onChange={(e) => setRecommended(e.target.checked)}
              className="w-4 h-4 rounded text-gray-900 focus:ring-gray-900 border-gray-300 cursor-pointer"
            />
            <label
              htmlFor="recommendProduct"
              className="text-xs text-gray-700 font-medium cursor-pointer"
            >
              I would recommend this product to a friend
            </label>
          </div>

          {/* Buttons */}
          <div className="pt-3 flex items-center justify-end gap-2.5 border-t border-gray-100">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 text-xs font-semibold text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded-lg transition-colors"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={isSubmitting}
              className="px-6 py-2.5 bg-gray-900 hover:bg-black text-white text-xs font-semibold rounded-lg shadow-sm transition-all disabled:opacity-50"
            >
              {isSubmitting ? 'Submitting...' : 'Submit Review'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
