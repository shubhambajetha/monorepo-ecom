import { getProductBySlug } from '@/app/services/productapi/productapi';
import { Product } from '@/app/types/product/productype';
import { ApiResponse } from '@/app/utils/api';
import { useQuery } from '@tanstack/react-query';

export const useProductBySlug = (
  category: string,
  collection: string,
  product: string,
  initialData?: ApiResponse<Product>
) => {
  return useQuery({
    queryKey: ['slugproduct', category, collection, product],
    queryFn: () =>
      getProductBySlug({
        category,
        collection,
        slug: product,
      }),
    initialData,
    staleTime: 1000 * 60 * 5,

    enabled: !!category && !!collection && !!product,
  });
};
