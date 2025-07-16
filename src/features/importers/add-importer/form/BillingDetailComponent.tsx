import React from "react";
import { Input } from "@/components/ui/input";
import { ImporterChildPropsInterface } from "../../types";

const BillingDetailComponent = (props: ImporterChildPropsInterface) => {
  const { register, control, setValue, watch, trigger, errors, defaultValues } =
    props;
  return (
    <div className="p-4 bg-[#fafafa] mt-6 rounded-2xl">
      <p className="font-secondary font-medium tracking-normal pb-6">
        Billing Detail
      </p>

      <div className="relative sm:grid sm:grid-cols-2 gap-14">
        <div className="absolute left-[50%] top-[50%] w-[1px] bg-[#d6d6d67e] translate-x-[-50%] translate-y-[-50%] h-[100%] hidden md:block"></div>
        <div className="space-y-4">
          <Input
            labelName="Street Address 1"
            placeholder="Enter Your Street Address 1"
            register={register}
            trigger={trigger}
            type="text"
            name={"billingAddress.0.street1"}
            required
            error={errors?.billingAddress?.[0]?.street1?.message}
          />
          <Input
            labelName="City"
            placeholder="Enter City"
            type="text"
            register={register}
            trigger={trigger}
            name={"billingAddress.0.city"}
            required
            error={errors?.billingAddress?.[0]?.city?.message}
          />
          <Input
            labelName="Country"
            placeholder="Enter Country"
            type="text"
            register={register}
            trigger={trigger}
            name={"billingAddress.0.country"}
            required
            error={errors?.billingAddress?.[0]?.country?.message}
          />
        </div>
        <div className="space-y-4">
          <Input
            labelName="Street Address 2"
            placeholder="Enter Your Street Address 2"
            type="text"
            register={register}
            trigger={trigger}
            name={"billingAddress.0.street2"}
            error={errors?.billingAddress?.[0]?.street2?.message}
          />
          <Input
            labelName="State"
            placeholder="Enter State"
            type="text"
            register={register}
            trigger={trigger}
            name={"billingAddress.0.state"}
            required
            error={errors?.billingAddress?.[0]?.state?.message}
          />
          <Input
            labelName="Zip Code"
            placeholder="Enter Zip Code"
            type="text"
            register={register}
            trigger={trigger}
            name={"billingAddress.0.zipCode"}
            required
            error={errors?.billingAddress?.[0]?.zipCode?.message}
          />
        </div>
      </div>
    </div>
  );
};

export default BillingDetailComponent;
