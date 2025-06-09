"use client";

import ImageSlider from "@/features/login/components/Slider";
import React from "react";

const Layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="min-h-screen max-w-screen bg-[#ffffff] px-[49px] py-[55px]">
      <div className="bg-white rounded-[20px] min-h-screen flex">
        <div
          className="hidden lg:block"
          style={{ width: "610px", height: "calc(100vh - 110px)" }}
        >
          <ImageSlider />
        </div>

        <div className="flex-1 flex items-center justify-center">
          {children}
        </div>
      </div>
    </div>
  );
};

export default Layout;
