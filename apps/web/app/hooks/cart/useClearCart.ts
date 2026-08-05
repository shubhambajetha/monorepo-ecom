import { clearCart } from "@/app/services/cartapi/cartapi";
import { useMutation, useQueryClient } from "@tanstack/react-query";

export default function useClearCart() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: clearCart,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["getcart"],
      });
      queryClient.invalidateQueries({
        queryKey: ["countnumber"],
      });
    },
    onError: (error: any) => {
      console.log('Clear cart failed', error?.message);
    },
  });
}

