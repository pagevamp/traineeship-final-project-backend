import React from "react";

const Layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="min-h-screen md:bg-transparent lg:bg-[#F9F2FF] lg:px-0 md:py-[0px] lg:py-0">
      <div className="min-h-screen md:bg-transparent lg:bg-[#F9F2FF] lg:px-4 md:py-[0px] lg:py-4">
        <div className="bg-[#ffffff] rounded-[20px] min-h-screen">
          {children}
        </div>
      </div>
    </div>
  );
};

export default Layout;
