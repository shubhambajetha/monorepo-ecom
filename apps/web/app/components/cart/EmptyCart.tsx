import Link from 'next/link';

export function EmptyCart() {
  return (
    <main className="mx-auto flex max-w-3xl flex-col items-center px-4 py-16 text-center sm:px-6 lg:px-8">
      <h1 className="text-2xl font-semibold text-gray-900">Your cart is empty</h1>
      <p className="mt-2 text-sm text-gray-600">Add products to your cart to see them here.</p>
      <Link
        href="/"
        className="mt-6 rounded-lg bg-gray-900 px-4 py-2 text-sm font-medium text-white hover:bg-gray-800"
      >
        Continue shopping
      </Link>
    </main>
  );
}
