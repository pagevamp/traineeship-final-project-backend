"use client";
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Controller } from "react-hook-form";
import { Selectbox } from "@/components/ui/select-box";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import VariationComponent from "./VariationComponent";
import { ShoppingCart } from "lucide-react";
import { useCartStore } from "@/lib/cart-store";
import { toast } from "sonner";

const ProductDescription = ({ productData }: { productData: any }) => {
  const [selectedVariations, setSelectedVariations] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [count, setCount] = useState(0);

  const addToCart = useCartStore((state) => state.addToCart);

  const variations = [
    {
      id: "0197f31a-a04a-7435-9b05-dcdb6bc5277f",
      productSizeName: "Small",
      price: 22.0,
      inStock: 16,
      reOrderPoint: 20,
    },
    {
      id: "0197f31a-a04a-7435-9b05-dcdb6bc52780",
      productSizeName: "Medium",
      price: 25.0,
      inStock: 80,
      reOrderPoint: 20,
    },
    {
      id: "0197f31a-a04a-7435-9b05-dcdb6bc52781",
      productSizeName: "Large",
      price: 28.0,
      inStock: 50,
      reOrderPoint: 20,
    },
  ];

  const handleAddToCart = async () => {
    if (selectedVariations.length === 0) {
      toast.info("Please select at least one variation");
      return;
    }

    setIsLoading(true);
    try {
      // Add each selected variation to cart
      for (const selectedVar of selectedVariations) {
        addToCart(productData, selectedVar.variation, selectedVar.quantity);
      }
      // Reset selections after adding to cart
      setSelectedVariations([]);

      // Show success message
      const totalItems = selectedVariations.reduce(
        (sum, sv) => sum + sv.quantity,
        0
      );
      toast.success(`Successfully added ${totalItems} items to cart!`);
    } finally {
      setIsLoading(false);
    }
  };

  const getTotalSelectedItems = () => {
    return selectedVariations.reduce((acc, curr) => acc + curr.quantity, 0);
  };

  return (
    <div className="grid grid-cols-1 gap-6">
      <h1 className="font-primary text-lg font-bold ">
        {productData?.commodityName || "N/A"}
      </h1>

      <div>
        <span className="font-primary text-base font-bold">
          Short Description
        </span>
        <hr className="flex-grow w-full h-[0px] border-b border-gray-300 " />

        <div
          dangerouslySetInnerHTML={{ __html: productData?.shortDescription }}
          className="prose max-w-none [&_strong]:text-[#121212] break-words text-editor [&_ul]:pl-5 [&_ol]:pl-5 font-extralight font-secondary text-muted-foreground"
        />
      </div>

      <VariationComponent
        variations={productData?.productVariations}
        selectedVariations={selectedVariations}
        onVariationChange={setSelectedVariations}
      />

      {/* Add to Cart Button */}
      <Button
        onClick={handleAddToCart}
        disabled={isLoading || selectedVariations.length === 0}
        className="w-fit px-4 py-2 rounded-3xl bg-primary text-sm font-medium transition-all duration-300 transform hover:scale-105"
      >
        <ShoppingCart className="w-5 h-5 mr-1" />
        {isLoading ? "Adding to Cart..." : `Add to Cart`}
      </Button>

      <div>
        <span className="font-primary text-base font-bold">
          Long Description
        </span>
        <hr className="flex-grow w-full h-[0px] border-b border-gray-300 " />

        <div
          dangerouslySetInnerHTML={{ __html: productData?.longDescription }}
          className="prose max-w-none [&_strong]:text-[#121212] break-words text-editor [&_ul]:pl-5 [&_ol]:pl-5 font-extralight font-secondary text-muted-foreground"
        />
      </div>
    </div>
  );
};

export default ProductDescription;
