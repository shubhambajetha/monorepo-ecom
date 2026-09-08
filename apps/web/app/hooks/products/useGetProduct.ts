import { getproduct } from '@/app/services/productapi/productapi';
import { useQuery } from '@tanstack/react-query';

export const useGetProduct = (id?: string) => {
  return useQuery({
    queryKey: ['products', id],
    queryFn: () => (id ? getproduct(id) : Promise.reject(new Error('No product ID provided'))),
    enabled: Boolean(id),
  });
};


