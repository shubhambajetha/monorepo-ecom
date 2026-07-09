import { getproduct } from '@/app/services/productapi/productapi';
import { useQuery } from '@tanstack/react-query';

export const useGetProduct = (id: number) => {
  return useQuery({
    queryKey: ['products', id],
    queryFn: () => getproduct(id),
    enabled: !!id,
  });
};


