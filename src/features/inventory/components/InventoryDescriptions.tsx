"use client";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";

const InventoryDescriptions = ({ productData }: { productData: any }) => {
  return (
    <div className="grid grid-cols-1 gap-3">
      <h1 className="font-primary text-lg font-bold ">
        {productData?.commodityName || "N/A"}
      </h1>

      <span className="font-primary text-base font-bold">
        Short Description
      </span>
      <hr className="flex-grow w-full h-[0px] border-b border-gray-300 " />

      <div
        dangerouslySetInnerHTML={{ __html: productData?.shortDescription }}
        className="prose max-w-none [&_strong]:text-[#121212] break-words text-editor [&_ul]:pl-5 [&_ol]:pl-5 font-extralight font-secondary text-muted-foreground"
      />

      <div className="mt-6">
        <h2 className="font-bold text-base mb-4 font-primary">
          Available Variations
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-4 font-secondary">
          {productData?.productVariations?.map((variation: any) => (
            <Card
              key={variation.id}
              className="shadow-sm hover:shadow-md transition-shadow duration-200 rounded-xl"
            >
              <CardHeader className="pb-2 px-3 pt-2 ">
                <CardTitle className="text-base font-semibold">
                  {variation?.productSizeName}
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-1 px-3 pb-3">
                <div className="flex items-center justify-between">
                  <Label className="text-xs">Price:</Label>
                  <span className="text-base font-semibold text-orange-600">
                    ${variation?.price.toFixed(2)}
                  </span>
                </div>
                <div className="flex items-center justify-between">
                  <Label className="text-xs">Stock:</Label>
                  <Badge
                    variant={variation?.inStock > 0 ? "default" : "destructive"}
                  >
                    {variation?.inStock > 0
                      ? `${variation?.inStock} In Stock`
                      : "Out of Stock"}
                  </Badge>
                </div>
                <div className="flex items-center justify-between">
                  <Label className="text-xs">Reorder Point:</Label>
                  <Badge
                    variant={
                      variation?.inStock <= variation?.reOrderPoint
                        ? "destructive"
                        : "secondary"
                    }
                    className="text-white"
                  >
                    {variation?.reOrderPoint}
                  </Badge>
                </div>
                <div className="text-[0.5rem] text-muted-foreground pt-2 border-t border-gray-100 mt-2">
                  <Label className="font-medium text-[0.5rem]">ID:</Label>{" "}
                  {variation?.id}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>

      <span className="font-primary text-base font-bold">Long Description</span>
      <hr className="flex-grow w-full h-[0px] border-b border-gray-300 " />

      <div
        dangerouslySetInnerHTML={{ __html: productData?.longDescription }}
        className="prose max-w-none [&_strong]:text-[#121212] break-words text-editor [&_ul]:pl-5 [&_ol]:pl-5 font-extralight font-secondary text-muted-foreground"
      />
    </div>
  );
};

export default InventoryDescriptions;
