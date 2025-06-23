"use client";
import React, { useState } from "react";
import { permissionsData } from "../constant";

const actions = ["View", "Edit", "Create", "Delete"];
const headerColors = ["#FF743C", "#007AFF", "#34C759", "#AF52DE"];

const SlideTwo = () => {
  const [matrix, setMatrix] = useState(() =>
    permissionsData.reduce((acc, row) => {
      acc[row] = {
        View: false,
        Edit: false,
        Create: false,
        Delete: false,
      };
      return acc;
    }, {} as Record<string, Record<string, boolean>>)
  );

  // Handler to toggle a permission
  const togglePermission = (row: string, action: string) => {
    setMatrix((prev) => ({
      ...prev,
      [row]: {
        ...prev[row],
        [action]: !prev[row][action],
      },
    }));
  };
  return (
    <div className="h-full overflow-auto">
      <h2 className="font-primary text-lg sm:text-xl lg:text-2xl text-[#111D35] mb-5 sm:mb-6 text-start sm:text-left">
        Grant Access
      </h2>

      <div className="overflow-auto">
        <div className="w-full overflow-auto sm:min-w-full">
          {/* Header */}
          <div className="hidden sm:grid grid-cols-6 items-center mb-3 px-2 sm:px-4">
            <div className="col-span-2" />
            <div className="col-span-4 grid grid-cols-4 gap-x-4 sm:gap-x-6 lg:gap-x-8">
              {actions.map((header, i) => (
                <div key={i} className="flex justify-center">
                  <span
                    className="text-xs sm:text-sm lg:text-base font-semibold text-center"
                    style={{ color: headerColors[i] }}
                  >
                    {header}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Rows — responsive */}
          {permissionsData.map((deta, rowIndex) => (
            <div
              key={rowIndex}
              className="w-full mb-4 border rounded-md shadow-sm p-1 sm:px-4 sm:py-3 bg-white 
      sm:grid sm:grid-cols-6 sm:items-center
      flex flex-col gap-y-2"
            >
              {/* Title */}
              <span className="font-medium text-[8px] sm:text-base text-[#111D35] col-span-2 truncate">
                {deta}
              </span>

              {/* Permissions */}
              <div
                className="
        sm:col-span-4 grid grid-cols-4 sm:grid-cols-4 
        gap-x-0 gap-y-2 sm:gap-x-6 lg:gap-x-8
      "
              >
                {actions.map((header, colIndex) => {
                  return (
                    <div
                      className="flex items-center justify-start gap-1 sm:justify-center"
                      key={colIndex}
                    >
                      <span
                        className="text-[9px] font-medium sm:hidden"
                        style={{ color: headerColors[colIndex] }}
                      >
                        {header}
                      </span>
                      <button
                        onClick={() => togglePermission(deta, header)}
                        className={`rounded-[2px] sm:rounded w-3 h-3 sm:w-5 sm:h-5 border sm:border-2 ${
                          matrix[deta][header]
                            ? "bg-orange-500 border-orange-500 text-white"
                            : "border-orange-500 text-orange-500"
                        } flex items-center justify-center transition`}
                      >
                        {matrix[deta][header] && (
                          <svg
                            className="w-4 h-4"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="2"
                            viewBox="0 0 24 24"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              d="M5 13l4 4L19 7"
                            />
                          </svg>
                        )}
                      </button>
                    </div>
                  );
                })}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default SlideTwo;
