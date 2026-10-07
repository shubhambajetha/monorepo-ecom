'use client';

import React, { useState } from 'react';
import { X, Ruler, Check } from 'lucide-react';

interface SizeGuideModalProps {
  isOpen: boolean;
  onClose: () => void;
  category?: string;
}

const sizeChartData = [
  { size: 'XS', chestCm: '86 - 91', chestIn: '34 - 36', lengthCm: '68', lengthIn: '26.8', shoulderCm: '42', shoulderIn: '16.5' },
  { size: 'S', chestCm: '91 - 96', chestIn: '36 - 38', lengthCm: '70', lengthIn: '27.5', shoulderCm: '44', shoulderIn: '17.3' },
  { size: 'M', chestCm: '96 - 101', chestIn: '38 - 40', lengthCm: '72', lengthIn: '28.3', shoulderCm: '46', shoulderIn: '18.1' },
  { size: 'L', chestCm: '101 - 106', chestIn: '40 - 42', lengthCm: '74', lengthIn: '29.1', shoulderCm: '48', shoulderIn: '18.9' },
  { size: 'XL', chestCm: '106 - 111', chestIn: '42 - 44', lengthCm: '76', lengthIn: '29.9', shoulderCm: '50', shoulderIn: '19.7' },
  { size: 'XXL', chestCm: '111 - 116', chestIn: '44 - 46', lengthCm: '78', lengthIn: '30.7', shoulderCm: '52', shoulderIn: '20.5' },
];

export default function SizeGuideModal({ isOpen, onClose }: SizeGuideModalProps) {
  const [unit, setUnit] = useState<'in' | 'cm'>('in');

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs transition-opacity animate-in fade-in duration-200">
      <div
        className="relative w-full max-w-2xl bg-white rounded-2xl shadow-2xl border border-gray-100 overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-gray-100 bg-gray-50/70">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-gray-900 text-white flex items-center justify-center">
              <Ruler size={16} />
            </div>
            <div>
              <h3 className="text-base font-bold text-gray-900 leading-none">Size & Fit Guide</h3>
              <p className="text-xs text-gray-500 mt-1">Standard body measurements guide</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="w-8 h-8 rounded-full flex items-center justify-center text-gray-400 hover:text-gray-700 hover:bg-gray-100 transition-colors"
            aria-label="Close modal"
          >
            <X size={18} />
          </button>
        </div>

        {/* Content */}
        <div className="p-6 space-y-6 max-h-[80vh] overflow-y-auto">
          {/* Unit Toggle */}
          <div className="flex items-center justify-between bg-gray-50 p-2 rounded-xl border border-gray-200/80">
            <span className="text-xs font-semibold text-gray-700 uppercase tracking-wide px-2">
              Select Measurement Unit
            </span>
            <div className="flex bg-white rounded-lg p-0.5 border border-gray-200 shadow-xs">
              <button
                type="button"
                onClick={() => setUnit('in')}
                className={`px-3 py-1 text-xs font-semibold rounded-md transition-all ${
                  unit === 'in'
                    ? 'bg-gray-900 text-white shadow-xs'
                    : 'text-gray-600 hover:text-gray-900'
                }`}
              >
                Inches (in)
              </button>
              <button
                type="button"
                onClick={() => setUnit('cm')}
                className={`px-3 py-1 text-xs font-semibold rounded-md transition-all ${
                  unit === 'cm'
                    ? 'bg-gray-900 text-white shadow-xs'
                    : 'text-gray-600 hover:text-gray-900'
                }`}
              >
                Centimeters (cm)
              </button>
            </div>
          </div>

          {/* Sizing Table */}
          <div className="overflow-x-auto rounded-xl border border-gray-200 shadow-xs">
            <table className="w-full text-left text-xs border-collapse">
              <thead>
                <tr className="bg-gray-900 text-white">
                  <th className="py-3 px-4 font-semibold uppercase tracking-wider">Size</th>
                  <th className="py-3 px-4 font-semibold uppercase tracking-wider">
                    Chest ({unit})
                  </th>
                  <th className="py-3 px-4 font-semibold uppercase tracking-wider">
                    Length ({unit})
                  </th>
                  <th className="py-3 px-4 font-semibold uppercase tracking-wider">
                    Shoulder ({unit})
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {sizeChartData.map((row, idx) => (
                  <tr
                    key={row.size}
                    className={`hover:bg-gray-50/80 transition-colors ${
                      idx % 2 === 0 ? 'bg-white' : 'bg-gray-50/30'
                    }`}
                  >
                    <td className="py-3 px-4 font-bold text-gray-900">{row.size}</td>
                    <td className="py-3 px-4 text-gray-600 font-medium">
                      {unit === 'in' ? row.chestIn : row.chestCm}
                    </td>
                    <td className="py-3 px-4 text-gray-600 font-medium">
                      {unit === 'in' ? row.lengthIn : row.lengthCm}
                    </td>
                    <td className="py-3 px-4 text-gray-600 font-medium">
                      {unit === 'in' ? row.shoulderIn : row.shoulderCm}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Measuring Tips */}
          <div className="bg-amber-50/70 border border-amber-200/70 rounded-xl p-4 space-y-2">
            <h4 className="text-xs font-bold text-amber-900 uppercase tracking-wide flex items-center gap-1.5">
              <Check size={14} className="text-amber-700" />
              How to Measure Yourself
            </h4>
            <ul className="text-xs text-amber-800/90 space-y-1.5 pl-5 list-disc leading-relaxed">
              <li>
                <span className="font-semibold text-amber-950">Chest:</span> Measure around the fullest part of your chest, keeping the measuring tape horizontal.
              </li>
              <li>
                <span className="font-semibold text-amber-950">Length:</span> Measure from the highest point of the shoulder straight down to the hemline.
              </li>
              <li>
                <span className="font-semibold text-amber-950">Fit advice:</span> If you are between two sizes, choose the larger size for a relaxed/oversized fit, or the smaller size for a slim fit.
              </li>
            </ul>
          </div>
        </div>

        {/* Footer */}
        <div className="px-6 py-3.5 bg-gray-50 border-t border-gray-100 flex justify-end">
          <button
            onClick={onClose}
            className="px-5 py-2 bg-gray-900 hover:bg-black text-white text-xs font-semibold rounded-lg shadow-xs transition-colors"
          >
            Got It
          </button>
        </div>
      </div>
    </div>
  );
}
