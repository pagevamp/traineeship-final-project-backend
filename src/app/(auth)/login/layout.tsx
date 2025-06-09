"use client";

import ImageSlider from "@/features/login/components/Slider";
import React from "react";

const Layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="min-h-screen bg-white px-4 py-6 md:px-10 md:py-10 xl:px-[49px] xl:py-[55px] 2xl:px-[80px] 2xl:py-[60px]">
      <div className="bg-white rounded-[20px] min-h-screen flex max-w-screen-2xl mx-auto shadow-md">
        <div
          className="hidden lg:block"
          style={{
            width: "610px",
            height: "calc(100vh - 110px)",
            flexShrink: 0,
          }}
        >
          <ImageSlider />
        </div>

        <div
          className="flex-1 flex items-center justify-center p-4 sm:p-6 md:p-8 xl:px-10 xl:pb-10"
          style={{ paddingTop: "65px" }} // override padding-top for large screens
        >
          {children}
        </div>
      </div>
    </div>
  );
};

export default Layout;
