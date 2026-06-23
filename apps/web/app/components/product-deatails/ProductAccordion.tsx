import React, { useState } from 'react';

type AccordionItem = {
  title: string;
  content: React.ReactNode;
};

const accordionData: AccordionItem[] = [
  {
    title: 'Product Details',
    content: (
      <div className="space-y-5 text-sm text-gray-600">
        <div>
          <p className="font-bold text-gray-800 mb-1">Material & Care:</p>
          <p>85% Cotton 15% Linen</p>
          <p>Machine Wash</p>
        </div>

        <div>
          <p>
            <span className="font-bold text-gray-800">Country of Origin:</span> India (and proud)
          </p>
        </div>

        <div>
          <p className="font-bold text-gray-800 mb-1">Manufactured & Sold By:</p>

          <p>The Souled Store Pvt. Ltd.</p>
          <p>224, Tantia Jogani Industrial Premises</p>
          <p>J.R. Boricha Marg</p>
          <p>Lower Parel (E)</p>
          <p>Mumbai - 400 011</p>

          <a
            href="mailto:connect@thesouledstore.com"
            className="underline text-gray-700 hover:text-gray-900 block mt-1"
          >
            connect@thesouledstore.com
          </a>

          <a href="tel:+912268493328" className="underline text-gray-700 hover:text-gray-900 block">
            Customer care no. +91 22-68493328
          </a>
        </div>
      </div>
    ),
  },

  {
    title: 'Product Description',
    content: (
      <p className="text-sm text-gray-600 leading-relaxed">
        Crafted from a premium cotton-linen blend, this shirt brings effortless style to your
        wardrobe. The subtle stripe pattern and relaxed fit make it perfect for casual outings or
        smart-casual occasions.
      </p>
    ),
  },

  {
    title: "Artist's Details",
    content: (
      <p className="text-sm text-gray-600 leading-relaxed">
        Designed in-house by The Souled Store's creative team, inspired by clean lines and modern
        minimal aesthetics.
      </p>
    ),
  },
];

const ProductAccordion = () => {
  const [openIndex, setOpenIndex] = useState<number>(0);

  const toggle = (i: number) => {
    setOpenIndex(openIndex === i ? -1 : i);
  };

  return (
    <div className="w-full border border-gray-200 rounded-md divide-y divide-gray-200">
      {accordionData.map((item, i) => (
        <div key={i}>
          {/* Header */}
          <button
            onClick={() => toggle(i)}
            className="w-full flex items-center justify-between px-5 py-4 text-left hover:bg-gray-50 transition-colors duration-300"
          >
            <span className="text-sm font-bold text-gray-900">{item.title}</span>

            <svg
              className={`w-4 h-4 text-gray-500 flex-shrink-0 transition-transform duration-300 ease-in-out ${
                openIndex === i ? 'rotate-180' : 'rotate-0'
              }`}
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2}
            >
              <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
            </svg>
          </button>

          {/* Body */}
          <div
            className={`overflow-hidden transition-all duration-300 ease-in-out ${
              openIndex === i ? 'max-h-[1000px] opacity-100' : 'max-h-0 opacity-0'
            }`}
          >
            <div className="px-5 pb-5 pt-1">{item.content}</div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default ProductAccordion;
