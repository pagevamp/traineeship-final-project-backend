import React, { useEffect, useState } from "react";
import { Input } from "@/components/ui/input";
import { DepartmentInformationProps } from "../../types";
import { phoneNumberLimit } from "@/features/users/constant";
import PhoneInputField from "@/components/PhoneInputField/PhoneInputField";

const ModalData = (props: DepartmentInformationProps) => {
  const { register, setValue, trigger, errors, defaultValues, isEdit } = props;

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
    <div className="relative p-8">
      <span className="font-primary text-[20px] text-[#111D35] block">
        {isEdit ? "Update Department" : "Create Department"}
      </span>

      <div className="grid md:grid-cols-2  gap-[26px] mt-[28px]">
        <div className="flex flex-col flex-1">
          <Input
            type="text"
            name="name"
            labelName="Department Name"
            register={register}
            placeholder="Enter Department Name"
            required
            error={errors?.name?.message}
          />
        </div>
        <div className="flex flex-col flex-1">
          <Input
            type="text"
            name="contactPerson"
            labelName="Contact Person"
            register={register}
            placeholder="Enter Contact Person Name"
            required
            error={errors?.contactPerson?.message}
          />
        </div>
      </div>

      <div className="grid md:grid-cols-2 gap-[26px] mt-[20px] ">
        <div className="flex flex-col flex-1">
          <Input
            type="email"
            name="contactEmail"
            register={register}
            labelName="Email"
            placeholder="Enter Email"
            required
            error={errors?.contactEmail?.message}
          />
        </div>
        <PhoneInputField
          label="Contact Number"
          error={errors?.contactPhone?.message}
          name="contactPhone"
          {...phoneNumberProps}
        />
      </div>
    </div>
  );
};

export default ModalData;
