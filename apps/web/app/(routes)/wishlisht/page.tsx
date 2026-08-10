import WishLisht from '@/app/components/wishlisht/WishLisht';
import { getWishlist } from '@/app/services/wishlistapi/wishlistApi.ts';

export default async function Page() {
  const wishlist = await getWishlist();

  return (
    <div>
      <WishLisht wishlist={wishlist.data ?? []} />
    </div>
  );
}
