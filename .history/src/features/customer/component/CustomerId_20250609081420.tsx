import React from "react";
import InfoBar from "./InfoBar";
import Financial from "./FinancialDepartment";
import Rates from "./Rates";
import Admin from "./AdminDepartment";
import Operations from "./OperationsDepartment";
import Header from "./header";

const CustomerId = () => {
  return (
    <div className="bg-[#F9F2FD] min-h-screen">
      <div className="w-full lg:w-auto max-w-full lg:max-w-none px-4 md:px-6 lg:px-10 mx-auto">
        <div className="mt-8 mb-12 max-w-[1200px] lg:max-w-none mx-auto">
          <Header />
        </div>
        <div className="mb-4 w-full lg:max-w-none">
          <InfoBar />
        </div>
        <div className="mb-5 w-full lg:max-w-none">
          <Financial />
        </div>
        <div className="mb-5 w-full lg:max-w-none">
          <Rates />
        </div>
        <div className="mb-4 w-full lg:max-w-none">
          <Operations />
        </div>
        <div className="mb-4 w-full lg:max-w-none">
          <Admin />
        </div>
      </div>
    </div>
  );
};

export default CustomerId;
