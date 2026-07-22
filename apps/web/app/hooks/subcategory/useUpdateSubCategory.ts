import { getupdatesubcat } from "@/app/services/subcategoryapi/subcategory";
import { subcategoryPayload } from "@/app/types/subcatgory/subcategorytype";
import { useMutation, useQueryClient } from "@tanstack/react-query";

export default function useUpdateSubCategory(id:number){
    const queryClinet = useQueryClient();
    return useMutation({
        mutationFn:(payload: subcategoryPayload) => getupdatesubcat(id, payload),
        onSuccess: ()=>{
            queryClinet.invalidateQueries({
                queryKey:["subcategories"]
            })
        }
        
    })
}