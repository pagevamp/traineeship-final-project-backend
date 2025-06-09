import React from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { directorDetails } from "./constant";

const Director = () => {
  return (
    <div className="bg-white rounded-[25px] px-4 md:px-6 lg:px-10 pb-6 md:pb-8 w-full mx-auto">
      <h2 className="text-lg md:text-xl font-semibold text-[#1A1A1A] mb-4">
        Directors
      </h2>

      {/* Desktop Table */}
      <div className="hidden md:block overflow-x-auto">
        <table className="min-w-full text-sm md:text-base">
          <thead>
            <tr>
              <th className="font-primary px-4 py-2 text-left text-[#0B0704]">
                SN
              </th>
              <th className="font-primary px-4 py-2 text-left text-[#0B0704]">
                Director's Name
              </th>
              <th className="font-primary px-4 py-2 text-left text-[#0B0704]">
                Email
              </th>
              <th className="font-primary px-4 py-2 text-left text-[#0B0704]">
                Phone
              </th>
            </tr>
          </thead>
          <tbody>
            {directorDetails.map(({ id, name, email, phone }) => (
              <tr key={id} className="font-secondary text-[#0B0704]">
                <td className="px-4 py-3">{id}</td>
                <td className="px-4 py-3">{name}</td>
                <td className="px-4 py-3">{email}</td>
                <td className="px-4 py-3">{phone}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Mobile Grid Cards */}
      <div className="md:hidden grid grid-cols-1 gap-4">
        {directorDetails.map(({ id, name, email, phone }) => (
          <div
            key={id}
            className="p-4 bg-gray-50 rounded-lg shadow-sm border border-gray-200"
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
                Name:{" "}
              </span>
              <span className="font-secondary text-[14px] text-[#333333]">
                {name}
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

export default Director;
