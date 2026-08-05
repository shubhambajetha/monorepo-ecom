import { deleteWishlist } from '@/app/services/wishlistapi/wishlistApi.ts';
import { useMutation, useQueryClient } from '@tanstack/react-query';

export default function useDeleteWishlist() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (productId: string) => deleteWishlist(productId),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ['wishlist'],
      });
    },
  });
}
