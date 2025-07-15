"use client";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardTitle, CardHeader } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  cn,
  formatPrice,
  getReorderPointColor,
  getStockStatus,
} from "@/lib/utils";
import { Check, Minus, Plus, X } from "lucide-react";

export default function VariationComponent({
  variations,
  selectedVariations,
  onVariationChange,
}: any) {
  const handleVariationToggle = (variation: any) => {
    const existingIndex = selectedVariations.findIndex(
      (sv: any) => sv.variation.id === variation.id
    );

    if (existingIndex >= 0) {
      // Remove variation
      const updated = selectedVariations.filter(
        (sv: any) => sv.variation.id !== variation.id
      );
      onVariationChange(updated);
    } else {
      // Add variation with quantity 1
      const updated = [...selectedVariations, { variation, quantity: 1 }];
      onVariationChange(updated);
    }
  };
  const handleQuantityChange = (variationId: string, quantity: number) => {
    const variation = variations.find((v: any) => v.id === variationId);
    if (!variation) return;

    const maxQuantity = variation.inStock;
    const finalQuantity = Math.min(Math.max(quantity, 0), maxQuantity);

    const existingIndex = selectedVariations.findIndex(
      (sv: any) => sv.variation.id === variationId
    );

    if (finalQuantity <= 0) {
      // If quantity is 0, remove from selected
      if (existingIndex >= 0) {
        const updated = selectedVariations.filter(
          (sv: any) => sv.variation.id !== variationId
        );
        onVariationChange(updated);
      }
    } else {
      // If not selected yet, add it
      if (existingIndex === -1) {
        const updated = [
          ...selectedVariations,
          { variation, quantity: finalQuantity },
        ];
        onVariationChange(updated);
      } else {
        // Update quantity
        const updated = selectedVariations.map((sv: any) =>
          sv.variation.id === variationId
            ? { ...sv, quantity: finalQuantity }
            : sv
        );
        onVariationChange(updated);
      }
    }
  };

  const getSelectedQuantity = (variationId: string) => {
    const selected = selectedVariations.find(
      (sv: any) => sv.variation.id === variationId
    );
    return selected ? selected.quantity : 0;
  };

  const isSelected = (variationId: string) => {
    return selectedVariations.some(
      (sv: any) => sv.variation.id === variationId
    );
  };

  return (
    <div className="space-y-4">
      <h2 className="font-bold text-base mb-4 font-primary">
        Available Variations
      </h2>

      <div className="grid grid-cols-1 md:grid-cols-2 2xl:grid-cols-3 gap-4">
        {variations.map((variation: any) => {
          const stockStatus = getStockStatus(variation.inStock);
          const reorderColor = getReorderPointColor(
            variation.inStock,
            variation.reOrderPoint
          );
          const selected = isSelected(variation.id);
          const selectedQuantity = getSelectedQuantity(variation.id);
          const isOutOfStock = variation.inStock === 0;

          return (
            <Card
              key={variation.id}
              className={`relative transition-all duration-300 hover:shadow-lg rounded-xl ${
                selected
                  ? "ring-1 ring-primary border-primary"
                  : isOutOfStock
                  ? "opacity-60"
                  : "hover:border-gray-300"
              }`}
            >
              {selected && (
                <div
                  className="absolute -top-1 -right-1 w-5 h-5 bg-primary rounded-full flex items-center justify-center shadow-md cursor-pointer "
                  onClick={() => handleVariationToggle(variation)}
                  title="Remove Selection"
                >
                  <X className="w-3 h-3 text-white" />
                </div>
              )}

              {/* Out of Stock Overlay */}
              {isOutOfStock && (
                <div className="absolute inset-0 bg-gray-100/80 flex items-center justify-center rounded-3xl">
                  <span className="text-gray-600 font-semibold">
                    Out of Stock
                  </span>
                </div>
              )}
              <CardHeader className="pb-2 px-3 pt-2 ">
                <CardTitle className="text-lg font-bold break-all break-words">
                  {variation?.productSizeName}
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3 px-3 pb-3">
                {/* Selection Indicator */}

                <div className="space-y-2">
                  {/* Price */}
                  <div className="flex items-center justify-between">
                    <Label className="text-xs">Price:</Label>
                    <span className="text-base font-semibold text-orange-600">
                      ${variation?.price.toFixed(2)}
                    </span>
                  </div>

                  {/* Stock Status */}
                  <div className="flex items-center justify-between ">
                    <Label className="text-xs">Stock:</Label>
                    <Badge
                      variant={
                        variation?.inStock > 0 ? "default" : "destructive"
                      }
                    >
                      {variation?.inStock > 0
                        ? `${variation?.inStock} In Stock`
                        : "Out of Stock"}
                    </Badge>
                  </div>
                </div>

                {/* Selection Button */}
                {/* <div className="mb-4">
                  <Button
                    onClick={() => handleVariationToggle(variation)}
                    disabled={isOutOfStock}
                    variant={selected ? "default" : "outline"}
                    className={cn(
                      "w-full rounded-3xl",
                      selected && "bg-primary text-white",
                      !selected &&
                        " border-primary border bg-white text-primary"
                    )}
                  >
                    {selected
                      ? "Selected"
                      : isOutOfStock
                      ? "Out of Stock"
                      : "Select"}
                  </Button>
                </div> */}

                {/* Quantity Controls - Only show if selected */}
                <div className="space-y-1">
                  <Label className="text-xs">Quantity:</Label>

                  <div className="w-full flex items-center space-x-2">
                    <Button
                      variant="outline"
                      size="icon"
                      onClick={() =>
                        handleQuantityChange(variation.id, selectedQuantity - 1)
                      }
                      disabled={selectedQuantity == 0}
                      className="h-8 w-8"
                    >
                      <Minus className="w-3 h-3" />
                    </Button>

                    <input
                      id={`quantity-${variation.id}`}
                      type="number"
                      value={selectedQuantity}
                      onChange={(e) =>
                        handleQuantityChange(
                          variation.id,
                          Number.parseInt(e.target.value) || 0
                        )
                      }
                      className="w-full text-center h-8 flex-1 border outline-none ring-0 rounded-lg text-sm"
                      min="1"
                      max={variation.inStock}
                    />

                    <Button
                      variant="outline"
                      size="icon"
                      onClick={() =>
                        handleQuantityChange(variation.id, selectedQuantity + 1)
                      }
                      disabled={selectedQuantity >= variation.inStock}
                      className="h-8 w-8"
                    >
                      <Plus className="w-3 h-3" />
                    </Button>
                  </div>
                </div>

                <div className="text-[0.5rem] text-muted-foreground pt-2 border-t border-gray-100 mt-2">
                  <Label className="font-medium text-[0.5rem]">ID:</Label>{" "}
                  {variation?.id}
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>
    </div>
  );
}
