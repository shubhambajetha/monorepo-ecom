import { getdeletesubcat } from '@/app/services/subcategoryapi/subcategory';
import { useMutation, useQueryClient } from '@tanstack/react-query';

export default function useDeleteSubCategory() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id: number) => getdeletesubcat(id),

    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ['subcategories'],
      });
    },
  });
}
