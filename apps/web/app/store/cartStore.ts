import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import type { Product } from '@/types/product';

export interface CartItem extends Product {
  quantity: number;
}

interface CartStore {
  items: CartItem[];
  addItem: (product: Product, quantity?: number) => void;
  removeItem: (productId: string) => void;
  updateQuantity: (productId: string, quantity: number) => void;
  clearCart: () => void;
  getTotal: () => number;
}

export const useCartStore = create<CartStore>()(
  persist(
    (set, get) => ({
      items: [],
      
      addItem: (product: Product, quantity = 1) =>
        set((state) => {
          const existingItem = state.items.find(
            (item) => item.id === product.id
          );
          
          if (existingItem) {
            return {
              items: state.items.map((item) =>
                item.id === product.id
                  ? { ...item, quantity: item.quantity + quantity }
                  : item
              ),
            };
          }
          
          return {
            items: [...state.items, { ...product, quantity }],
          };
        }),
      
      removeItem: (productId: string) =>
        set((state) => ({
          items: state.items.filter((item) => item.id !== productId),
        })),
      
      updateQuantity: (productId: string, quantity: number) =>
        set((state) => ({
          items: state.items.map((item) =>
            item.id === productId ? { ...item, quantity } : item
          ),
        })),
      
      clearCart: () => set({ items: [] }),
      
      getTotal: () => {
        const { items } = get();
        return items.reduce((total, item) => total + item.price * item.quantity, 0);
      },
    }),
    {
      name: 'cart-storage',
    }
  )
);
