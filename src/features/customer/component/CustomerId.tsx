import React from "react";
import InfoBar from "./InfoBar";
import Financial from "./FinancialDepartment";
import Rates from "./Rates";
import Admin from "./AdminDepartment";
import Operations from "./OperationsDepartment";
import Header from "./header";

const CustomerId = () => {
  return (
    <div className="min-h-screen">
      <div className="w-full max-w-full mx-auto">
        <div className="mb-4">
          <Header />
        </div>
        <div className="mb-4 w-full">
          <InfoBar />
        </div>
        <div className="mb-4 w-full">
          <Financial />
        </div>
        <div className="mb-4 w-full">
          {" "}
          <Rates />
        </div>
        <div className="mb-4 w-full">
          <Operations />
        </div>
        <div className="w-full">
          <Admin />
        </div>
      </div>
    </div>
  );
};

export default CustomerId;
