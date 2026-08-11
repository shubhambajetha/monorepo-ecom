'use client';

import Image from 'next/image';
import { Trash2, Plus, Heart, Minus } from 'lucide-react';
import { Product } from '@/app/types/product/productype';
import { useEffect, useState } from 'react';
import { deleteCartItem, updatecart } from '@/app/services/cartapi/cartapi';

export interface CartItem {
  id: string;
  userId: string;
  productId: string;
  quantity: number;
  createdAt: string;
  updatedAt: string;
  product: Product;
}

interface AlldeatilsProps {
  getcarts: CartItem[];
}

const Carts = ({ getcarts }: AlldeatilsProps) => {
  const [cartItems, setCartItems] = useState(getcarts);
  const [loadingProductId, setLoadingProductId] = useState<string | null>(null);

  useEffect(() => {
    setCartItems(getcarts);
  }, [getcarts]);

  const updateQuantity = async (productId: string, quantity: number, nextQuantity: number) => {
    if (nextQuantity < 1) return;

    const previousItems = cartItems;
    setCartItems((prev) =>
      prev.map((item) =>
        item.productId === productId ? { ...item, quantity: nextQuantity } : item
      )
    );
    setLoadingProductId(productId);

    try {
      await updatecart({ productId, quantity: nextQuantity });
    } catch (error) {
      setCartItems(previousItems);
      console.error('Failed to update cart quantity', error);
    } finally {
      setLoadingProductId(null);
    }
  };

  const increaseQuantity = async (productId: string, quantity: number) => {
    await updateQuantity(productId, quantity, quantity + 1);
  };

  const decreaseQuantity = async (productId: string, quantity: number) => {
    if (quantity <= 1) return;
    await updateQuantity(productId, quantity, quantity - 1);
  };

  const removeItem = async (productId: string) => {
    const previousItems = cartItems;
    setCartItems((prev) => prev.filter((item) => item.productId !== productId));
    setLoadingProductId(productId);

    try {
      await deleteCartItem(productId);
    } catch (error) {
      setCartItems(previousItems);
      console.error('Failed to remove cart item', error);
    } finally {
      setLoadingProductId(null);
    }
  };

  if (cartItems.length === 0) {
    return (
      <div className="max-w-7xl mx-auto px-6 py-6 mt-6 text-center">
        <h1 className="font-semibold text-xl">BAG</h1>
        <p className="mt-4 text-gray-500">Your bag is empty.</p>
      </div>
    );
  }

  return (
    <div className="w-full">
      <h1 className="font-semibold text-2xl mb-6">Bag</h1>

      <div className="space-y-4">
        {cartItems.map((items) => (
          <div
            key={items.id}
            className="rounded-3xl border border-gray-200 bg-white p-4 shadow-sm sm:p-5"
          >
            <div className="flex flex-col gap-4 lg:flex-row">
              <div className="relative w-full h-64 rounded-3xl bg-gray-100 lg:w-40 lg:h-40">
                <Image
                  src={items.product.thumbnail}
                  fill
                  alt={items.product.title}
                  className="rounded-3xl object-cover"
                />
              </div>

              <div className="flex-1">
                <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
                  <div>
                    <p className="text-lg font-semibold text-gray-900">{items.product.title}</p>
                    <p className="text-gray-500 text-sm mt-2">{items.product.description}</p>
                    <p className="text-gray-500 text-sm mt-1">{items.product.colors}</p>
                    <p className="text-sm underline mt-2">Size {items.product.sizes}</p>
                  </div>

                  <p className="text-lg font-semibold text-gray-900 whitespace-nowrap">
                    ₹ {items.product.price.toLocaleString('en-IN')}
                  </p>
                </div>

                <div className="mt-5 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                  <div className="flex items-center gap-3 rounded-full border border-gray-200 bg-gray-50 px-3 py-2">
                    <button
                      aria-label="Remove item"
                      onClick={() => removeItem(items.productId)}
                      disabled={loadingProductId === items.productId}
                      className="text-gray-600 hover:text-gray-900 disabled:opacity-50"
                    >
                      <Trash2 size={16} />
                    </button>
                    <button
                      aria-label="Decrease quantity"
                      onClick={() => decreaseQuantity(items.productId, items.quantity)}
                      disabled={loadingProductId === items.productId || items.quantity <= 1}
                      className="text-gray-600 hover:text-gray-900 disabled:opacity-40"
                    >
                      <Minus size={16} />
                    </button>
                    <span className="text-sm font-medium w-6 text-center">{items.quantity}</span>
                    <button
                      aria-label="Increase quantity"
                      onClick={() => increaseQuantity(items.productId, items.quantity)}
                      disabled={loadingProductId === items.productId}
                      className="text-gray-600 hover:text-gray-900 disabled:opacity-40"
                    >
                      <Plus size={16} />
                    </button>
                  </div>

                  <button
                    aria-label="Save to wishlist"
                    className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-gray-200 text-gray-600 transition hover:bg-gray-100"
                  >
                    <Heart size={16} />
                  </button>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Carts;
