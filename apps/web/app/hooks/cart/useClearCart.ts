import { createCart } from "@/app/services/cartapi/cartapi";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { error } from "next/dist/build/output/log";

export default function useClearCart(){
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn:createCart,
        onSuccess:()=>{
            queryClient.invalidateQueries({
                queryKey:["createcart"],
            });
        },

        onError:(error:any)=>{
            console.log('create collection failed', error?.message)
        }
    });
}

