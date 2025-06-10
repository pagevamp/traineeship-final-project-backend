import React from "react";

const Layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="h-screen md:bg-transparent lg:bg-[#F9F2FF] lg:px-[18px] lg:py-[18px] md:py-[0px]">
      <div className="bg-[#ffffff]  rounded-[20px] h-screen">{children}</div>
    </div>
  );
};

export default Layout;
