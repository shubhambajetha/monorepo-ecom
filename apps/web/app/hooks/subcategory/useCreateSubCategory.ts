import { createsubcat } from '@/app/services/subcategoryapi/subcategory';
import { useMutation, useQueryClient } from '@tanstack/react-query';

export default function useCreateSubCategory() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: createsubcat,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ['subcategories'],
      });
    },
    onError: (error: any) => {
      console.error('Create subcategory failed', error?.message);
    },
  });
}

