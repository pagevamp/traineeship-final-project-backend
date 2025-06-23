"use client";
import { Input } from "@/components/ui/input";
import { Selectbox } from "@/components/ui/select-box";
import { Controller } from "react-hook-form";

const SlideOne = (props: any) => {
  const { register, errors, isPending, control, setValue } = props;

  return (
    <div className="h-full">
      <span className="font-primary text-[20px] text-[#111D35] block">
        Create Employee
      </span>

      <div className="grid grid-cols-2 gap-4 mt-4">
        <div>
          <Input
            type="text"
            name="fullName"
            register={register}
            placeholder="Enter Full Name"
            labelName="Full Name"
            required
          />
        </div>
        <div>
          <Input
            type="text"
            name="employeeId"
            register={register}
            placeholder="Enter Employee ID"
            labelName="Employee ID"
            required
          />
        </div>
        <div>
          <Input
            type="text"
            name="email"
            register={register}
            placeholder="Enter Email"
            labelName="Email"
            required
          />
        </div>
        <div>
          <Input
            type="text"
            name="phoneNumber"
            register={register}
            placeholder="Enter Phone Number"
            labelName="Phone Number"
            required
          />
        </div>
        <div>
          <Controller
            name="department"
            control={control}
            render={({ field, fieldState: { error } }) => {
              return (
                <Selectbox
                  options={[{ label: "2 * 3", value: "2 * 3" }]}
                  value={field.value}
                  onChange={(value) => {
                    setValue("department", value?.value);
                  }}
                  placeholder="Select Department"
                  emptyText="No data found."
                  className="w-full bg-transparent h-12"
                  label="Department"
                />
              );
            }}
          />
        </div>
        <div>
          <Controller
            name="designation"
            control={control}
            render={({ field, fieldState: { error } }) => {
              return (
                <Selectbox
                  options={[{ label: "2 * 3", value: "2 * 3" }]}
                  value={field.value}
                  onChange={(value) => {
                    setValue("designation", value?.value);
                  }}
                  placeholder="Select Designation"
                  emptyText="No data found."
                  className="w-full bg-transparent h-12"
                  label="Designation"
                />
              );
            }}
          />
        </div>
        <div>
          <Input
            type="password"
            name="password"
            placeholder="Enter New Password"
            required
            labelName="Password"
          />
        </div>
        <div>
          <Input
            type="password"
            name="confirmPassword"
            placeholder="Re-enter Password"
            required
            labelName="Confirm Password"
          />
        </div>
      </div>

      {/* <div className="flex gap-[26px] mt-[28px]">
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
            className="w-full h-[40px] px-3 text-muted-foreground rounded border border-[#ccc] text-[14px] bg-white"
          />
        </div>
      </div>

      <div className="flex gap-[26px] mt-[20px]">
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

      <div className="flex gap-[26px] mt-[20px]">
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

      <div className="flex gap-[26px] mt-[20px]">
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
      </div> */}
    </div>
  );
};

export default SlideOne;
