import { getCart } from '@/app/services/cartapi/cartapi';
import { useQuery } from '@tanstack/react-query';

export default function useGetCart() {
  return useQuery({
    queryKey: ['getcart'],
    queryFn: getCart,
  });
}


