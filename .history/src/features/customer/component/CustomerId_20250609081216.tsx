import React from "react";
import InfoBar from "./InfoBar";
import Financial from "./FinancialDepartment";
import Rates from "./Rates";
import Admin from "./AdminDepartment";
import Operations from "./OperationsDepartment";
import Header from "./header";

const CustomerId = () => {
  return (
    <div className="bg-[#F9F2FD] min-h-screen flex justify-center px-4 md:px-6 lg:px-10">
      {/* Centered container with max width */}
      <div className="w-full max-w-5xl">
        <div className="mt-8 mb-12">
          <Header />
        </div>
        <div className="mb-4">
          <InfoBar />
        </div>
        <div className="mb-5">
          <Financial />
        </div>
        <div className="mb-5">
          <Rates />
        </div>
        <div className="mb-4">
          <Operations />
        </div>
        <div className="mb-4">
          <Admin />
        </div>
      </div>
    </div>
  );
};

export default CustomerId;
