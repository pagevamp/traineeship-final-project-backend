"use client";
import { Controller, useForm } from "react-hook-form";
import ProductDescriptions from "./ProductDescriptions";
import ProductImages from "./ProductImgaes";
import { Selectbox } from "@/components/ui/select-box";
import { ChevronLeft } from "lucide-react";

const ProductId = ({ control }: { control: any }) => {
  return (
    <div>
      <div className="flex justify-between mb-1 w-full ">
        <div className="flex items-center justify-start text-[16px]">
          <ChevronLeft />
          <span className="font-primary font-bold">Product Details</span>
        </div>

        <div className="mr-0">
          <Controller
            name="contactType"
            control={control}
            render={({ field }) => (
              <Selectbox
                options={[
                  { label: "Stuti Upreti", value: "Stuti Upreti" },
                  { label: "Suchi Gurung", value: "Suchi Gurung" },
                  { label: "Binayak Chhettri", value: "Binayak Chhettri" },
                ]}
                value={field.value || ""}
                onChange={(selected) => field.onChange(selected.value)}
                placeholder="Select A Customer"
                emptyText="No data found."
                className="min-w-[200px] lg:min-w-[300px] bg-white h-12 p-4 border border-orange-400"
              />
            )}
          />
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 bg-[#ffffff] rounded-[25px] min-h-screen py-10 px-6 gap-6">
        <div className="col-span-1">
          <ProductImages />
        </div>

        <div className="col-span-1 lg:col-span-2 ">
          <ProductDescriptions />
        </div>
      </div>
    </div>
  );
};

export default ProductId;
