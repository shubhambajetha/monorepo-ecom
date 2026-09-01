import { updateCategory } from '@/app/services/categoryapi/category';
import { CategoryPayload } from '@/app/types/category/categorytype';
import { useMutation, useQueryClient } from '@tanstack/react-query';

export default function useUpdateCategory(id: string | number) {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (payload: CategoryPayload) => updateCategory(id, payload),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ['categories'],
      });
    },
  });
}
