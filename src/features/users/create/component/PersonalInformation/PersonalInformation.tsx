import React, { useEffect, useState } from "react";
import { Input } from "@/components/ui/input";
import { Selectbox } from "@/components/ui/select-box";
import { PersonalInformationProps } from "@/features/users/types";
import { Controller } from "react-hook-form";
import { phoneNumberLimit } from "@/features/users/constant";
import PhoneInputField from "@/components/PhoneInputField/PhoneInputField";
import { Icon } from "@iconify/react/dist/iconify.js";

const PersonalInformation = (props: PersonalInformationProps) => {
  const {
    register,
    control,
    setValue,
    trigger,
    allDepartments,
    isDepartmentLoading,
    allDesignations,
    errors,
    defaultValues,
  } = props;

  const [phoneLimit, setPhoneLimit] = useState(10);

  useEffect(() => {
    const abc = phoneNumberLimit(defaultValues?.countryCode);
    setPhoneLimit(abc || 10);
  }, [defaultValues?.countryCode]);

  const phoneNumberProps = {
    phoneLimit,
    defaultValues,
    setValue,
    trigger,
    register,
  };
  return (
    <div className="mb-6">
      <h2 className="font-primary text-lg sm:text-xl text-[#111D35] mb-4 text-start sm:text-left">
        Employee Information
      </h2>
      <div className="mt-4 hover:shadow-md border rounded bg-white/80 backdrop-blur-sm p-2 sm:p-4">
        <div className="grid grid-cols-3 gap-4 mb-4">
          <div>
            <Input
              type="text"
              name="firstName"
              register={register}
              placeholder="Enter First Name"
              labelName="First Name"
              required
              error={errors?.firstName?.message}
            />
          </div>
          <div>
            <Input
              type="text"
              name="lastName"
              register={register}
              placeholder="Enter Last Name"
              labelName="Last Name"
              required
              error={errors?.lastName?.message}
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
              error={errors?.employeeId?.message}
            />
          </div>
        </div>
        <div className="grid grid-cols-2 gap-4">
          <div>
            <Input
              type="text"
              name="email"
              register={register}
              placeholder="Enter Email"
              labelName="Email"
              required
              error={errors?.email?.message}
            />
          </div>
          <PhoneInputField
            label="Contact Number"
            error={errors?.phoneNumber?.message}
            name="phoneNumber"
            {...phoneNumberProps}
          />
          <div>
            <Controller
              name="department"
              control={control}
              render={({ field, fieldState: { error } }: any) => {
                return (
                  <div>
                    <Selectbox
                      options={
                        isDepartmentLoading
                          ? [{ label: "Loading...", value: "" }]
                          : allDepartments?.map((department: any) => ({
                              label: department?.name,
                              value: department?.id,
                            }))
                      }
                      value={field?.value?.value}
                      onChange={(value) => {
                        setValue("department", value);
                        trigger("department");
                      }}
                      placeholder="Select Department"
                      emptyText="No data found."
                      className="w-full bg-transparent h-12"
                      label="Department"
                      error={error?.value?.message}
                    />
                    {error && (
                      <p className="mt-1 text-xs text-destructive font-secondary font-[300] flex items-center gap-1">
                        <Icon
                          icon="solar:close-square-bold"
                          width="14"
                          height="14"
                          className="text-destructive"
                        />
                        <span className="mt-0">{error.value?.message}</span>
                      </p>
                    )}
                  </div>
                );
              }}
            />
          </div>
          <div>
            <Controller
              name="designationId"
              control={control}
              render={({ field, fieldState: { error } }) => {
                return (
                  <div>
                    <Selectbox
                      options={allDesignations?.map((designation: any) => ({
                        label: designation?.name,
                        value: designation?.id,
                      }))}
                      value={field.value}
                      onChange={(value) => {
                        setValue("designationId", value?.value);
                        trigger("designationId");
                      }}
                      placeholder="Select Designation"
                      emptyText="No data found."
                      className="w-full bg-transparent h-12"
                      label="Designation"
                      error={error?.message}
                    />
                    {error && (
                      <p className="mt-1 text-xs text-destructive font-secondary font-[300] flex items-center gap-1">
                        <Icon
                          icon="solar:close-square-bold"
                          width="14"
                          height="14"
                          className="text-destructive"
                        />
                        <span className="mt-0">{error?.message}</span>
                      </p>
                    )}
                  </div>
                );
              }}
            />
          </div>
          <div>
            <Input
              type="password"
              name="password"
              placeholder="Enter Password"
              required
              labelName="Password"
              register={register}
              error={errors?.password?.message}
            />
          </div>
          <div>
            <Input
              type="password"
              name="confirmPassword"
              placeholder="Re-enter Password"
              required
              labelName="Confirm Password"
              register={register}
              error={errors?.confirmPassword?.message}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default PersonalInformation;
