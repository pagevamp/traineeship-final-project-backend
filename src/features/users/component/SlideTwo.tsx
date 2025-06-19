"use client";
import { Checkbox } from "@/components/ui/checkbox";
import React, { useState } from "react";
import { accessItems } from "../constant";

type SlideTwoProps = {
  onContinue: () => void;
};

const headers = ["View", "Edit", "Create", "Delete"];
const headerColors = ["#FF743C", "#007AFF", "#34C759", "#AF52DE"];

const SlideTwo = ({ onContinue }: SlideTwoProps) => {
  const [checkedState, setCheckedState] = useState(
    accessItems.map(() => headers.map(() => false))
  );

  const toggleCheckbox = (rowIndex: number, colIndex: number) => {
    setCheckedState((prevState) =>
      prevState.map((row, rIdx) =>
        row.map((col, cIdx) =>
          rIdx === rowIndex && cIdx === colIndex ? !col : col
        )
      )
    );
  };

  return (
    <div className="p-4 sm:px-4 lg:px-12 xl:px-20 2xl:px-32 max-w-[1400px] w-full mx-auto">
      <h2 className="font-primary text-lg sm:text-xl lg:text-2xl text-[#111D35] mb-5 sm:mb-6 text-start sm:text-left">
        Grant Access
      </h2>

      <div className="overflow-x-auto">
        <div className="min-w-[500px] sm:min-w-full">
          <div className="grid grid-cols-6 items-center mb-3 px-2 sm:px-4">
            <div className="col-span-2"></div>
            <div className="col-span-4 grid grid-cols-4 gap-x-4 sm:gap-x-6 lg:gap-x-8">
              {headers.map((header, i) => (
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

          {accessItems.map(({ title }, rowIndex) => (
            <div
              key={rowIndex}
              className="grid grid-cols-6 items-center w-full h-[40px] bg-white rounded-md mb-4 px-2 sm:px-4 shadow-sm"
            >
              <span className="col-span-2 font-medium text-xs sm:text-sm lg:text-base text-[#111D35] truncate">
                {title}
              </span>
              <div className="col-span-4 grid grid-cols-4 gap-x-4 sm:gap-x-6 lg:gap-x-8">
                {headers.map((_, colIndex) => {
                  const isChecked = checkedState[rowIndex][colIndex];
                  return (
                    <div key={colIndex} className="flex justify-center">
                      <Checkbox
                        checked={isChecked}
                        onCheckedChange={() =>
                          toggleCheckbox(rowIndex, colIndex)
                        }
                        className={`border-2 rounded w-4 h-4 sm:w-5 sm:h-5 cursor-pointer
                          ${
                            isChecked
                              ? "bg-gradient-to-r from-[#FF8826] to-[#FF6502] border-[#FF743C]"
                              : "bg-white border-[#FF743C]"
                          }
                        `}
                      />
                    </div>
                  );
                })}
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="flex justify-center mt-7">
        <button
          onClick={onContinue}
          className="w-full max-w-[180px] sm:w-[191px] h-10 rounded text-white font-medium text-sm sm:text-base"
          style={{
            background: "linear-gradient(90deg, #E06518 0%, #E3802A 100%)",
          }}
        >
          Continue
        </button>
      </div>
    </div>
  );
};

export default SlideTwo;
