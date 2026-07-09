import { deletecategory } from "@/app/services/categoryapi/category";
import { useMutation, useQueryClient } from "@tanstack/react-query";

export default function useDeleteCategory(id:number){
    const QueryClient = useQueryClient()
    return useMutation({
        mutationFn:()=>deletecategory(id),
        onSuccess:()=>{
            QueryClient.invalidateQueries({
                queryKey:["categories"],
            });
        },
    });
}

