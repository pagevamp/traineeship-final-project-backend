"use client";

import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { formatPrice, getStockStatus } from "@/lib/utils";
import { Package } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

interface GroupedCartItemProps {
  productId: string;
  items: any[];
  showSelection?: boolean;
}

export default function CheckoutItems({
  productId,
  items,
  showSelection = false,
}: GroupedCartItemProps) {
  if (items.length === 0) return null;

  const product = items[0].product;
  const totalQuantity = items.reduce((sum, item) => sum + item.quantity, 0);
  const totalPrice = items.reduce(
    (sum, item) => sum + item.selectedVariation.price * item.quantity,
    0
  );

  return (
    <Card className="mb-4 font-secondary rounded-xl">
      <CardHeader className="pb-4">
        <div className="flex items-start space-x-4">
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
            <div className="text-xl font-bold text-gray-900">
              {formatPrice(totalPrice)}
            </div>
            <div className="text-sm text-gray-500">
              {totalQuantity} {totalQuantity === 1 ? "item" : "items"} total
            </div>
          </div>
        </div>
      </CardHeader>

      <CardContent className="pt-0 px-4 pb-4">
        <div className="space-y-2">
          {items.map((item) => {
            const stockStatus = getStockStatus(item.selectedVariation.inStock);

            return (
              <div
                key={item.variationKey}
                className="flex items-center space-x-4 p-2 bg-gray-50 rounded-lg border"
              >
                {/* Variation Details */}
                <div className="flex-1">
                  <div className="flex items-center space-x-3">
                    <span className="font-medium text-gray-900 text-sm">
                      Variation: {item.selectedVariation.productSizeName}
                    </span>
                  </div>
                  <div className="text-base font-bold text-primary mt-1">
                    {formatPrice(item.selectedVariation.price)}
                  </div>
                </div>

                {/* Subtotal */}
                <div className="text-right min-w-[80px]">
                  <div className="font-bold">
                    {formatPrice(item.selectedVariation.price * item.quantity)}
                  </div>
                  <div className="text-xs text-gray-500">
                    Quantity: {item.quantity}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </CardContent>
    </Card>
  );
}
