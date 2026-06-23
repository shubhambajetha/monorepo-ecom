import React, { useState } from 'react';

const DeliveryDetails = () => {
  const [pincode, setPincode] = useState('');
  const [pincodeChecked, setPincodeChecked] = useState(false);
  const [deliveryInfo, setDeliveryInfo] = useState<string | null>(null);

  const handlePincodeCheck = () => {
    if (pincode.length === 6) {
      setPincodeChecked(true);
      setDeliveryInfo('Estimated delivery in 3–5 business days');
    }
  };

  return (
    <div className="w-full">
      {/* Heading */}
      <h3 className="text-sm font-bold text-gray-900 mb-3">Delivery Details</h3>

      {/* Pincode Input */}
      <div className="flex items-center border border-gray-300 rounded-md px-4 py-3 mb-3 focus-within:border-gray-500 transition-colors">
        <input
          type="text"
          maxLength={6}
          value={pincode}
          onChange={(e) => {
            const val = e.target.value.replace(/\D/g, '');
            setPincode(val);
            setPincodeChecked(false);
            setDeliveryInfo(null);
          }}
          onKeyDown={(e) => e.key === 'Enter' && handlePincodeCheck()}
          placeholder="Enter Pincode"
          className="flex-1 text-sm text-gray-500 placeholder-gray-400 outline-none bg-transparent"
        />
        <button
          onClick={handlePincodeCheck}
          disabled={pincode.length !== 6}
          className={`text-sm font-bold tracking-wider transition-colors ml-2 ${
            pincode.length === 6
              ? 'text-teal-600 hover:text-teal-800'
              : 'text-gray-300 cursor-not-allowed'
          }`}
        >
          CHECK
        </button>
      </div>

      {/* Delivery result */}
      {pincodeChecked && deliveryInfo && (
        <div className="flex items-center gap-2 border border-gray-200 rounded-md px-4 py-3 mb-3 bg-green-50">
          <svg
            className="w-4 h-4 text-green-600 flex-shrink-0"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={2}
          >
            <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
          </svg>
          <span className="text-sm text-green-700 font-medium">{deliveryInfo}</span>
        </div>
      )}

      {/* Return Policy Box */}
      <div className="flex items-start gap-3 border border-gray-200 rounded-md px-4 py-3">
        {/* Circular arrows / return icon */}
        <svg
          className="w-8 h-8 text-gray-400 flex-shrink-0 mt-0.5"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth={1.5}
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
        </svg>
        <p className="text-sm text-gray-600 leading-relaxed">
          This product is eligible for return or exchange under our{' '}
          <span className="font-medium text-gray-800">30-day return or exchange policy.</span> No
          questions asked.
        </p>
      </div>
    </div>
  );
};

export default DeliveryDetails;
