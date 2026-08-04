import { getWishlist } from "@/app/services/wishlistapi/wishlistApi.ts";
import { useQuery } from "@tanstack/react-query";

export default function useGetWishlisht(){
    return useQuery({
        queryKey:["getwishlist"],
        queryFn:getWishlist,
    });
}

