import WishLisht from "@/app/components/wishlisht/WishLisht";
import { getWishlist } from "@/app/services/wishlistapi/wishlistApi.ts";

export default async function page() {
    const wishlisht = await getWishlist();
    return <WishLisht initialdata={wishlisht}/>
}