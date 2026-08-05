import { getWishlist, WishlistItem } from "@/app/services/wishlistapi/wishlistApi.ts";
import { ApiResponse } from "@/app/utils/api";
import { useQuery } from "@tanstack/react-query";

export function useGetWishlist(initialData?: ApiResponse<WishlistItem[]>) {
  return useQuery({
    queryKey: ["wishlist"],
    queryFn: getWishlist,
    initialData,
  });
}

export default useGetWishlist;
export { useGetWishlist as useGetWishlisht };

