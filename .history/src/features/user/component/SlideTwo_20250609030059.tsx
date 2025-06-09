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
    <div className="lg:max-w-[538px] sm:max-w-[400px] mt-[40px] sm:mt-[62px] mb-[32px] sm:mb-[48px] px-4 sm:px-0">
      <span className="font-primary text-[18px] sm:text-[20px] text-[#111D35] block mb-[20px] sm:mb-[28px] text-center sm:text-left">
        Grant Access
      </span>

      <div className="overflow-x-auto">
        <div className="min-w-[600px] lg:min-w-0 mx-auto">
          <div className="flex items-center mb-[12px] ml-[10px] sm:ml-[100px]">
            <div className="w-[150px] shrink-0" />
            <div className="grid grid-cols-5 gap-x-[20px] sm:gap-x-[32px] w-fit">
              {headers.map((header, i) => (
                <span
                  key={i}
                  className="text-[14px] font-semibold text-center"
                  style={{ color: headerColors[i] }}
                >
                  {header}
                </span>
              ))}
              <div className="w-[52px]" />
            </div>
          </div>

          {accessItems.map(({ title }, rowIndex) => (
            <div
              key={rowIndex}
              className="flex items-center justify-start sm:justify-between w-full lg:w-[589px] h-[40px] bg-white rounded-[6px] mb-[16px] px-[10px] sm:px-[14px] mx-auto"
              style={{ boxShadow: "0 0 2px rgba(0,0,0,0.1)" }}
            >
              <span className="font-medium text-[14px] text-[#111D35] w-[150px] shrink-0">
                {title}
              </span>

              <div className="grid grid-cols-5 gap-x-[20px] sm:gap-x-[32px] w-fit justify-items-center">
                {headers.map((_, colIndex) => {
                  const isChecked = checkedState[rowIndex][colIndex];
                  return (
                    <Checkbox
                      key={colIndex}
                      checked={isChecked}
                      onCheckedChange={() => toggleCheckbox(rowIndex, colIndex)}
                      className={`border-2 rounded-[4px] w-[20px] h-[20px] cursor-pointer
                        ${
                          isChecked
                            ? "bg-gradient-to-r from-[#FF8826] to-[#FF6502] border-[#FF743C]"
                            : "bg-white border-[#FF743C]"
                        }
                      `}
                    />
                  );
                })}
                <div className="w-[52px]" />
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="flex justify-center mt-[28px]">
        <button
          onClick={onContinue}
          className="w-[180px] sm:w-[191px] h-[40px] rounded text-white font-medium text-[14px]"
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
