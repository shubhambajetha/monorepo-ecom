import { updateProduct } from '@/app/services/productapi/productapi';
import { ProductPayload } from '@/app/types/product/productype';
import { useMutation, useQueryClient } from '@tanstack/react-query';

export const useUpdateProduct = (id: number) => {
  const queryclient = useQueryClient();
  return useMutation({
    mutationFn: (payload: ProductPayload) => 
    updateProduct(id, payload),
    onSuccess:()=>{
        queryclient.invalidateQueries({
            queryKey:["products"]
        })
    }
  });
};
