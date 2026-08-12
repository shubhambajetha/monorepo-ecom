import { updatecart, CartPayload } from '@/app/services/cartapi/cartapi';
import { useMutation, useQueryClient } from '@tanstack/react-query';

export default function useUpdateCart() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (payload: CartPayload) => updatecart(payload),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ['getcart'],
      });
      queryClient.invalidateQueries({
        queryKey: ['countnumber'],
      });
    },
  });
}
