import { deleteproduct } from "@/app/services/productapi/productapi";
import { useMutation, useQueryClient } from "@tanstack/react-query";

export const useDeleteProduct = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id: number) => deleteproduct(id),

    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["getproduct"],
      });
    },
  });
};