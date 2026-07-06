import { updateCollection } from "@/app/services/collectionapi/collectionapi";
import { CollectionPayload } from "@/app/types/collection/collectiontype";
import { useMutation, useQueryClient } from "@tanstack/react-query";

export default function useUpdateCollection(id: number) {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (payload: CollectionPayload) =>
      updateCollection(id, payload),

    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["collections"],
      });

      queryClient.invalidateQueries({
        queryKey: ["collection", id],
      });
    },

    onError: (error: any) => {
      console.log("Update collection failed", error?.message);
    },
  });
}