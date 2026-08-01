import { searchProduct } from '@/app/services/productapi/productapi';
import { useQuery } from '@tanstack/react-query';

export const useSearchProducts = (search: string) => {
  const query = search.trim();

  return useQuery({
    queryKey: ['search-products', query],
    queryFn: () => searchProduct(query),
    enabled: query.length >= 2,
    staleTime: 30_000,
  });
};
