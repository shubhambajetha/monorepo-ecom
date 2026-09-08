import { getProductsByCollection } from "@/app/services/collectionapi/collectionapi";
import { useInfiniteQuery } from "@tanstack/react-query";

export default function useGetProductByCollections(
  category: string,
  collection: string,
  limit: number = 20
) {
  return useInfiniteQuery({
    queryKey: [
      "getbycollection",
      category,
      collection,
      limit,
    ],

    queryFn: ({ pageParam }) =>
      getProductsByCollection(
        category,
        collection,
        pageParam,
        limit
      ),

    initialPageParam: 1,

    getNextPageParam: (lastPage) => {
      if (!lastPage?.pagination) return undefined;
      const { page, totalPages } = lastPage.pagination;

      return page < totalPages
        ? page + 1
        : undefined;
    },

    enabled: !!category && !!collection,
  });
}