import { createCollection } from "@/app/services/collectionapi/collectionapi";
import { useMutation, useQueryClient } from "@tanstack/react-query";

export default function useCreateCollection() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: createCollection,

    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["collections"],
      });
    },

    onError: (error: any) => {
      console.log("Create collection failed", error?.message);
    },
  });
}