"use client";
import { Input } from "@/components/ui/input";

type SlideOneProps = {
  onContinue: () => void;
};

const SlideOne = ({ onContinue }: SlideOneProps) => {
  return (
    <div className="max-w-[538px] w-full mx-auto px-6 mt-[34px] mb-[48px] box-border">
      <span className="font-primary text-[20px] text-[#111D35] block">
        Create Employee
      </span>

      <div className="flex flex-col lg:flex-row gap-4 lg:gap-[26px] mt-[28px]">
        <div className="flex flex-col flex-1">
          <label className="mb-1 text-[14px] font-medium text-[#111D35]">
            Full Name
          </label>
          <Input
            type="text"
            placeholder="Enter Full Name"
            className="w-full h-[40px] px-3 rounded border border-[#ccc] text-[14px] bg-white"
          />
        </div>
        <div className="flex flex-col flex-1">
          <label className="mb-1 text-[14px] font-medium text-[#111D35]">
            Employee ID
          </label>
          <Input
            type="text"
            placeholder="Enter Employee ID"
            className="w-full h-[40px] px-3 rounded border border-[#ccc] text-[14px] bg-white"
          />
        </div>
      </div>

      <div className="flex flex-col lg:flex-row gap-4 lg:gap-[26px] mt-[20px]">
        <div className="flex flex-col flex-1">
          <label className="mb-1 text-[14px] font-medium text-[#111D35]">
            Email
          </label>
          <Input
            type="email"
            placeholder="Enter Email"
            className="w-full h-[40px] px-3 rounded border border-[#ccc] text-[14px] bg-white"
          />
        </div>
        <div className="flex flex-col flex-1">
          <label className="mb-1 text-[14px] font-medium text-[#111D35]">
            Phone Number
          </label>
          <Input
            type="tel"
            placeholder="+91"
            className="w-full h-[40px] px-3 rounded border border-[#ccc] text-[14px] bg-white"
          />
        </div>
      </div>

      <div className="flex flex-col lg:flex-row gap-4 lg:gap-[26px] mt-[20px]">
        <div className="flex flex-col flex-1">
          <label className="mb-1 text-[14px] font-medium text-[#111D35]">
            Department
          </label>
          <select className="w-full h-[40px] px-3 rounded border border-[#ccc] text-[14px] text-[#555] bg-white appearance-none">
            <option>Select Department</option>
            <option>HR</option>
            <option>Engineering</option>
          </select>
        </div>
        <div className="flex flex-col flex-1">
          <label className="mb-1 text-[14px] font-medium text-[#111D35]">
            Designation
          </label>
          <select className="w-full h-[40px] px-3 rounded border border-[#ccc] text-[14px] text-[#555] bg-white appearance-none">
            <option>Select Designation</option>
            <option>Manager</option>
            <option>Developer</option>
          </select>
        </div>
      </div>

      <div className="flex flex-col lg:flex-row gap-4 lg:gap-[26px] mt-[20px]">
        <div className="flex flex-col flex-1">
          <label className="mb-1 text-[14px] font-medium text-[#111D35]">
            Password
          </label>
          <Input
            type="text"
            placeholder="Enter New Password"
            className="w-full h-[40px] px-3 rounded border border-[#ccc] text-[14px] bg-white"
          />
        </div>
        <div className="flex flex-col flex-1">
          <label className="mb-1 text-[14px] font-medium text-[#111D35]">
            Confirm Password
          </label>
          <Input
            type="text"
            placeholder="Re-enter Password"
            className="w-full h-[40px] px-3 rounded border border-[#ccc] text-[14px] bg-white"
          />
        </div>
      </div>

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

export default SlideOne;
