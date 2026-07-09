import { useInfiniteQuery } from '@tanstack/react-query';
import { ProductQueryParams } from '@/app/types/product/productype';
import { getallproduct } from '@/app/services/productapi/productapi';

export const useInfiniteProducts = (filters: ProductQueryParams) => {
  return useInfiniteQuery({
    queryKey: ['products', filters],

    queryFn: ({ pageParam = 1 }) =>
      getallproduct({
        ...filters,
        page: String(pageParam),
        limit: '10',
      }),

    initialPageParam: 1,

    getNextPageParam: (lastPage) => {
      const { page, totalPages } = lastPage.pagination;

      if (page < totalPages) {
        return page + 1;
      }

      return undefined;
    },
  });
};
