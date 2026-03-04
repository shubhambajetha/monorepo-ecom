'use client';

import { useCart } from '@/hooks';
import { CartList } from './CartList';
import { CartSummary } from './CartSummary';
import { EmptyCart } from './EmptyCart';

export function CartPage() {
  const { items, total, clearCart, updateQuantity, removeFromCart } = useCart();

  if (items.length === 0) {
    return <EmptyCart />;
  }

  return (
    <main className="mx-auto max-w-5xl px-4 py-10 sm:px-6 lg:px-8">
      <h1 className="text-2xl font-semibold text-gray-900">Your Cart</h1>
      <div className="mt-8 grid gap-8 lg:grid-cols-[1fr_320px]">
        <CartList
          items={items}
          onDecrease={(productId, quantity) => updateQuantity(productId, quantity - 1)}
          onIncrease={(productId, quantity) => updateQuantity(productId, quantity + 1)}
          onRemove={removeFromCart}
        />
        <CartSummary total={total} onClear={clearCart} />
      </div>
    </main>
  );
}
