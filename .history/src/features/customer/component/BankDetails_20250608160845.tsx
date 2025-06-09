import React from "react";
import { bankDetails } from "./constant";

const BankDetails = () => {
  return (
    <div
      className="bg-white"
      style={{
        paddingLeft: "22px",
        paddingBottom: "18px",
        borderRadius: "25px",
        width: "1111px",
      }}
    >
      <h2 className="text-xl font-semibold text-[#1A1A1A] mb-4">
        Bank Details
      </h2>
      <div className="grid grid-cols-3 gap-y-4 gap-x-8">
        {bankDetails.map(({ label, fullForm, value }, index) => (
          <div key={index}>
            <span className="font-primary text-[16px] text-[#1A1A1A] whitespace-nowrap">
              {label}
              {fullForm && (
                <span
                  style={{
                    fontSize: "8px",
                    marginLeft: "6px",
                    color: "#555",
                  }}
                >
                  ({fullForm})
                </span>
              )}
              :
            </span>{" "}
            <span className="font-secondary text-[15px] text-[#333333]">
              {value}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default BankDetails;
