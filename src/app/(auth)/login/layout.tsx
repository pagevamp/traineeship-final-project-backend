"use client";
import ImageSlider from "@/features/login/components/Slider";
import React from "react";

const Layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="overflow-x-auto w-screen h-screen px-[20px] md:px-[30px] lg:px-[49px] py-1">
      <div className="bg-white rounded-[20px] lg:max-h-full grid grid-cols-1 lg:grid-cols-5 max-w-[1400px] mx-auto">
        <div className="hidden lg:block col-span-2 ">
          <ImageSlider />
        </div>
        <div className="col-span-3 flex justify-center items-center p-4">
          {children}
        </div>
      </div>
    </div>
  );
};

export default Layout;
