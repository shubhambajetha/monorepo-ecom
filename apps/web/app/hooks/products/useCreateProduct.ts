import { createproduct } from '@/app/services/productapi/productapi';
import { useMutation, useQueryClient } from '@tanstack/react-query';

export const useCreateProduct = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: createproduct,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ['products'],
      });
    },
  });
};

