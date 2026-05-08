'use client';
import { useState } from 'react';
import { Heart, ShirtIcon } from 'lucide-react';

interface SingleCartProps {
  title: string;
  category: string;
  price: number;
  originalPrice?: number;
  colors?: string[];
  bgColor?: string;
}
const SingleCart: React.FC<SingleCartProps> = ({
  title = 'Ben 10: Omnitrix',
  category = 'Oversized T-Shirts',
  price = 1099,
  originalPrice = 1399,
  colors = ['#2563eb', '#000000', '#dc2626', '#16a34a'],
  bgColor = 'from-[#c9b99a] to-[#a0856a]',
}) => {
  const [liked, setLiked] = useState(false);

  return (
    <div className="group mx-2 bg-white w-full sm:w-[350px] mb-10 rounded-sm overflow-hidden cursor-pointer">
      {/* Image Area */}
      <div className="relative overflow-hidden" style={{ height: '260px' }}>
        {/* Fake image placeholder */}
        <div
          className={`w-full h-full flex items-center justify-center bg-gradient-to-br ${bgColor} transition-transform duration-400 group-hover:scale-105`}
        >
          <ShirtIcon size={80} className="text-white opacity-30" />
        </div>

        {/* Wishlist Button */}
        <button
          onClick={() => setLiked(!liked)}
          className="absolute top-2 right-2 bg-white rounded-full p-[6px] shadow transition-transform duration-200 hover:scale-110"
        >
          <Heart
            size={16}
            className={`transition-colors duration-200 ${liked ? 'fill-red-500 stroke-red-500' : 'stroke-gray-400'}`}
          />
        </button>
      </div>

      {/* Info Area */}
      <div className="p-3">
        <h3 className="font-bold text-[13px] text-gray-900 leading-tight">{title}</h3>
        <p className="text-[11px] font-medium text-gray-400 mt-[2px]">{category}</p>

        <div className="flex items-center justify-between mt-2">
          <span className="font-bold text-[15px] text-gray-900">₹{price.toLocaleString()}</span>
          {originalPrice && (
            <span className="text-[11px] text-gray-400 line-through">
              ₹{originalPrice.toLocaleString()}
            </span>
          )}
        </div>

        {/* Sizes */}
        {colors.length > 0 && (
          <div className="flex gap-1 mt-2 flex-wrap">
            {colors.map((size) => (
              <span
                key={size}
                className="text-[10px] border border-gray-300 rounded px-[6px] py-[2px] text-gray-500 hover:border-black hover:text-black transition-colors cursor-pointer"
              >
                {size}
              </span>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default SingleCart;
