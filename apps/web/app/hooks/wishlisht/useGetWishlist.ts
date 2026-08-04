import { getWishlist, WishlistItem } from "@/app/services/wishlistapi/wishlistApi.ts";
import { ApiResponse } from "@/app/utils/api";
import { useQuery } from "@tanstack/react-query";

export default function useGetWishlisht(initialData?:ApiResponse<WishlistItem[]>){
    return useQuery({
        queryKey:["getwishlist"],
        queryFn:getWishlist,
        initialData
    });
}

