interface CartSummaryProps {
  total: number;
  onClear: () => void;
}

export function CartSummary({ total, onClear }: CartSummaryProps) {
  return (
    <aside className="h-fit rounded-xl border border-gray-200 bg-white p-4 sm:p-6">
      <h2 className="text-lg font-medium text-gray-900">Summary</h2>
      <div className="mt-4 flex items-center justify-between border-t border-gray-200 pt-4">
        <span className="text-sm text-gray-600">Total</span>
        <span className="text-xl font-semibold text-gray-900">${total.toFixed(2)}</span>
      </div>
      <button
        type="button"
        className="mt-6 w-full rounded-lg bg-gray-900 px-4 py-2 text-sm font-medium text-white hover:bg-gray-800"
      >
        Checkout
      </button>
      <button
        type="button"
        onClick={onClear}
        className="mt-3 w-full rounded-lg border border-gray-300 px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50"
      >
        Clear cart
      </button>
    </aside>
  );
}
