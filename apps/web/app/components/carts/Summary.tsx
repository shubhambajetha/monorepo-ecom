import React from 'react';
import { ChevronRight } from 'lucide-react';

const Summary = () => {
  return (
    <div className="w-full px-4 py-4 sm:px-6 sm:py-6">
      <h2 className="mb-6 text-2xl font-semibold text-gray-900">Summary</h2>

      <div className="space-y-4 rounded-3xl border border-gray-200 bg-white p-5 shadow-sm">
        <div className="flex items-center justify-between">
          <span className="text-base text-gray-600">Bag Total</span>
          <span className="text-base font-medium text-gray-900">₹ 30,685</span>
        </div>

        <div className="flex items-center justify-between">
          <span className="text-base text-gray-600">Sub Total</span>
          <span className="text-base font-medium text-gray-900">₹ 30,685</span>
        </div>

        <div className="flex items-center justify-between">
          <span className="text-base text-gray-600">Shipping Charges</span>
          <span className="text-base font-semibold text-green-600">Free</span>
        </div>

        <div className="flex items-center justify-between pt-3 border-t border-gray-200">
          <span className="text-lg font-semibold text-gray-900">You Pay</span>
          <span className="text-lg font-semibold text-gray-900">₹ 30,685</span>
        </div>
      </div>

      <div className="mt-6 rounded-3xl border border-gray-200 bg-white p-5 shadow-sm">
        <button
          type="button"
          className="flex w-full items-center justify-between rounded-full bg-black px-5 py-4 text-base font-semibold text-white transition hover:bg-gray-800"
        >
          <span>Proceed to Buy</span>
          <ChevronRight size={18} />
        </button>

        <div className="mt-5 flex items-center justify-between rounded-3xl border border-gray-200 bg-gray-50 px-4 py-4">
          <div>
            <p className="text-sm font-semibold text-gray-900">Have a promo code?</p>
            <p className="text-sm text-gray-500">Apply now to get instant savings</p>
          </div>
          <ChevronRight size={18} className="text-gray-500" />
        </div>
      </div>
    </div>
  );
};

export default Summary;
