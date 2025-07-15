import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";
import { generateVariationKey } from "./utils";

interface CartItem {
  product: any;
  selectedVariation: any;
  quantity: number;
  variationKey: string;
}

interface CartStore {
  items: CartItem[];
  selectedItems: Set<string>;
  _hasHydrated: boolean;
  setHasHydrated: (state: boolean) => void;
  addToCart: (product: any, selectedVariation: any, quantity: number) => void;
  removeFromCart: (productId: string, variationKey: string) => void;
  clearSelectedItems: any;
  clearCart: () => void;
  updateQuantity: (
    productId: string,
    variationKey: string,
    quantity: number
  ) => void;
  toggleItemSelection: (variationKey: string) => void;
  toggleAllSelection: () => void;
  selectAllItems: () => void;
  deselectAllItems: () => void;
  getTotalItems: () => number;
  getTotalPrice: () => number;
  getSelectedItems: () => CartItem[];
  getSelectedTotalItems: () => number;
  getSelectedTotalPrice: () => number;
  getGroupedItems: () => Record<string, CartItem[]>;
  getGroupedSelectedItems: () => Record<string, CartItem[]>;
  isItemSelected: (variationKey: string) => boolean;
  isAllSelected: () => boolean;
}

export const useCartStore = create<CartStore>()(
  persist(
    (set, get) => ({
      items: [],
      selectedItems: new Set(),
      _hasHydrated: false,

      setHasHydrated: (state: boolean) => {
        set({ _hasHydrated: state });
      },

      addToCart: (product: any, selectedVariation: any, quantity: number) => {
        if (!selectedVariation || quantity <= 0) return;
        const variationKey = generateVariationKey(
          product.id,
          selectedVariation
        );

        set((state) => {
          const existingItemIndex = state.items.findIndex(
            (item) => item.variationKey === variationKey
          );

          if (existingItemIndex >= 0) {
            const updatedItems = [...state.items];
            updatedItems[existingItemIndex].quantity = quantity;
            return { items: updatedItems };
          } else {
            const newItem: CartItem = {
              product,
              selectedVariation,
              quantity,
              variationKey,
            };
            const newSelectedItems = new Set(state.selectedItems);
            newSelectedItems.add(variationKey);
            return {
              items: [...state.items, newItem],
              selectedItems: newSelectedItems,
            };
          }
        });
      },

      removeFromCart: (productId: string, variationKey: string) => {
        set((state) => {
          const newSelectedItems = new Set(state.selectedItems);
          newSelectedItems.delete(variationKey);
          return {
            items: state.items.filter(
              (item) => item.variationKey !== variationKey
            ),
            selectedItems: newSelectedItems,
          };
        });
      },

      clearCart: () => {
        set({ items: [], selectedItems: new Set() });
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

        set((state) => ({
          items: state.items.map((item) =>
            item.variationKey === variationKey ? { ...item, quantity } : item
          ),
        }));
      },

      toggleItemSelection: (variationKey: string) => {
        set((state) => {
          const newSelectedItems = new Set(state.selectedItems);
          if (newSelectedItems.has(variationKey)) {
            newSelectedItems.delete(variationKey);
          } else {
            newSelectedItems.add(variationKey);
          }
          return { selectedItems: newSelectedItems };
        });
      },

      toggleAllSelection: () => {
        set((state) => {
          const allVariationKeys = state.items.map((item) => item.variationKey);
          const allSelected = allVariationKeys.every((key) =>
            state.selectedItems.has(key)
          );

          if (allSelected) {
            return { selectedItems: new Set() };
          } else {
            return { selectedItems: new Set(allVariationKeys) };
          }
        });
      },

      selectAllItems: () => {
        set((state) => {
          const allVariationKeys = state.items.map((item) => item.variationKey);
          return { selectedItems: new Set(allVariationKeys) };
        });
      },

      deselectAllItems: () => {
        set({ selectedItems: new Set() });
      },
      clearSelectedItems: () => {
        set((state) => ({
          items: state.items.filter(
            (item) => !state.selectedItems.has(item.variationKey)
          ),
          selectedItems: new Set(),
        }));
      },
      getTotalItems: () => {
        return get().items.reduce(
          (total, item) => total + (item?.quantity ?? 0),
          0
        );
      },

      getTotalPrice: () => {
        return get().items.reduce((total, item) => {
          const price =
            item?.selectedVariation?.price ?? item?.product?.basePrice ?? 0;
          return total + price * (item?.quantity ?? 0);
        }, 0);
      },

      getSelectedItems: () => {
        const state = get();
        return state.items.filter((item) =>
          state.selectedItems?.has(item.variationKey)
        );
      },

      getSelectedTotalItems: () => {
        const selectedItems = get().getSelectedItems();
        return selectedItems.reduce(
          (total, item) => total + (item?.quantity ?? 0),
          0
        );
      },

      getSelectedTotalPrice: () => {
        const selectedItems = get().getSelectedItems();
        return selectedItems.reduce((total, item) => {
          const price =
            item?.selectedVariation?.price ?? item?.product?.basePrice ?? 0;
          return total + price * (item?.quantity ?? 0);
        }, 0);
      },

      getGroupedItems: () => {
        const items = get().items;
        return items.reduce((groups, item) => {
          const productId = item.product.id;
          if (!groups[productId]) {
            groups[productId] = [];
          }
          groups[productId].push(item);
          return groups;
        }, {} as Record<string, CartItem[]>);
      },
      getGroupedSelectedItems: () => {
        const selectedItems = get().getSelectedItems();
        return selectedItems.reduce((groups, item) => {
          const productId = item.product.id;
          if (!groups[productId]) {
            groups[productId] = [];
          }
          groups[productId].push(item);
          return groups;
        }, {} as Record<string, CartItem[]>);
      },

      isItemSelected: (variationKey: string) => {
        return get().selectedItems.has(variationKey);
      },

      isAllSelected: () => {
        const state = get();
        if (state.items.length === 0) return false;
        return state.items.every((item) =>
          state.selectedItems?.has(item.variationKey)
        );
      },
    }),
    {
      name: "cart-storage",
      version: 2,
      storage: createJSONStorage(() =>
        typeof window !== "undefined"
          ? localStorage
          : {
              getItem: () => null,
              setItem: () => {},
              removeItem: () => {},
            }
      ),
      partialize: (state) => ({
        items: state.items,
        selectedItems: Array.from(state.selectedItems),
      }),

      onRehydrateStorage: () => (state) => {
        if (state && Array.isArray((state as any).selectedItems)) {
          (state as any).selectedItems = new Set((state as any).selectedItems);
        }
        state?.setHasHydrated(true);
      },
    }
  )
);
