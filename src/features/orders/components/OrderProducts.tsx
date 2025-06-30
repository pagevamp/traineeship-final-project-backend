"use client";
import Image from "next/image";
import React, { useState } from "react";

import { Button } from "@/components/ui/button";
import { images } from "../constant";
import { productDetails } from "../constant/index";

const OrderProducts = () => {
  const [selectedImage, setSelectedImage] = useState(images[0]);

  return (
    <div className="flex flex-col gap-2 sm:mx-4 ">
      <span className="font-secondary  text-start ">Product Details</span>
      <div className="bg-[#F9F3FF] rounded-[5px] p-4">
        <div className=" h-[300px] relative rounded overflow-hidden shadow-md mb-2">
          <Image
            src={selectedImage}
            alt="Selected"
            layout="fill"
            objectFit="contain"
            className="rounded-[5px]"
          />
        </div>

        <div className="flex gap-2">
          {images.map((img, index) => (
            <div
              key={index}
              className={`w-20 h-20 relative cursor-pointer border-2 rounded ${
                img === selectedImage
                  ? "border-[#FF6502]"
                  : "border-transparent"
              }`}
              onClick={() => setSelectedImage(img)}
            >
              <Image
                src={img}
                alt={`Thumbnail ${index + 1}`}
                layout="fill"
                objectFit="cover"
                className="rounded-[5px]"
              />
            </div>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-3 gap-2 my-7">
        <div>
          <div className="flex flex-col">
            <span className="font-secondary text-[16px] font-normal">
              A1-23412
            </span>
            <span className="font-normal font-secondary text-[16px] text-muted-light">
              Qty: 1
            </span>
          </div>
        </div>

        <hr className="flex-grow h-[50px] w-[0px] border-r border-gray-300" />

        <div className="w-full flex flex-col justify-normal">
          {productDetails.map((detail, index) => (
            <div key={index} className="flex flex-row items-start gap-2">
              <span className="font-secondary text-[16px] font-normal">
                {detail.label}{" "}
              </span>
              <span className="font-secondary text-[16px] font-light">
                {detail.value}
              </span>
            </div>
          ))}
        </div>
      </div>
      <div className="flex justify-center">
        <Button className=" bg-linear-to-b from-[#CF5406] to-[#FF811A] rounded-[10px] font-light text-white mt-2 w-fit hover:bg-[#CF5406]">
          Purchase Order
        </Button>
      </div>
    </div>
  );
};

export default OrderProducts;
