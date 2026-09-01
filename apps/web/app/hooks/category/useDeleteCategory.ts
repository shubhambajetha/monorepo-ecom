import { deletecategory } from "@/app/services/categoryapi/category";
import { useMutation, useQueryClient } from "@tanstack/react-query";

export default function useDeleteCategory() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (id: string | number) => deletecategory(id),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["categories"],
      });
    },
  });
}

