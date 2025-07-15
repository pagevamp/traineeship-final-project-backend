"use client";
import { Button } from "@/components/ui/button";
import { useCartStore } from "@/lib/cart-store";
import { ShoppingCart } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { toast } from "sonner";
import VariationComponent from "./VariationComponent";

const ProductDescription = ({ productData }: { productData: any }) => {
  const [selectedVariations, setSelectedVariations] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  const router = useRouter();

  const addToCart = useCartStore((state) => state.addToCart);

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
      router.push("/orders/cart");
    } finally {
      setIsLoading(false);
    }
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
