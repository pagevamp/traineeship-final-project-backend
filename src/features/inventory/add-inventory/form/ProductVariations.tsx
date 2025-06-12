"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { Plus, Trash2, Upload, BarChart3 } from "lucide-react";
import { cn } from "@/lib/utils";

interface ProductVariation {
  id: string;
  size: string;
  price: string;
  inStock: string;
  reorderPoint: string;
  uploadType: "manual" | "bulk";
}

export default function ProductVariations() {
  const [variations, setVariations] = useState<ProductVariation[]>([
    {
      id: "1",
      size: "",
      price: "",
      inStock: "",
      reorderPoint: "",
      uploadType: "manual",
    },
  ]);

  const addVariation = () => {
    const newVariation: ProductVariation = {
      id: Date.now().toString(),
      size: "",
      price: "",
      inStock: "",
      reorderPoint: "",
      uploadType: "manual",
    };
    setVariations([...variations, newVariation]);
  };

  const removeVariation = (id: string) => {
    if (variations.length > 1) {
      setVariations(variations.filter((v) => v.id !== id));
    }
  };

  const updateVariation = (
    id: string,
    field: keyof ProductVariation,
    value: string
  ) => {
    setVariations(
      variations.map((v) => (v.id === id ? { ...v, [field]: value } : v))
    );
  };

  return (
    <div className="w-full pt-4">
      <h2 className="text-base font-secondary font-semibold mb-2">
        Variations
      </h2>
      <div className="space-y-4">
        {/* Responsive Table */}
        <div className="overflow-x-auto">
          <div className="min-w-[800px]">
            <table className="w-full border-collapse rounded-lg overflow-hidden border">
              <thead>
                <tr className="bg-gray-50 border-b">
                  <th className="text-left p-4 font-medium text-sm text-gray-700 w-[15%]">
                    Size
                  </th>
                  <th className="text-left p-4 font-medium text-sm text-gray-700 w-[12%]">
                    Price
                  </th>
                  <th className="text-left p-4 font-medium text-sm text-gray-700 w-[12%]">
                    In Stock
                  </th>
                  <th className="text-left p-4 font-medium text-sm text-gray-700 w-[15%]">
                    Re-order Point
                  </th>
                  <th className="text-left p-4 font-medium text-sm text-gray-700 w-[25%]">
                    Upload Type
                  </th>
                  {/* <th className="text-left p-4 font-medium text-sm text-gray-700 w-[10%]">
                    Preview
                  </th> */}
                  <th className="text-left p-4 font-medium text-sm text-gray-700 w-[11%]">
                    Action
                  </th>
                </tr>
              </thead>
              <tbody>
                {variations.map((variation, index) => (
                  <tr
                    key={variation.id}
                    className={cn(
                      "border-b last:border-b-0 hover:bg-gray-50/50 transition-colors",
                      index % 2 === 0 ? "bg-white" : "bg-gray-50/30"
                    )}
                  >
                    <td className="p-3">
                      <Input
                        placeholder="Add product size"
                        value={variation.size}
                        onChange={(e) =>
                          updateVariation(variation.id, "size", e.target.value)
                        }
                        className="border-0 bg-transparent focus-visible:ring-1 focus-visible:ring-primary h-9"
                      />
                    </td>
                    <td className="p-3">
                      <div className="relative">
                        <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500 text-sm">
                          $
                        </span>
                        <Input
                          placeholder="0.00"
                          type="number"
                          step="0.01"
                          value={variation.price}
                          onChange={(e) =>
                            updateVariation(
                              variation.id,
                              "price",
                              e.target.value
                            )
                          }
                          className="border-0 bg-transparent focus-visible:ring-1 focus-visible:ring-primary h-9 pl-7"
                        />
                      </div>
                    </td>
                    <td className="p-3">
                      <Input
                        placeholder="0"
                        type="number"
                        value={variation.inStock}
                        onChange={(e) =>
                          updateVariation(
                            variation.id,
                            "inStock",
                            e.target.value
                          )
                        }
                        className="border-0 bg-transparent focus-visible:ring-1 focus-visible:ring-primary h-9"
                      />
                    </td>
                    <td className="p-3">
                      <Select
                        value={variation.reorderPoint}
                        onValueChange={(value) =>
                          updateVariation(variation.id, "reorderPoint", value)
                        }
                      >
                        <SelectTrigger className="border-0 bg-transparent focus:ring-1 focus:ring-primary h-9">
                          <SelectValue placeholder="Select..." />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="5">5 units</SelectItem>
                          <SelectItem value="10">10 units</SelectItem>
                          <SelectItem value="15">15 units</SelectItem>
                          <SelectItem value="20">20 units</SelectItem>
                          <SelectItem value="25">25 units</SelectItem>
                          <SelectItem value="50">50 units</SelectItem>
                          <SelectItem value="100">100 units</SelectItem>
                        </SelectContent>
                      </Select>
                    </td>
                    <td className="p-3">
                      <div className="flex gap-2 flex-wrap">
                        <Button
                          variant={
                            variation.uploadType === "manual"
                              ? "default"
                              : "outline"
                          }
                          size="sm"
                          onClick={() =>
                            updateVariation(
                              variation.id,
                              "uploadType",
                              "manual"
                            )
                          }
                          className={cn(
                            "flex items-center gap-1.5 h-8 px-3 text-xs font-medium",
                            variation.uploadType === "manual" &&
                              "hover:opacity-90 hover:bg-primary"
                          )}
                        >
                          <Upload className="h-3 w-3" />
                          Manual
                        </Button>
                        <Button
                          variant={
                            variation.uploadType === "bulk"
                              ? "default"
                              : "outline"
                          }
                          size="sm"
                          onClick={() =>
                            updateVariation(variation.id, "uploadType", "bulk")
                          }
                          className={cn(
                            "flex items-center gap-1.5 h-8  px-3 text-xs font-medium",
                            variation.uploadType === "bulk" &&
                              "hover:opacity-90 hover:bg-primary"
                          )}
                        >
                          <BarChart3 className="h-3 w-3" />
                          Bulk
                        </Button>
                      </div>
                    </td>
                    {/* <td className="p-3">
                      <Button
                        variant="ghost"
                        size="sm"
                        className="h-8 w-8 p-0 hover:bg-blue-50 hover:text-blue-600"
                      >
                        <Eye className="h-4 w-4" />
                        <span className="sr-only">Preview variation</span>
                      </Button>
                    </td> */}
                    <td className="p-3">
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => removeVariation(variation.id)}
                        disabled={variations.length === 1}
                        className="h-8 w-8 p-0 text-red-500 hover:text-red-700 hover:bg-red-50 disabled:opacity-50 disabled:cursor-not-allowed"
                      >
                        <Trash2 className="h-4 w-4" />
                        <span className="sr-only">Remove variation</span>
                      </Button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Add Button */}
        <div className="flex justify-start">
          <Button
            onClick={addVariation}
            variant="outline"
            className="border-2 border-dashed border-primary/30 text-primary hover:border-primary hover:bg-primary/5 transition-all duration-200 h-10 px-4"
          >
            <Plus className="h-4 w-4 mr-2" />
            Add Variation
          </Button>
        </div>

        {/* Summary */}
        {variations.length > 1 && (
          <div className="bg-gray-50 rounded-lg p-4 mt-4">
            <div className="flex items-center justify-between text-sm">
              <span className="text-gray-600 font-secondary font-medium">
                Total Variations:
              </span>
              <Badge variant="default">{variations.length}</Badge>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
