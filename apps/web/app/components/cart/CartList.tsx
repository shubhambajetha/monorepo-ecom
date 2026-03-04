import type { CartItem } from '@/store/cartStore';

interface CartListProps {
  items: CartItem[];
  onDecrease: (productId: string, quantity: number) => void;
  onIncrease: (productId: string, quantity: number) => void;
  onRemove: (productId: string) => void;
}

export function CartList({ items, onDecrease, onIncrease, onRemove }: CartListProps) {
  return (
    <section className="rounded-xl border border-gray-200 bg-white p-4 sm:p-6">
      <h2 className="text-lg font-medium text-gray-900">Items</h2>
      <ul className="mt-4 divide-y divide-gray-200">
        {items.map((item) => (
          <li key={item.id} className="flex flex-col gap-3 py-4 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <p className="font-medium text-gray-900">{item.name}</p>
              <p className="text-sm text-gray-600">${item.price.toFixed(2)} each</p>
            </div>
            <div className="flex items-center gap-3">
              <button
                type="button"
                onClick={() => onDecrease(item.id, item.quantity)}
                className="rounded-md border border-gray-300 px-3 py-1 text-sm font-medium text-gray-700"
              >
                -
              </button>
              <span className="min-w-6 text-center text-sm font-medium text-gray-900">{item.quantity}</span>
              <button
                type="button"
                onClick={() => onIncrease(item.id, item.quantity)}
                className="rounded-md border border-gray-300 px-3 py-1 text-sm font-medium text-gray-700"
              >
                +
              </button>
              <button
                type="button"
                onClick={() => onRemove(item.id)}
                className="ml-2 text-sm font-medium text-red-600 hover:text-red-700"
              >
                Remove
              </button>
            </div>
          </li>
        ))}
      </ul>
    </section>
  );
}
