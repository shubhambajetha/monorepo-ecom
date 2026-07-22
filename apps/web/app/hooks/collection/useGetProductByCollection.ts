import { getProductsByCollection } from "@/app/services/collectionapi/collectionapi";
import { useQuery } from "@tanstack/react-query";

export default function useGetProductByCollections(
  category: string,
  collection: string
) {
  return useQuery({
    queryKey: ["getbycollection", category, collection],
    queryFn: () => getProductsByCollection(category, collection),
    enabled: !!category && !!collection,
  });
}