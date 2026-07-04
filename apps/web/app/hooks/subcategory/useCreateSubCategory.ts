import { createsubcat } from '@/app/services/subcategoryapi/subcategory';
import { useMutation, useQueryClient } from '@tanstack/react-query';


export default function useCreateSubCategory() {
  const queryclient = useQueryClient();
  return useMutation({
    mutationFn: createsubcat,
    onSuccess: () => {
      queryclient.invalidateQueries({
        queryKey: ['createsubcat'],
      });
    },
    onError:(error:any)=>{
        console.log('Create category failed', error?.message)
    }
  })
}
