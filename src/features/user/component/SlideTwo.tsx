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
    <div
      className="p-4 sm:p-6 max-w-[900px] w-full mx-auto scale-[1] origin-top"
      style={{ zoom: "reset" }}
    >
      <span className="font-primary text-[18px] sm:text-[16px] text-[#111D35] block mb-5 sm:mb-4 text-center sm:text-left">
        Grant Access
      </span>

      <div className="overflow-x-auto">
        <div className="min-w-[500px] sm:min-w-full mx-auto">
          <div className="grid grid-cols-6 items-center mb-3 px-2 sm:px-4">
            <div className="col-span-2"></div>
            <div className="col-span-4 grid grid-cols-4 gap-x-4 sm:gap-x-8">
              {headers.map((header, i) => (
                <div key={i} className="flex justify-center">
                  <span
                    className="text-[13px] sm:text-[14px] font-semibold text-center"
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
              className="grid grid-cols-6 items-center w-full h-[40px] bg-white rounded-md mb-4 px-2 sm:px-4 mx-auto shadow-sm"
            >
              <span className="col-span-2 font-medium text-[13px] sm:text-[14px] text-[#111D35] truncate">
                {title}
              </span>
              <div className="col-span-4 grid grid-cols-4 gap-x-4 sm:gap-x-8">
                {headers.map((_, colIndex) => {
                  const isChecked = checkedState[rowIndex][colIndex];
                  return (
                    <div key={colIndex} className="flex justify-center">
                      <Checkbox
                        checked={isChecked}
                        onCheckedChange={() =>
                          toggleCheckbox(rowIndex, colIndex)
                        }
                        className={`border-2 rounded w-5 h-5 cursor-pointer
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
          className="w-full max-w-[180px] sm:w-[191px] h-10 rounded text-white font-medium text-[14px]"
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
