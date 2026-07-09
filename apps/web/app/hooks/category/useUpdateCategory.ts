import { updateCategory } from '@/app/services/categoryapi/category';
import { useMutation, useQueryClient } from '@tanstack/react-query';

export default function useUpdateCategory(id: number) {
  const queryClinet = useQueryClient();
  return useMutation({
    mutationFn: (payload) => updateCategory(id, payload),
    onSuccess: () => {
      queryClinet.invalidateQueries({
        queryKey: ['categories'],
      });
    },
  });
}
