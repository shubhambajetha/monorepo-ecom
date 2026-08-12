import { moveToCart } from '@/app/services/wishlistapi/wishlistApi.ts';
import { useMutation, useQueryClient } from '@tanstack/react-query';

export default function useMoveToCart() {
  const queryClient = useQueryClient();
  return useMutation({
     mutationFn:(producId:string)=>moveToCart(producId),
     onSuccess: () => {
        queryClient.invalidateQueries({
          queryKey: ['wishlist'],
        });
        queryClient.invalidateQueries({
          queryKey: ['getcart'],
        });
        queryClient.invalidateQueries({
          queryKey: ['countnumber'],
        });
     },
  });
}


