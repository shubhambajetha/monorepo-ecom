import useGetWishlisht from '@/app/hooks/wishlisht/useGetWishlist';
import { WishlistItem } from '@/app/services/wishlistapi/wishlistApi.ts';
import { ApiResponse } from '@/app/utils/api';
import { Dot } from 'lucide-react';
import React from 'react';

type WishLishtProps = {
  initialdata: ApiResponse<WishlistItem[]>;
};
const WishLisht = ({ initialdata }: WishLishtProps) => {
  const { data, isLoading } = useGetWishlisht();

  const product = data ?? initialdata;
  const details = product.data;
  if (isLoading && !details) {
    return (
      <div className="min-h-screen flex items-center justify-center text-gray-400 text-sm">
        Loading product...
      </div>
    );
  }

  if (!details) {
    return (
      <div className="min-h-screen flex items-center justify-center text-gray-400 text-sm">
        Loading product...
      </div>
    );
  }

  return (
    <div className="max-w-[1450px] mx-auto px-2 py-2 bg-white">
      <div className="grid grid-cols-3 gap-4">
        {details.map((item)=>{
          return(
            <div 
            key={item.id}
            className="">

            </div>
          )
        })}
      </div>
    </div>
  );
};

export default WishLisht;
