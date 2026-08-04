import { deleteWishlist } from "@/app/services/wishlistapi/wishlistApi.ts";
import { useMutation, useQueryClient } from "@tanstack/react-query";

export default function useDeleteWishlisht(){
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn:deleteWishlist,
        onSuccess:()=>{
            queryClient.invalidateQueries({
                queryKey:["deletewishlist"],
            });
        },
    });
}