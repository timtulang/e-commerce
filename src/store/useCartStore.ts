import { create } from 'zustand';
import { type CartItem, type Product } from '../types';

interface CartState {
  items: CartItem[];
  addItem: (product: Product, selectedVariant: string, quantity: number) => void;
  removeItem: (productId: string, selectedVariant: string) => void;
  updateQuantity: (productId: string, selectedVariant: string, quantity: number) => void;
  clearCart: () => void;
  cartTotal: number;
  itemCount: number;
}

export const useCartStore = create<CartState>((set) => ({
  items: [],
  cartTotal: 0,
  itemCount: 0,

  addItem: (product, selectedVariant, quantity) => set((state) => {
    const existingItem = state.items.find(
      (item) => item.product.id === product.id && item.selectedVariant === selectedVariant
    );

    let newItems;
    if (existingItem) {
      newItems = state.items.map((item) =>
        item.product.id === product.id && item.selectedVariant === selectedVariant
          ? { ...item, quantity: item.quantity + quantity }
          : item
      );
    } else {
      newItems = [...state.items, { product, selectedVariant, quantity }];
    }

    return {
      items: newItems,
      ...calculateTotals(newItems),
    };
  }),

  removeItem: (productId, selectedVariant) => set((state) => {
    const newItems = state.items.filter(
      (item) => !(item.product.id === productId && item.selectedVariant === selectedVariant)
    );
    return {
      items: newItems,
      ...calculateTotals(newItems),
    };
  }),

  updateQuantity: (productId, selectedVariant, quantity) => set((state) => {
    const newItems = state.items.map((item) =>
      item.product.id === productId && item.selectedVariant === selectedVariant
        ? { ...item, quantity: Math.max(1, quantity) }
        : item
    );
    return {
      items: newItems,
      ...calculateTotals(newItems),
    };
  }),

  clearCart: () => set({ items: [], cartTotal: 0, itemCount: 0 }),
}));

// Helper function to keep totals in sync
const calculateTotals = (items: CartItem[]) => {
  const cartTotal = items.reduce((total, item) => total + item.product.price * item.quantity, 0);
  const itemCount = items.reduce((count, item) => count + item.quantity, 0);
  return { cartTotal, itemCount };
};