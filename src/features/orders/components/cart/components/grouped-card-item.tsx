"use client";

import Image from "next/image";
import { useCartStore } from "@/lib/cart-store";
import { formatPrice, getStockStatus } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { Trash2, Minus, Plus, Package } from "lucide-react";
import Link from "next/link";

interface GroupedCartItemProps {
  productId: string;
  items: any[];
  showSelection?: boolean;
}

export default function GroupedCartItem({
  productId,
  items,
  showSelection = false,
}: GroupedCartItemProps) {
  const {
    updateQuantity,
    removeFromCart,
    toggleItemSelection,
    isItemSelected,
  } = useCartStore();

  if (items.length === 0) return null;

  const product = items[0].product;
  const totalQuantity = items.reduce((sum, item) => sum + item.quantity, 0);
  const totalPrice = items.reduce(
    (sum, item) => sum + item.selectedVariation.price * item.quantity,
    0
  );

  // Check if all items for this product are selected
  const allProductItemsSelected = items.every((item) =>
    isItemSelected(item.variationKey)
  );

  // Handle product-level selection toggle
  const handleProductSelectionToggle = () => {
    items.forEach((item) => {
      if (allProductItemsSelected) {
        // If all are selected, deselect all
        if (isItemSelected(item.variationKey)) {
          toggleItemSelection(item.variationKey);
        }
      } else {
        // If not all are selected, select all
        if (!isItemSelected(item.variationKey)) {
          toggleItemSelection(item.variationKey);
        }
      }
    });
  };

  const handleQuantityChange = (variationKey: string, newQuantity: number) => {
    const item = items.find((i) => i.variationKey === variationKey);
    if (!item) return;

    if (newQuantity < 1) return;
    if (newQuantity > item.selectedVariation.inStock) {
      alert(`Only ${item.selectedVariation.inStock} items available in stock`);
      return;
    }
    updateQuantity(product.id, variationKey, newQuantity);
  };

  const handleRemove = (variationKey: string) => {
    removeFromCart(product.id, variationKey);
  };

  return (
    <Card className="mb-6 font-secondary rounded-xl">
      <CardHeader className="pb-4">
        <div className="flex items-start space-x-4">
          {/* Product-level Selection Checkbox */}
          {showSelection && (
            <Checkbox
              checked={allProductItemsSelected}
              onCheckedChange={handleProductSelectionToggle}
              className="mt-1"
            />
          )}

          {/* Product Image */}
          <div className="relative w-20 h-20 flex-shrink-0">
            <Image
              src={product.productImageUrl || "/placeholder.svg"}
              alt={product.commodityName}
              fill
              className="object-cover rounded-md"
            />
          </div>

          {/* Product Info */}
          <div className="flex-1">
            <CardTitle className="text-lg font-semibold text-gray-900 mb-1 ">
              <Link
                href={`/products/${product.id}`}
                className="hover:text-primary hover:underline hover:underline-offset-2 transition-all duration-200"
              >
                {product.commodityName}
              </Link>
            </CardTitle>
            <div className="flex items-center space-x-4 text-sm text-gray-600">
              <div className="flex items-center space-x-1">
                <Package className="w-4 h-4" />
                <span>
                  {items.length} variation{items.length !== 1 ? "s" : ""}
                </span>
              </div>
              <span>
                Total: {totalQuantity} {totalQuantity === 1 ? "item" : "items"}
              </span>
            </div>
            {product.brand && (
              <Badge variant="outline" className="mt-2">
                {product.brand}
              </Badge>
            )}
          </div>

          {/* Total Price */}
          <div className="text-right">
            <div className="text-2xl font-bold text-gray-900">
              {formatPrice(totalPrice)}
            </div>
            <div className="text-sm text-gray-500">
              {totalQuantity} {totalQuantity === 1 ? "item" : "items"} total
            </div>
          </div>
        </div>
      </CardHeader>

      <CardContent className="pt-0">
        <div className="space-y-4">
          {items.map((item) => {
            const stockStatus = getStockStatus(item.selectedVariation.inStock);

            return (
              <div
                key={item.variationKey}
                className="flex items-center space-x-4 p-4 bg-gray-50 rounded-lg border"
              >
                {/* Individual Item Selection Checkbox */}
                {showSelection && (
                  <Checkbox
                    checked={isItemSelected(item.variationKey)}
                    onCheckedChange={() =>
                      toggleItemSelection(item.variationKey)
                    }
                  />
                )}

                {/* Variation Details */}
                <div className="flex-1">
                  <div className="flex items-center space-x-3">
                    <span className="font-medium text-gray-900">
                      Variation: {item.selectedVariation.productSizeName}
                    </span>
                    {/* <Badge
                      className={`${stockStatus.color} text-white text-xs`}
                    >
                      {stockStatus.text}
                    </Badge> */}
                    {isItemSelected(item.variationKey) && (
                      <Badge
                        variant="default"
                        className="bg-blue-500 text-white text-xs"
                      >
                        Selected
                      </Badge>
                    )}
                  </div>
                  <div className="text-lg font-bold text-primary mt-1">
                    {formatPrice(item.selectedVariation.price)}
                  </div>
                </div>

                {/* Quantity Controls */}
                <div className="flex items-center space-x-2">
                  <Button
                    variant="outline"
                    size="icon"
                    onClick={() =>
                      handleQuantityChange(item.variationKey, item.quantity - 1)
                    }
                    disabled={item.quantity <= 1}
                    className="h-8 w-8"
                  >
                    <Minus className="w-3 h-3" />
                  </Button>

                  <Input
                    type="number"
                    value={item.quantity}
                    onChange={(e) =>
                      handleQuantityChange(
                        item.variationKey,
                        Number.parseInt(e.target.value) || 1
                      )
                    }
                    className="w-16 text-center h-8"
                    min="1"
                    max={item.selectedVariation.inStock}
                  />

                  <Button
                    variant="outline"
                    size="icon"
                    onClick={() =>
                      handleQuantityChange(item.variationKey, item.quantity + 1)
                    }
                    disabled={item.quantity >= item.selectedVariation.inStock}
                    className="h-8 w-8"
                  >
                    <Plus className="w-3 h-3" />
                  </Button>
                </div>

                {/* Subtotal */}
                <div className="text-right min-w-[80px]">
                  <div className="font-bold">
                    {formatPrice(item.selectedVariation.price * item.quantity)}
                  </div>
                  <div className="text-xs text-gray-500">X {item.quantity}</div>
                </div>

                {/* Remove Button */}
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => handleRemove(item.variationKey)}
                  className="text-red-500 hover:text-red-700 hover:bg-red-50 h-8 w-8"
                >
                  <Trash2 className="w-4 h-4" />
                </Button>
              </div>
            );
          })}
        </div>
      </CardContent>
    </Card>
  );
}
