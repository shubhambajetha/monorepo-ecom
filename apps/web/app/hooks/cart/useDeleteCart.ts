import { deleteCartItem } from "@/app/services/cartapi/cartapi";
import { useMutation, useQueryClient } from "@tanstack/react-query";

export default function useDeleteCart() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (productId: string) => deleteCartItem(productId),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["getcart"],
      });
      queryClient.invalidateQueries({
        queryKey: ["countnumber"],
      });
    },
  });
}