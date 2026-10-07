'use client';

import React, { useEffect, useState } from 'react';
import { X, ChevronLeft, ChevronRight, ZoomIn, ZoomOut, RotateCw } from 'lucide-react';

interface ImageLightboxProps {
  isOpen: boolean;
  onClose: () => void;
  images: string[];
  initialIndex?: number;
  title?: string;
}

export default function ImageLightbox({
  isOpen,
  onClose,
  images,
  initialIndex = 0,
  title = 'Product Image',
}: ImageLightboxProps) {
  const [currentIndex, setCurrentIndex] = useState(initialIndex);
  const [zoomLevel, setZoomLevel] = useState(1);
  const [rotation, setRotation] = useState(0);

  useEffect(() => {
    if (isOpen) {
      setCurrentIndex(initialIndex);
      setZoomLevel(1);
      setRotation(0);
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen, initialIndex]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (!isOpen) return;
      if (e.key === 'Escape') onClose();
      if (e.key === 'ArrowLeft') handlePrev();
      if (e.key === 'ArrowRight') handleNext();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, currentIndex, images.length]);

  if (!isOpen || images.length === 0) return null;

  const handlePrev = () => {
    setCurrentIndex((prev) => (prev === 0 ? images.length - 1 : prev - 1));
    setZoomLevel(1);
  };

  const handleNext = () => {
    setCurrentIndex((prev) => (prev === images.length - 1 ? 0 : prev + 1));
    setZoomLevel(1);
  };

  const handleZoomIn = () => setZoomLevel((z) => Math.min(2.5, z + 0.5));
  const handleZoomOut = () => setZoomLevel((z) => Math.max(1, z - 0.5));
  const handleRotate = () => setRotation((r) => (r + 90) % 360);

  const currentSrc = images[currentIndex] || '';

  return (
    <div
      className="fixed inset-0 z-50 flex flex-col justify-between bg-black/95 text-white animate-in fade-in duration-200 select-none backdrop-blur-md"
      onClick={onClose}
    >
      {/* Top Bar */}
      <div
        className="flex items-center justify-between px-6 py-4 bg-gradient-to-b from-black/80 to-transparent z-10"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-center gap-3">
          <span className="text-xs font-semibold bg-white/15 px-3 py-1 rounded-full text-white/90">
            {currentIndex + 1} / {images.length}
          </span>
          <p className="text-sm font-medium text-gray-200 truncate max-w-xs md:max-w-md">
            {title}
          </p>
        </div>

        {/* Action Controls */}
        <div className="flex items-center gap-2">
          <button
            onClick={handleZoomIn}
            title="Zoom In"
            className="p-2 rounded-full bg-white/10 hover:bg-white/20 text-white transition-colors"
          >
            <ZoomIn size={18} />
          </button>
          <button
            onClick={handleZoomOut}
            title="Zoom Out"
            className="p-2 rounded-full bg-white/10 hover:bg-white/20 text-white transition-colors"
          >
            <ZoomOut size={18} />
          </button>
          <button
            onClick={handleRotate}
            title="Rotate"
            className="p-2 rounded-full bg-white/10 hover:bg-white/20 text-white transition-colors"
          >
            <RotateCw size={18} />
          </button>
          <div className="h-5 w-px bg-white/20 mx-1" />
          <button
            onClick={onClose}
            title="Close (Esc)"
            className="p-2 rounded-full bg-white/15 hover:bg-white/30 text-white transition-colors"
          >
            <X size={20} />
          </button>
        </div>
      </div>

      {/* Main Image View */}
      <div
        className="relative flex-1 flex items-center justify-center p-4 overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Prev Arrow */}
        {images.length > 1 && (
          <button
            onClick={handlePrev}
            className="absolute left-6 top-1/2 -translate-y-1/2 z-20 w-12 h-12 rounded-full bg-white/10 hover:bg-white/25 border border-white/20 flex items-center justify-center text-white backdrop-blur-md transition-all hover:scale-105 active:scale-95"
            aria-label="Previous image"
          >
            <ChevronLeft size={24} />
          </button>
        )}

        {/* Center Image */}
        <div className="relative max-w-full max-h-[80vh] flex items-center justify-center">
          <img
            src={currentSrc}
            alt={`${title} - view ${currentIndex + 1}`}
            style={{
              transform: `scale(${zoomLevel}) rotate(${rotation}deg)`,
              transition: 'transform 0.25s cubic-bezier(0.2, 0, 0, 1)',
            }}
            className="max-w-full max-h-[78vh] object-contain rounded-lg shadow-2xl cursor-grab active:cursor-grabbing"
          />
        </div>

        {/* Next Arrow */}
        {images.length > 1 && (
          <button
            onClick={handleNext}
            className="absolute right-6 top-1/2 -translate-y-1/2 z-20 w-12 h-12 rounded-full bg-white/10 hover:bg-white/25 border border-white/20 flex items-center justify-center text-white backdrop-blur-md transition-all hover:scale-105 active:scale-95"
            aria-label="Next image"
          >
            <ChevronRight size={24} />
          </button>
        )}
      </div>

      {/* Bottom Thumbnail Filmstrip */}
      {images.length > 1 && (
        <div
          className="py-4 px-6 bg-gradient-to-t from-black/80 to-transparent flex justify-center z-10"
          onClick={(e) => e.stopPropagation()}
        >
          <div className="flex gap-2.5 overflow-x-auto max-w-xl py-1 px-2 scrollbar-none">
            {images.map((img, idx) => (
              <button
                key={idx}
                onClick={() => {
                  setCurrentIndex(idx);
                  setZoomLevel(1);
                }}
                className={`relative w-14 h-18 rounded-lg overflow-hidden border-2 transition-all flex-shrink-0 ${
                  currentIndex === idx
                    ? 'border-white ring-2 ring-white/50 scale-105 opacity-100'
                    : 'border-white/20 opacity-50 hover:opacity-80'
                }`}
              >
                <img src={img} alt={`Thumb ${idx + 1}`} className="w-full h-full object-cover" />
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
