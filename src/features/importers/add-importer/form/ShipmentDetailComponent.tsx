import React, { useState } from "react";
import { Input } from "@/components/ui/input";
import { ImporterChildPropsInterface } from "../../types";
import { toast } from "sonner";

const ShipmentDetailComponent = (props: ImporterChildPropsInterface) => {
  const { register, control, setValue, watch, trigger, errors, defaultValues } =
    props;
  const [copyChecked, setCopyChecked] = useState(false);

  // Watch billing address fields
  const billingAddress = watch("billingAddress.0");

  const handleCopyBilling = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const checked = e.target.checked;
    setCopyChecked(checked);
    if (checked) {
      // Check if billing address is filled (at least street1, city, country, state, zipCode)
      if (
        billingAddress?.street1 ||
        billingAddress?.city ||
        billingAddress?.country ||
        billingAddress?.state ||
        billingAddress?.zipCode
      ) {
        setValue("shippingAddress.0.street1", billingAddress.street1);
        setValue("shippingAddress.0.street2", billingAddress.street2 || "");
        setValue("shippingAddress.0.city", billingAddress.city);
        setValue("shippingAddress.0.country", billingAddress.country);
        setValue("shippingAddress.0.state", billingAddress.state);
        setValue("shippingAddress.0.zipCode", billingAddress.zipCode);
        await trigger([
          "shippingAddress.0.street1",
          "shippingAddress.0.street2",
          "shippingAddress.0.city",
          "shippingAddress.0.country",
          "shippingAddress.0.state",
          "shippingAddress.0.zipCode",
        ]);
      } else {
        setCopyChecked(false);
        toast.info("Please fill in the billing address before copying.");
      }
    } else {
      // Clear shipping address fields
      setValue("shippingAddress.0.street1", "");
      setValue("shippingAddress.0.street2", "");
      setValue("shippingAddress.0.city", "");
      setValue("shippingAddress.0.country", "");
      setValue("shippingAddress.0.state", "");
      setValue("shippingAddress.0.zipCode", "");
      await trigger([
        "shippingAddress.0.street1",
        "shippingAddress.0.street2",
        "shippingAddress.0.city",
        "shippingAddress.0.country",
        "shippingAddress.0.state",
        "shippingAddress.0.zipCode",
      ]);
    }
  };

  return (
    <div className="p-4 bg-[#fafafa] mt-6 rounded-2xl">
      <p className="font-secondary font-medium tracking-normal pb-2">
        Shipment Detail
      </p>
      <div className="mb-4 flex items-center gap-2">
        <input
          type="checkbox"
          id="copy-billing-to-shipping"
          checked={copyChecked}
          className="cursor-pointer"
          onChange={handleCopyBilling}
        />
        <label
          htmlFor="copy-billing-to-shipping"
          className="text-sm cursor-pointer select-none font-secondary font-[300] text-gray-600"
        >
          Copy same as billing address
        </label>
      </div>
      <div className="relative sm:grid sm:grid-cols-2 gap-14">
        <div className="absolute left-[50%] top-[50%] w-[1px] bg-[#d6d6d67e] translate-x-[-50%] translate-y-[-50%] h-[100%] hidden md:block"></div>
        <div className="space-y-4">
          <Input
            labelName="Street Address 1"
            placeholder="Enter Your Street Address 1"
            register={register}
            trigger={trigger}
            type="text"
            name={"shippingAddress.0.street1"}
            required
            error={errors?.shippingAddress?.[0]?.street1?.message}
          />
          <Input
            labelName="City"
            placeholder="Enter City"
            type="text"
            register={register}
            trigger={trigger}
            name={"shippingAddress.0.city"}
            required
            error={errors?.shippingAddress?.[0]?.city?.message}
          />
          <Input
            labelName="Country"
            placeholder="Enter Country"
            type="text"
            register={register}
            trigger={trigger}
            name={"shippingAddress.0.country"}
            required
            error={errors?.shippingAddress?.[0]?.country?.message}
          />
        </div>
        <div className="space-y-4">
          <Input
            labelName="Street Address 2"
            placeholder="Enter Your Street Address 2"
            type="text"
            register={register}
            trigger={trigger}
            name={"shippingAddress.0.street2"}
            error={errors?.shippingAddress?.[0]?.street2?.message}
          />
          <Input
            labelName="State"
            placeholder="Enter State"
            type="text"
            register={register}
            trigger={trigger}
            name={"shippingAddress.0.state"}
            required
            error={errors?.shippingAddress?.[0]?.state?.message}
          />
          <Input
            labelName="Zip Code"
            placeholder="Enter Zip Code"
            type="text"
            register={register}
            trigger={trigger}
            name={"shippingAddress.0.zipCode"}
            required
            error={errors?.shippingAddress?.[0]?.zipCode?.message}
          />
        </div>
      </div>
    </div>
  );
};

export default ShipmentDetailComponent;
