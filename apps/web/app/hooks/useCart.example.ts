import { useCallback, useState, useEffect } from 'react';
import { useCartStore } from '@/store/cartStore';
import type { Product } from '@/types/product';

export const useCart = () => {
  const {
    items,
    addItem,
    removeItem,
    updateQuantity,
    clearCart,
    getTotal,
  } = useCartStore();

  const [isOpen, setIsOpen] = useState(false);
  const [total, setTotal] = useState(0);

  // Calculate total whenever items change
  useEffect(() => {
    setTotal(getTotal());
  }, [items, getTotal]);

  const handleAddToCart = useCallback(
    (product: Product, quantity = 1) => {
      addItem(product, quantity);
    },
    [addItem]
  );

  const handleRemoveFromCart = useCallback(
    (productId: string) => {
      removeItem(productId);
    },
    [removeItem]
  );

  const handleUpdateQuantity = useCallback(
    (productId: string, quantity: number) => {
      if (quantity <= 0) {
        removeItem(productId);
      } else {
        updateQuantity(productId, quantity);
      }
    },
    [updateQuantity, removeItem]
  );

  return {
    items,
    total,
    itemCount: items.length,
    isOpen,
    setIsOpen,
    addToCart: handleAddToCart,
    removeFromCart: handleRemoveFromCart,
    updateQuantity: handleUpdateQuantity,
    clearCart,
  };
};
