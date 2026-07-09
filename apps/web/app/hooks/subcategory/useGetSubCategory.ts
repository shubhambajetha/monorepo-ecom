import { getsubcat } from '@/app/services/subcategoryapi/subcategory';
import { useQuery } from '@tanstack/react-query';

export default function useGetSubCategory(id: number) {
  return useQuery({
    queryKey: ['subcategories', id],
    queryFn: () => getsubcat(id),
    enabled: !!id,
  });
}
