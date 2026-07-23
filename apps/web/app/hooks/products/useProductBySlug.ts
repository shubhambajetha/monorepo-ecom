import { getProductBySlug } from '@/app/services/productapi/productapi';
import { useQuery } from '@tanstack/react-query';

export const useProductBySlug = (category: string, collection: string, slug: string) => {
  return useQuery({
    queryKey: ['slugproduct', category, collection, slug],
    queryFn: () =>
      getProductBySlug({
        category,
        collection,
        slug,
      }),
    enabled: !!category && !!collection && !!slug,
  });
};
