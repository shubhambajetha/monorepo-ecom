import { deleteCartItem } from "@/app/services/cartapi/cartapi";
import { useMutation, useQueryClient } from "@tanstack/react-query";

export default function useDeleteCart() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id: string) => deleteCartItem(id),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["cart"],
      });
    },
  });
}