import { create } from "zustand";
import { persist } from "zustand/middleware";
import { generateVariationKey } from "./utils";

export const useCartStore = create<any>()(
  persist(
    (set, get) => ({
      items: [],

      addToCart: (product: any, selectedVariation: any, quantity: number) => {
        if (!selectedVariation || quantity <= 0) return;
        const variationKey = generateVariationKey(
          product.id,
          selectedVariation
        );

        set((state: any) => {
          const existingItemIndex = state.items.findIndex(
            (item: any) => item.variationKey === variationKey
          );

          if (existingItemIndex >= 0) {
            // Item with same variation exists, update quantity
            const updatedItems = [...state.items];
            updatedItems[existingItemIndex].quantity = quantity;
            return { items: updatedItems };
          } else {
            // New item, add to cart
            const newItem: any = {
              product,
              selectedVariation,
              quantity,
              variationKey,
            };
            return { items: [...state.items, newItem] };
          }
        });
      },

      removeFromCart: (productId: string, variationKey: string) => {
        set((state: any) => ({
          items: state.items.filter(
            (item: any) => item.variationKey !== variationKey
          ),
        }));
      },

      clearCart: () => {
        set({ items: [] });
      },

      updateQuantity: (
        productId: string,
        variationKey: string,
        quantity: number
      ) => {
        if (quantity <= 0) {
          get().removeFromCart(productId, variationKey);
          return;
        }

        set((state: any) => ({
          items: state.items.map((item: any) =>
            item.variationKey === variationKey ? { ...item, quantity } : item
          ),
        }));
      },

      getTotalItems: () => {
        return get().items.reduce(
          (total: any, item: any) => total + (item?.quantity ?? 0),
          0
        );
      },

      getTotalPrice: () => {
        return get().items.reduce((total: any, item: any) => {
          const price =
            item?.selectedVariation?.price ?? item?.product?.basePrice ?? 0;
          return total + price * (item?.quantity ?? 0);
        }, 0);
      },

      getGroupedItems: () => {
        const items = get().items;
        return items.reduce((groups: any, item: any) => {
          const productId = item.product.id;
          if (!groups[productId]) {
            groups[productId] = [];
          }
          groups[productId].push(item);
          return groups;
        }, {} as Record<string, any[]>);
      },
    }),
    {
      name: "cart-storage",
      version: 2,
      partialize: (state) => ({ items: state.items }),
    }
  )
);
