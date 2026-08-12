import WishLisht from '@/app/components/wishlisht/WishLisht';
import { getWishlist, WishlistItem } from '@/app/services/wishlistapi/wishlistApi.ts';

export default async function Page() {
  let initialWishlist: WishlistItem[] = [];
  try {
    const wishlist = await getWishlist();
    initialWishlist = wishlist.data ?? [];
  } catch {
    // Unauthenticated SSR request or error, client will hydrate and fetch if authenticated
  }

  return (
    <div>
      <WishLisht wishlist={initialWishlist} />
    </div>
  );
}
