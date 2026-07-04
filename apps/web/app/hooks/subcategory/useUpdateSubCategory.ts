import { getupdatesubcat } from "@/app/services/subcategoryapi/subcategory";
import { useMutation, useQueryClient } from "@tanstack/react-query";

export default function useUpdateSubCategory(id:number){
    const queryClinet = useQueryClient();
    return useMutation({
        mutationFn:(payload) => getupdatesubcat(id, payload),
        onSuccess: ()=>{
            queryClinet.invalidateQueries({
                queryKey:["updatesubcate"]
            })
        }
        
    })
}