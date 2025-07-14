"use client";
import { ChevronLeft } from "lucide-react";
import InventoryDescription from "./InventoryDescriptions";
import InventoryImages from "./InventoryImages";
import { useRouter } from "next/navigation";
import { useGetInventoryById } from "../hooks";
import { useMemo } from "react";

const InventoryDetails = ({ id }: { id: string }) => {
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
        <div className="flex items-center justify-start text-base">
          <ChevronLeft
            className="cursor-pointer"
            onClick={() => router.back()}
          />
          <span className="font-primary font-bold">Inventory Details</span>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 bg-[#ffffff] rounded-[25px] min-h-screen py-10 px-6 gap-6">
        <div className="col-span-1">
          <InventoryImages imagesList={imagesList} />
        </div>

        <div className="col-span-1 lg:col-span-2 ">
          <InventoryDescription productData={productData} />
        </div>
      </div>
    </div>
  );
};

export default InventoryDetails;
