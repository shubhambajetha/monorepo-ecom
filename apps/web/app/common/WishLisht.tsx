'use client';
import { startTransition, useOptimistic, useState } from 'react';
import useCreateWishlist from '../hooks/wishlisht/useCreateWishlist';
import { Heart } from 'lucide-react';

import Swal from 'sweetalert2';
import useDeleteWishlist from '../hooks/wishlisht/useDeleteWishlist';
import { useGetWishlisht } from '../hooks/wishlisht/useGetWishlist';

export default function WishLisht({
  productId,
  className,
  showText = false,
}: {
  productId: string;
  className?: string;
  showText?: boolean;
}) {
  // const [isWishlist, setIsWishlist] = useState(false);
  const { data: wishlisht } = useGetWishlisht();
  const Iswishlisht = wishlisht?.data?.some((item) => item.productId === productId) ?? false;
  const [optimisticWishlist, setOptimisticWishlist] = useOptimistic(
    Iswishlisht,
    (_, updateValue: boolean) => updateValue
  );

  const { mutateAsync: createWishlist } = useCreateWishlist();
  const { mutateAsync: deleteWishlist } = useDeleteWishlist();

  async function handlewishlisht() {
    const nextvalue = !optimisticWishlist;
    // update ui imidatly
    startTransition(() => {
      setOptimisticWishlist(nextvalue);
    });

    // check what user need
    try {
      if (optimisticWishlist) {
        await deleteWishlist(productId);
      } else {
        await createWishlist(productId);
      }
  

      Swal.fire({
        icon: 'success',
        title: nextvalue ? 'Added to wishlist' : 'Removed from wishlist',
        timer: 1500,
        showConfirmButton: false,
      });
    } catch (error: any) {
      // revert api if is failed
      startTransition(() => {
        setOptimisticWishlist(!nextvalue);
      });

      const isUnauthorized =
        error?.status === 401 ||
        error?.message?.includes('Session expired') ||
        error?.message?.includes('Unauthorized');

      Swal.fire({
        icon: 'error',
        title: isUnauthorized ? 'Login Required' : 'Failed',
        text: isUnauthorized
          ? 'Please log in to add items to your wishlist.'
          : error?.message || 'unable to update wishlist',
      });
    }
  }

  const defaultClassName =
    'absolute top-3 left-3 z-10 inline-flex h-9 w-9 items-center justify-center rounded-full bg-white/90 text-gray-600 shadow-sm backdrop-blur-sm transition hover:scale-110 hover:bg-white hover:text-red-500 focus:outline-none focus:ring-2 focus:ring-red-400';

  return (
    <button
      type="button"
      onClick={handlewishlisht}
      aria-label={optimisticWishlist ? 'Remove from wishlist' : 'Add to wishlist'}
      className={className || defaultClassName}
    >
      <Heart size={18} className={optimisticWishlist ? 'fill-red-500 text-red-500' : ''} />
      {showText && (
        <span className="ml-2 font-medium text-sm">
          {optimisticWishlist ? 'WISHLISTED' : 'WISHLIST'}
        </span>
      )}
    </button>
  );
}
