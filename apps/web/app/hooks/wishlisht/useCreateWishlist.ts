import { createWishlist } from '@/app/services/wishlistapi/wishlistApi.ts';
import { useMutation, useQueryClient } from '@tanstack/react-query';

export default function useCreateWishlist() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (productId: string) => createWishlist(productId),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ['wishlist'],
      });
    },
  });
}
