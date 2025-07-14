"use client";
import { Selectbox } from "@/components/ui/select-box";
import InventoryImages from "@/features/inventory/components/InventoryImages";
import { useGetInventoryById } from "@/features/inventory/hooks";
import { ChevronLeft } from "lucide-react";
import { useRouter } from "next/navigation";
import { useMemo } from "react";
import { Controller, useForm } from "react-hook-form";
import ProductDescription from "./ProductDescriptions";

const ProductId = ({ id }: { id: string }) => {
  const { control } = useForm();
  const router = useRouter();
  const { data: inventoryDetails, isLoading: isLoadingInventoryDetails } =
    useGetInventoryById({ id });

  const productData = useMemo(
    () => inventoryDetails?.data?.data,
    [inventoryDetails]
  );

  const imagesList = useMemo(() => {
    const coverImages =
      productData?.coverImageList && productData?.coverImageList?.length > 0
        ? productData?.coverImageList?.map((image: any) => image.documentUrl)
        : [];

    const productImage = productData?.productImageUrl;
    return [...coverImages, productImage];
  }, [productData]);

  if (isLoadingInventoryDetails) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <div className="flex justify-between mb-2 w-full ">
        <div className="flex items-center justify-start text-[16px]">
          <ChevronLeft
            className="cursor-pointer"
            onClick={() => router.back()}
          />
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
          <InventoryImages imagesList={imagesList} />
        </div>

        <div className="col-span-1 lg:col-span-2 ">
          <ProductDescription productData={productData} />
        </div>
      </div>
    </div>
  );
};

export default ProductId;
