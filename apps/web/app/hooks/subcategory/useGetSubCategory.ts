import { getsubcat } from '@/app/services/subcategoryapi/subcategory';
import { useQuery } from '@tanstack/react-query';

export default function useGetSubCategory(id: number) {
  return useQuery({
    queryKey: ['getsubcate'],
    queryFn: () => getsubcat(id),
    enabled: !!id,
  });
}
