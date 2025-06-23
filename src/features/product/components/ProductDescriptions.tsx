"use client";
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Controller } from "react-hook-form";
import { Selectbox } from "@/components/ui/select-box";

const ProductDescriptions = () => {
  const [count, setCount] = useState(0);
  return (
    <div className="grid grid-cols-1 gap-3">
      <h1 className="font-primary text-[18px] font-bold ">Pink Hoodie</h1>

      <span className="font-primary text-[16px] font-bold">
        Short Description
      </span>
      <hr className="flex-grow w-full h-[0px] border-b border-gray-300 " />
      <span className="font-extralight font-secondary text-muted-foreground">
        Stay cozy and stylish in our ultra-soft pink hoodie — the perfect blend
        of comfort, charm, and casual flair.
      </span>

      <div className="flex flex-col items-center lg:items-start ">
        <div className="flex space-x-0">
          <button
            onClick={() => setCount(count - 1)}
            className="bg-muted-light text-white px-4 py-2 rounded-l-lg hover:bg-orange-600 transition"
          >
            -
          </button>
          <button
            onClick={() => setCount(0)}
            className="bg-black text-white px-4 py-2  hover:bg-gray-500 transition"
          >
            {count <= 0 ? 0 : count}
          </button>
          <button
            onClick={() => setCount(count + 1)}
            className="bg-muted-light text-white px-4 py-2 rounded-r-lg hover:bg-orange-600 transition"
          >
            +
          </button>
        </div>

        <span className="font-normal items-center text-[16px] m-2">6 * 6</span>
        <div className="flex flex-col justify-center border border-muted-light max-w-[200px] rounded-md p-4 text-[14px]">
          <span>
            Stock: <span className="text-[#FF811A] font-extralight">100</span>
          </span>
          <span>
            Size: <span>6*6</span>
          </span>
          <span>
            Price:{" "}
            <span className="text-[#FF811A] font-extralight ">$500.00</span>
          </span>
        </div>

        <div className="flex justify-start">
          <Button className=" bg-linear-to-b from-[#CF5406] to-[#FF811A] rounded-[20px] font-light text-white mt-2 w-[150px] hover:bg-[#CF5406] p-6">
            Order
          </Button>
        </div>
      </div>

      <span className="font-primary text-[16px] font-bold">
        Long Description
      </span>
      <hr className="flex-grow w-full h-[0px] border-b border-gray-300 " />
      <span className="font-extralight font-secondary text-muted-foreground">
        Wrap yourself in warmth and confidence with our beautifully crafted pink
        hoodie — your new favorite go-to for laid-back days and cozy evenings.
        Designed with a flattering unisex fit and made from a premium
        cotton-blend fleece, this hoodie features a soft brushed interior,
        adjustable drawstring hood, and a spacious kangaroo pocket to keep your
        hands warm or essentials close.
      </span>
    </div>
  );
};

export default ProductDescriptions;
