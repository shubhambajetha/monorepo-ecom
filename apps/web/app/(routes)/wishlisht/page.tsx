import WishLisht from "@/app/components/wishlisht/WishLisht";
import { getWishlist } from "@/app/services/wishlistapi/wishlistApi.ts";

export const dynamic = 'force-dynamic';

export default async function page() {
    let wishlisht;
    try {
      wishlisht = await getWishlist();
    } catch {
      wishlisht = { success: false, data: [] };
    }
    return <WishLisht initialdata={wishlisht}/>
}