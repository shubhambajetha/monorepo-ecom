import { getallsubcat } from '@/app/services/subcategoryapi/subcategory';
import { SubCategory } from '@/app/types/subcatgory/subcategorytype';
import { ApiResponse } from '@/app/utils/api';
import { useQuery } from '@tanstack/react-query';

export default function useGetAllSubCategory(
  initialData?: ApiResponse<SubCategory[]>
) {
  return useQuery({
    queryKey: ['subcategories'],
    queryFn: getallsubcat,
    initialData,
  });
}