'use client';

import { startTransition, useOptimistic } from 'react';
import useCreateCart from '../hooks/cart/useCreateCart';
import useDeleteCart from '../hooks/cart/useDeleteCart';
import useGetCart from '../hooks/cart/useGetCart';
import Swal from 'sweetalert2';

export default function AddToCart({
  productId,
  className = '',
}: {
  productId: string;
  className?: string;
}) {
  const { data: cart } = useGetCart();
  const isCart = cart?.data?.some((item) => item.productId === productId) ?? false;
  const [optimisticCart, setOptimisticCart] = useOptimistic(
    isCart,
    (_, updateValue: boolean) => updateValue
  );

  const { mutateAsync: createcart, isPending: creating } = useCreateCart();
  const { mutateAsync: deletecart, isPending: deleting } = useDeleteCart();
  const loading = creating || deleting;

  async function handleAddtoCart() {
    const newValue = !optimisticCart;
    startTransition(() => {
      setOptimisticCart(newValue);
    });

    try {
      if (!optimisticCart) {
        await createcart({ productId });
      } else {
        await deletecart(productId);
      }

      Swal.fire({
        icon: 'success',
        title: newValue ? 'Added to cart' : 'Removed from cart',
        timer: 1500,
        showConfirmButton: false,
      });
    } catch (error: any) {
      startTransition(() => {
        setOptimisticCart(!newValue);
      });

      const isUnauthorized =
        error?.status === 401 ||
        error?.message?.includes('Session expired') ||
        error?.message?.includes('Unauthorized');

      Swal.fire({
        icon: 'error',
        title: isUnauthorized ? 'Login Required' : 'Failed',
        text: isUnauthorized
          ? 'Please log in to add items to your cart.'
          : error?.message || 'Unable to update cart',
      });
    }
  }

  return (
    <button
      disabled={loading}
      onClick={handleAddtoCart}
      className={`w-full py-2.5 px-4 rounded-md font-medium text-sm transition-all duration-150 flex items-center justify-center gap-2 ${
        optimisticCart
          ? 'bg-gray-800 hover:bg-gray-900 text-white'
          : 'bg-red-600 hover:bg-red-700 text-white'
      } disabled:opacity-50 disabled:cursor-not-allowed shadow-sm ${className}`}
    >
      {loading ? (
        <span>Processing...</span>
      ) : optimisticCart ? (
        <span>REMOVE FROM CART</span>
      ) : (
        <span>ADD TO CART</span>
      )}
    </button>
  );
}

export { AddToCart as AddTooCard };
