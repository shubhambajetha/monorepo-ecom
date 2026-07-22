import { updateCategory } from '@/app/services/categoryapi/category';
import { CategoryPayload } from '@/app/types/category/categorytype';
import { useMutation, useQueryClient } from '@tanstack/react-query';

export default function useUpdateCategory(id: number) {
  const queryClinet = useQueryClient();
  return useMutation({
    mutationFn: (payload: CategoryPayload) => updateCategory(id, payload),
    onSuccess: () => {
      queryClinet.invalidateQueries({
        queryKey: ['categories'],
      });
    },
  });
}
