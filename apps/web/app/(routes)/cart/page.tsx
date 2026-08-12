import Alldeatils from '@/app/components/carts/Alldeatils';
import { getCart, CartItem } from '@/app/services/cartapi/cartapi';

export default async function Page() {
  let cartItems: CartItem[] = [];
  try {
    const cart = await getCart();
    console.log(cart);
    cartItems = cart.data ?? [];
  } catch {
    // Unauthenticated SSR request or error
  }

  return <Alldeatils getcarts={cartItems} />;
}
