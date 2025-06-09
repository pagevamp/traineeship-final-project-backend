import { Checkbox } from "@/components/ui/checkbox";
import React, { useState } from "react";
import { accessItems } from "../constant";

type SlideTwoProps = {
  onContinue: () => void;
};

const headers = ["View", "Edit", "Create", "Delete"];
const headerColors = ["#FF743C", "#007AFF", "#34C759", "#AF52DE"]; // Different header colors

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
    <div className="w-full mt-[62px] mb-[48px]">
      <span className="font-primary text-[20px] text-[#111D35] block mb-[28px]">
        Grant Access
      </span>

      <div className="flex  mb-[12px] ml-[100px]">
        <div className="w-[150px]" />
        <div className="grid grid-cols-5 gap-x-[32px] w-[322px]">
          {headers.map((header, i) => (
            <span
              key={i}
              className="text-[14px] font-semibold text-center"
              style={{ color: headerColors[i] }}
            >
              {header}
            </span>
          ))}
          <div />
        </div>
      </div>

      {accessItems.map(({ title }, rowIndex) => (
        <div
          key={rowIndex}
          className="flex items-center justify-between w-[589px] h-[40px] bg-white rounded-[6px] mb-[16px] px-[14px]"
          style={{ boxShadow: "0 0 2px rgba(0,0,0,0.1)" }}
        >
          <span className="font-medium text-[14px] text-[#111D35] w-[150px]">
            {title}
          </span>

          <div className="grid grid-cols-5 gap-x-[32px] w-[322px] justify-items-center">
            {headers.map((_, colIndex) => {
              const isChecked = checkedState[rowIndex][colIndex];
              return (
                <Checkbox
                  key={colIndex}
                  checked={isChecked}
                  onCheckedChange={() => toggleCheckbox(rowIndex, colIndex)}
                  className={`border-2 border-[#FF743C] rounded-[4px] w-[20px] h-[20px] gap-x-[32px] cursor-pointer
                    ${
                      isChecked
                        ? "bg-gradient-to-r from-[#FF8826] to-[#FF6502] border-[#FF743C]"
                        : "bg-white"
                    }
                  `}
                />
              );
            })}
            <div style={{ width: "52px" }} />
          </div>
        </div>
      ))}

      <div className="flex justify-center mt-[28px]">
        <button
          onClick={onContinue}
          className="w-[191px] h-[40px] rounded text-white font-medium text-[14px]"
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
