import React, { useMemo, useState } from "react";
import { Input } from "@/components/ui/input";
import { ImporterChildPropsInterface } from "../../types";
import { toast } from "sonner";
import { Icon } from "@iconify/react/dist/iconify.js";
import { Selectbox } from "@/components/ui/select-box";
import { Controller } from "react-hook-form";

const ShipmentDetailComponent = (props: ImporterChildPropsInterface) => {
  const {
    register,
    control,
    setValue,
    watch,
    trigger,
    errors,
    defaultValues,
    countriesList,
  } = props;
  const [copyChecked, setCopyChecked] = useState(false);

  // Watch billing address fields
  const billingAddress = watch("billingAddress.0");

  // Watch selected values
  const selectedCountry = watch("shippingAddress.0.country");
  const selectedState = watch("shippingAddress.0.state");

  // Find country object
  const countryObj = useMemo(
    () => countriesList?.find((c: any) => c.country === selectedCountry),
    [selectedCountry, countriesList]
  );
  // Find state object
  const stateObj = useMemo(
    () => countryObj?.states.find((s: any) => s.state === selectedState),
    [countryObj, selectedState]
  );

  // Prepare options
  const countryOptions = countriesList?.map((country: any) => ({
    label: `${country.flag} ${country.country}`,
    value: country.country,
  }));

  const stateOptions = countryObj
    ? countryObj.states.map((state: any) => ({
        label: state.state,
        value: state.state,
      }))
    : [];

  const cityOptions = stateObj
    ? stateObj.cities.map((city: any) => ({
        label: city.city,
        value: city.city,
      }))
    : [];

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
            onChange={(e) => {
              setValue("shippingAddress.0.street1", e.target.value);
              trigger("shippingAddress.0.street1");
            }}
            value={defaultValues?.shippingAddress?.[0]?.street1 || ""}
            type="text"
            name={"shippingAddress.0.street1"}
            required
            error={errors?.shippingAddress?.[0]?.street1?.message}
          />
          {/* Country Dropdown */}
          <div>
            <Controller
              name="shippingAddress.0.country"
              control={control}
              render={({ field, fieldState: { error } }) => (
                <div>
                  <Selectbox
                    options={countryOptions}
                    value={field.value || ""}
                    onChange={(option) => {
                      field.onChange(option.value);
                      setValue("shippingAddress.0.state", "", {
                        shouldValidate: true,
                      });
                      setValue("shippingAddress.0.city", "", {
                        shouldValidate: true,
                      });
                      trigger(["shippingAddress.0.country"]);
                    }}
                    placeholder="Select Country"
                    emptyText="No country found."
                    className="w-full bg-transparent h-12"
                    label="Country"
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
              )}
            />
          </div>

          <div className="block sm:hidden">
            {/* State Dropdown */}
            <Controller
              name="shippingAddress.0.state"
              control={control}
              render={({ field, fieldState: { error } }) => (
                <div>
                  <Selectbox
                    options={stateOptions}
                    value={field.value || ""}
                    onChange={(option) => {
                      field.onChange(option.value);
                      setValue("shippingAddress.0.city", "", {
                        shouldValidate: true,
                      });
                      trigger(["shippingAddress.0.state"]);
                    }}
                    placeholder="Select State"
                    emptyText="No state found."
                    className="w-full bg-transparent h-12"
                    label="State"
                    error={error?.message}
                    disabled={!selectedCountry || !countryObj}
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
              )}
            />
          </div>

          <div className="hidden sm:block">
            {/* City Dropdown */}
            <Controller
              name="shippingAddress.0.city"
              control={control}
              render={({ field, fieldState: { error } }) => (
                <div>
                  <Selectbox
                    options={cityOptions}
                    value={field.value || ""}
                    onChange={(option) => {
                      field.onChange(option.value);
                      trigger(["shippingAddress.0.city"]);
                    }}
                    placeholder="Select City"
                    emptyText="No city found."
                    className="w-full bg-transparent h-12"
                    label="City"
                    error={error?.message}
                    disabled={
                      !selectedState || !stateObj || !stateObj.cities.length
                    }
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
              )}
            />
          </div>
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
          <div className="block sm:hidden">
            {/* City Dropdown */}
            <Controller
              name="shippingAddress.0.city"
              control={control}
              render={({ field, fieldState: { error } }) => (
                <div>
                  <Selectbox
                    options={cityOptions}
                    value={field.value || ""}
                    onChange={(option) => {
                      field.onChange(option.value);
                      trigger(["shippingAddress.0.city"]);
                    }}
                    placeholder="Select City"
                    emptyText="No city found."
                    className="w-full bg-transparent h-12"
                    label="City"
                    error={error?.message}
                    disabled={
                      !selectedState || !stateObj || !stateObj.cities.length
                    }
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
              )}
            />
          </div>

          <div className="hidden sm:block">
            {/* State Dropdown */}
            <Controller
              name="shippingAddress.0.state"
              control={control}
              render={({ field, fieldState: { error } }) => (
                <div>
                  <Selectbox
                    options={stateOptions}
                    value={field.value || ""}
                    onChange={(option) => {
                      field.onChange(option.value);
                      setValue("shippingAddress.0.city", "", {
                        shouldValidate: true,
                      });
                      trigger(["shippingAddress.0.state"]);
                    }}
                    placeholder="Select State"
                    emptyText="No state found."
                    className="w-full bg-transparent h-12"
                    label="State"
                    error={error?.message}
                    disabled={!selectedCountry || !countryObj}
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
              )}
            />
          </div>
          <Input
            labelName="Zip Code"
            placeholder="Enter Zip Code"
            type="text"
            onChange={(e) => {
              setValue("shippingAddress.0.zipCode", e.target.value);
              trigger("shippingAddress.0.zipCode");
            }}
            value={defaultValues?.shippingAddress?.[0]?.zipCode || ""}
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
