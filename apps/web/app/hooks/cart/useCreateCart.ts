import { createCart, CartPayload } from "@/app/services/cartapi/cartapi";
import { useMutation, useQueryClient } from "@tanstack/react-query";

export default function useCreateCart() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (payload: CartPayload) => createCart(payload),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["getcart"],
      });
      queryClient.invalidateQueries({
        queryKey: ["countnumber"],
      });
    },
    onError: (error: any) => {
      console.log('Add to cart failed', error?.message);
    },
  });
}


