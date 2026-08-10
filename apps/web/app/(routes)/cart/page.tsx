import Alldeatils from '@/app/components/carts/Alldeatils';
import { getCart } from '@/app/services/cartapi/cartapi';

export default async function Page() {
  const cart = await getCart();

  return <Alldeatils getcarts={cart.data ?? []} />;
}
