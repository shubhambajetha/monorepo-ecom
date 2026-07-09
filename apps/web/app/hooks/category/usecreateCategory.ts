import { createCategory } from '@/app/services/categoryapi/category';
import { useMutation, useQueryClient } from '@tanstack/react-query';

export default function useCreateCategory() {
  const querclinet = useQueryClient();
  return useMutation({
    mutationFn: createCategory,
    onSuccess: () => {
      querclinet.invalidateQueries({
        queryKey: ['categories'],
      });
    },
    onError: (error: any) => {
      console.log('create category failed ', error?.message);
    },
  });
}


