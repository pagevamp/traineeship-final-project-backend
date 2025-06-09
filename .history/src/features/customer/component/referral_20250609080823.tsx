import React from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { financialDetails } from "./constant";

const Referral = () => {
  return (
    <div className="bg-white rounded-[25px] px-4 md:px-6 lg:px-10 pb-6 md:pb-8 w-full mx-auto">
      <h2 className="text-lg md:text-xl font-semibold text-[#1A1A1A] mb-4">
        Directors
      </h2>

      <div className="hidden md:block overflow-x-auto">
        <table className="min-w-full text-sm md:text-base">
          <thead>
            <tr>
              <th className="font-primary px-4 py-2 text-left text-[#0B0704] text-[14px] md:text-[16px]">
                SN
              </th>
              <th className="font-primary px-4 py-2 text-left text-[#0B0704] text-[14px] md:text-[16px]">
                Finance Managers's Name
              </th>
              <th className="font-primary px-4 py-2 text-left text-[#0B0704] text-[14px] md:text-[16px]">
                Business Associate
              </th>
              <th className="font-primary px-4 py-2 text-left text-[#0B0704] text-[14px] md:text-[16px]">
                Email
              </th>
              <th className="font-primary px-4 py-2 text-left text-[#0B0704] text-[14px] md:text-[16px]">
                Phone
              </th>
            </tr>
          </thead>
          <tbody>
            {financialDetails.map(({ id, name, email, phone }, idx) => (
              <tr
                key={id}
                className="text-[#0B0704] text-[12px] md:text-[13px] font-secondary gap-y-4 border-b border-t border-[#E6EFF5] last:border-b-0"
              >
                <td className="px-4 py-3">{id}</td>
                <td className="px-4 py-3">{name}</td>
                <td className="px-4 py-3">{associate}</td>
                <td className="px-4 py-3">{email}</td>
                <td className="px-4 py-3">{phone}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="md:hidden">
        {financialDetails.map(({ id, name, email, phone }, idx) => (
          <div
            key={id}
            className={`p-4 bg-gray-50 border-gray-200 ${
              idx !== financialDetails.length - 1 ? "border-b" : ""
            }`}
          >
            <div className="mb-1">
              <span className="font-primary text-[15px] text-[#0B0704]">
                SN:{" "}
              </span>
              <span className="font-secondary text-[14px] text-[#333333]">
                {id}
              </span>
            </div>
            <div className="mb-1">
              <span className="font-primary text-[15px] text-[#0B0704]">
                Finance Manager Name:{" "}
              </span>
              <span className="font-secondary text-[14px] text-[#333333]">
                {name}
              </span>
            </div>
            <div className="mb-1">
              <span className="font-primary text-[15px] text-[#0B0704]">
                Finance Manager Name:{" "}
              </span>
              <span className="font-secondary text-[14px] text-[#333333]">
                {associate}
              </span>
            </div>
            <div className="mb-1 break-words">
              <span className="font-primary text-[15px] text-[#0B0704]">
                Email:{" "}
              </span>
              <span className="font-secondary text-[14px] text-[#333333]">
                {email}
              </span>
            </div>
            <div>
              <span className="font-primary text-[15px] text-[#0B0704]">
                Phone:{" "}
              </span>
              <span className="font-secondary text-[14px] text-[#333333]">
                {phone}
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Referral;
