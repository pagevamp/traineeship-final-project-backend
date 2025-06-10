"use client";

import ImageSlider from "@/features/login/components/Slider";
import React from "react";

const Layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="max-w-screen px-[20px] py-[20px] md:px-[30px] lg:px-[49px] lg:py-[55px]">
      <div className="bg-white rounded-[20px] min-h-screen grid grid-cols-1 lg:grid-cols-2">
        <div className="hidden lg:block w-full h-full">
          <div className="w-[610px] lg:w-[610px] xl:w-[700px] 2xl:w-[800px] h-screen">
            <ImageSlider />
          </div>
        </div>

        <div className="flex items-start justify-center mt-[5px] lg:mt-0 lg:items-center">
          {children}
        </div>
      </div>
    </div>
  );
};

export default Layout;
