import { getupdatesubcat } from '@/app/services/subcategoryapi/subcategory';
import { subcategoryPayload } from '@/app/types/subcatgory/subcategorytype';
import { useMutation, useQueryClient } from '@tanstack/react-query';

export default function useUpdateSubCategory(id: string | number) {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (payload: subcategoryPayload) => getupdatesubcat(id, payload),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ['subcategories'],
      });
    },
  });
}