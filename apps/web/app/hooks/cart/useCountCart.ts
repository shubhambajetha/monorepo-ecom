import { countCart } from '@/app/services/cartapi/cartapi';
import { useQuery } from '@tanstack/react-query';

export default function useCountCart() {
  return useQuery({
    queryKey: ['countnumber'],
    queryFn: countCart,
  });
}


