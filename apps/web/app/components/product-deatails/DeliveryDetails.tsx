'use client';

import React, { useState } from 'react';
import { Truck, RotateCcw, ShieldCheck, MapPin, CheckCircle2, AlertCircle } from 'lucide-react';

export default function DeliveryDetails() {
  const [pincode, setPincode] = useState('');
  const [pincodeChecked, setPincodeChecked] = useState(false);
  const [deliveryDate, setDeliveryDate] = useState<string | null>(null);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  const calculateDeliveryDate = () => {
    const today = new Date();
    // Add 3-5 days
    const deliveryMin = new Date(today);
    deliveryMin.setDate(today.getDate() + 3);
    const deliveryMax = new Date(today);
    deliveryMax.setDate(today.getDate() + 5);

    const options: Intl.DateTimeFormatOptions = { weekday: 'short', month: 'short', day: 'numeric' };
    return `${deliveryMin.toLocaleDateString('en-US', options)} - ${deliveryMax.toLocaleDateString('en-US', options)}`;
  };

  const handlePincodeCheck = (code?: string) => {
    const codeToCheck = code || pincode;
    if (codeToCheck.length === 6) {
      setErrorMsg(null);
      setPincodeChecked(true);
      setDeliveryDate(calculateDeliveryDate());
    } else {
      setErrorMsg('Please enter a valid 6-digit pincode');
    }
  };

  const quickPincodes = [
    { city: 'Mumbai', code: '400001' },
    { city: 'Delhi', code: '110001' },
    { city: 'Bengaluru', code: '560001' },
  ];

  return (
    <div className="w-full bg-gray-50/70 rounded-2xl p-4.5 border border-gray-200/80 space-y-4">
      {/* Heading */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Truck size={17} className="text-gray-900" />
          <h3 className="text-xs font-bold text-gray-900 uppercase tracking-wider">
            Delivery & Services
          </h3>
        </div>
        <span className="text-[11px] font-semibold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-full border border-emerald-200">
          Fast Dispatch
        </span>
      </div>

      {/* Pincode Input Box */}
      <div className="space-y-1.5">
        <div className="relative flex items-center bg-white border border-gray-300 rounded-xl overflow-hidden focus-within:border-gray-900 focus-within:ring-1 focus-within:ring-gray-900 transition-all shadow-xs">
          <div className="pl-3.5 text-gray-400">
            <MapPin size={16} />
          </div>
          <input
            type="text"
            maxLength={6}
            value={pincode}
            onChange={(e) => {
              const val = e.target.value.replace(/\D/g, '');
              setPincode(val);
              setErrorMsg(null);
              if (pincodeChecked) setPincodeChecked(false);
            }}
            onKeyDown={(e) => e.key === 'Enter' && handlePincodeCheck()}
            placeholder="Enter 6-digit pincode"
            className="w-full py-2.5 px-3 text-xs text-gray-900 placeholder-gray-400 outline-hidden bg-transparent font-medium"
          />
          <button
            type="button"
            onClick={() => handlePincodeCheck()}
            disabled={pincode.length !== 6}
            className={`px-4 py-2 text-xs font-bold tracking-wider transition-all mr-1 rounded-lg ${
              pincode.length === 6
                ? 'bg-gray-900 text-white hover:bg-black shadow-xs'
                : 'text-gray-300 cursor-not-allowed bg-transparent'
            }`}
          >
            CHECK
          </button>
        </div>

        {/* Quick select cities if not checked */}
        {!pincodeChecked && (
          <div className="flex items-center gap-1.5 text-[11px] text-gray-500 pt-0.5">
            <span className="text-gray-400">Popular:</span>
            {quickPincodes.map((p) => (
              <button
                key={p.code}
                type="button"
                onClick={() => {
                  setPincode(p.code);
                  handlePincodeCheck(p.code);
                }}
                className="underline hover:text-gray-900 transition-colors cursor-pointer"
              >
                {p.city}
              </button>
            ))}
          </div>
        )}

        {/* Error message */}
        {errorMsg && (
          <div className="flex items-center gap-1.5 text-xs text-red-600 pt-1">
            <AlertCircle size={14} />
            <span>{errorMsg}</span>
          </div>
        )}
      </div>

      {/* Verified Delivery Result */}
      {pincodeChecked && deliveryDate && (
        <div className="p-3.5 rounded-xl bg-emerald-50/80 border border-emerald-200 text-xs space-y-1.5 animate-in fade-in duration-200">
          <div className="flex items-center gap-2 text-emerald-900 font-semibold">
            <CheckCircle2 size={15} className="text-emerald-600 flex-shrink-0" />
            <span>Delivery available for {pincode}</span>
          </div>
          <p className="text-emerald-800 text-[11px] pl-6">
            Expected delivery by <strong className="font-bold text-emerald-950">{deliveryDate}</strong>.
          </p>
          <div className="flex flex-wrap items-center gap-3 pt-1 pl-6 text-[11px] text-emerald-800">
            <span className="flex items-center gap-1">✓ Cash on Delivery available</span>
            <span className="flex items-center gap-1">✓ Free doorstep exchange</span>
          </div>
        </div>
      )}

      {/* Key Features / Policy mini list */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 pt-1">
        <div className="flex items-start gap-2.5 p-2.5 rounded-xl bg-white border border-gray-200/70 shadow-2xs">
          <div className="p-1.5 rounded-lg bg-gray-100 text-gray-700 flex-shrink-0 mt-0.5">
            <RotateCcw size={14} />
          </div>
          <div>
            <h4 className="text-xs font-semibold text-gray-900">30-Day Return</h4>
            <p className="text-[11px] text-gray-500 leading-tight mt-0.5">
              Hassle-free returns & instant exchange.
            </p>
          </div>
        </div>

        <div className="flex items-start gap-2.5 p-2.5 rounded-xl bg-white border border-gray-200/70 shadow-2xs">
          <div className="p-1.5 rounded-lg bg-gray-100 text-gray-700 flex-shrink-0 mt-0.5">
            <ShieldCheck size={14} />
          </div>
          <div>
            <h4 className="text-xs font-semibold text-gray-900">100% Genuine</h4>
            <p className="text-[11px] text-gray-500 leading-tight mt-0.5">
              Directly sourced & quality verified.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
