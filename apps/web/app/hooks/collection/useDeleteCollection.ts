import { deleteCollection } from "@/app/services/collectionapi/collectionapi";
import { useMutation, useQueryClient } from "@tanstack/react-query";

export default function useDeleteCollection() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id: number) => deleteCollection(id),

    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["collections"],
      });
    },

    onError: (error: any) => {
      console.log("Delete collection failed", error?.message);
    },
  });
}