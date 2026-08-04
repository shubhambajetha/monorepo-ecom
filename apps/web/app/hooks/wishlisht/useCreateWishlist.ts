import { createWishlist } from '@/app/services/wishlistapi/wishlistApi.ts';
import { useMutation, useQueryClient } from '@tanstack/react-query';

export default function useCreateWishlist() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: createWishlist,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ['createwishlist'],
      });
    },
  });
}
