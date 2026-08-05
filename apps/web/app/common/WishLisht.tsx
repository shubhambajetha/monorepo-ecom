'use client';
import { startTransition, useOptimistic, useState } from 'react';
import useCreateWishlist from '../hooks/wishlisht/useCreateWishlist';
import { Heart } from 'lucide-react';

import Swal from 'sweetalert2';
import useDeleteWishlist from '../hooks/wishlisht/useDeleteWishlist';

export default function WishLisht({ productId }: { productId: string }) {
  const [isWishlist, setIsWishlist] = useState(false);
  const [optimisticWishlist, setOptimisticWishlist] = useOptimistic(isWishlist);

  const { mutateAsync: createWishlist } = useCreateWishlist();
  const { mutateAsync: deleteWishlist } = useDeleteWishlist();

  async function handlewishlisht() {
    const nextvalue = !optimisticWishlist;
    // update ui imidatly
    startTransition(() => {
      setOptimisticWishlist(nextvalue);
    });
    try {
      if (optimisticWishlist) {
        await deleteWishlist(productId);
      } else {
        await createWishlist(productId);
      }
      // save the real state
      setIsWishlist(nextvalue);

      Swal.fire({
        icon: 'success',
        title: nextvalue ? 'Added to wishlist' : 'Removed from wishlist',
        timer: 1500,
        showConfirmButton: false,
      });
    } catch (error) {
      // revert api if is failed
      startTransition(() => {
        setOptimisticWishlist(!nextvalue);
      });
      Swal.fire({
        icon: "error",
        title: "Failed",
        text: "unable to update wishlist",
      });
    }
  }

  return (
    <button
      type="button"
      onClick={handlewishlisht}
      aria-label={optimisticWishlist ? 'Remove from wishlist' : 'Add to wishlist'}
      className="absolute top-3 left-3 z-10 inline-flex h-9 w-9 items-center justify-center rounded-full bg-white/90 text-gray-600 shadow-sm backdrop-blur-sm transition hover:scale-110 hover:bg-white hover:text-red-500 focus:outline-none focus:ring-2 focus:ring-red-400"
    >
      <Heart
        size={18}
        className={optimisticWishlist ? 'fill-red-500 text-red-500' : ''}
      />
    </button>
  );
}
