import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

// Generate unique key for product + variation combination
export function generateVariationKey(
  productId: string,
  variation: any
): string {
  return `${productId}-${variation.id}`;
}

// Format price to currency
export function formatPrice(price: number): string {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
  }).format(price);
}

// Get stock status color and text
export function getStockStatus(inStock: number) {
  if (inStock === 0) {
    return { color: "bg-red-500", text: "Out of Stock" };
  } else if (inStock <= 5) {
    return { color: "bg-orange-500", text: `${inStock} In Stock` };
  } else {
    return { color: "bg-green-500", text: `${inStock} In Stock` };
  }
}

// Get reorder point color based on stock level
export function getReorderPointColor(inStock: number, reOrderPoint: number) {
  if (inStock <= reOrderPoint) {
    return "bg-red-500";
  } else if (inStock <= reOrderPoint * 1.5) {
    return "bg-orange-500";
  } else {
    return "bg-green-500";
  }
}
