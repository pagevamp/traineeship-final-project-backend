import React from "react";
import InfoBar from "./InfoBar";
import Financial from "./FinancialDepartment";
import Rates from "./Rates";
import Admin from "./AdminDepartment";
import Operations from "./OperationsDepartment";
import Header from "./header";

const CustomerId = () => {
  return (
    <div>
      {" "}
      <div className="bf-[#F9F2FD] ">
        <div className="mt-[32px] mb-[48px]">
          <Header />
        </div>
        <div className="mb-[16px]">
          <InfoBar />
        </div>
        <div className="mb-[19px]">
          <Financial />
        </div>
        <div className="mb-[19px]">
          <Rates />
        </div>
        <div className="mb-[15px]">
          <Operations />
        </div>
        <div className="mb-[15px]">
          <Admin />
        </div>
      </div>
    </div>
  );
};

export default CustomerId;
