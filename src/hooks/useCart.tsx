import { useEffect, useState } from "react";
import { useCartStore } from "@/lib/cart-store";

export const useCart = () => {
  const [isMounted, setIsMounted] = useState(false);

  // Always call the hook - never conditionally
  const store = useCartStore();
  const hasHydrated = useCartStore((state) => state._hasHydrated);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  // Return safe defaults during SSR and before mounting
  if (!isMounted || !hasHydrated) {
    return {
      items: [],
      _hasHydrated: false,
      selectedItems: new Set(),
      isLoading: true,
      addToCart: () => {},
      removeFromCart: () => {},
      clearCart: () => {},
      updateQuantity: () => {},
      toggleItemSelection: () => {},
      toggleAllSelection: () => {},
      selectAllItems: () => {},
      deselectAllItems: () => {},
      getTotalItems: () => 0,
      getTotalPrice: () => 0,
      getSelectedItems: () => [],
      getSelectedTotalItems: () => 0,
      getSelectedTotalPrice: () => 0,
      getGroupedItems: () => ({}),
      isItemSelected: () => false,
      isAllSelected: () => false,
      clearSelectedItems: () => {},
      getGroupedSelectedItems: () => {},
    };
  }

  return {
    ...store,
    _hasHydrated: true,
  };
};
