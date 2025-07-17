import React, { useMemo } from "react";
import { Input } from "@/components/ui/input";
import { ImporterChildPropsInterface } from "../../types";
import { Selectbox } from "@/components/ui/select-box";
import { Controller } from "react-hook-form";
import { Icon } from "@iconify/react/dist/iconify.js";

const BillingDetailComponent = (props: ImporterChildPropsInterface) => {
  const { register, setValue, watch, trigger, errors, control, countriesList } =
    props;

  // Watch selected values
  const selectedCountry = watch("billingAddress.0.country");
  const selectedState = watch("billingAddress.0.state");

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

  return (
    <div className="p-4 bg-[#fafafa] mt-6 rounded-2xl">
      <p className="font-secondary font-medium tracking-normal pb-6">
        Billing Detail
      </p>

      <div className="relative sm:grid sm:grid-cols-2 gap-14 space-y-4 sm:space-y-0">
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
          {/* Country Dropdown */}
          <div>
            <Controller
              name="billingAddress.0.country"
              control={control}
              render={({ field, fieldState: { error } }) => (
                <div>
                  <Selectbox
                    options={countryOptions}
                    value={field.value || ""}
                    onChange={(option) => {
                      field.onChange(option.value);
                      setValue("billingAddress.0.state", "", {
                        shouldValidate: true,
                      });
                      setValue("billingAddress.0.city", "", {
                        shouldValidate: true,
                      });
                      trigger(["billingAddress.0.country"]);
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
              name="billingAddress.0.state"
              control={control}
              render={({ field, fieldState: { error } }) => (
                <div>
                  <Selectbox
                    options={stateOptions}
                    value={field.value || ""}
                    onChange={(option) => {
                      field.onChange(option.value);
                      setValue("billingAddress.0.city", "", {
                        shouldValidate: true,
                      });
                      trigger(["billingAddress.0.state"]);
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
              name="billingAddress.0.city"
              control={control}
              render={({ field, fieldState: { error } }) => (
                <div>
                  <Selectbox
                    options={cityOptions}
                    value={field.value || ""}
                    onChange={(option) => {
                      field.onChange(option.value);
                      trigger(["billingAddress.0.city"]);
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
            name={"billingAddress.0.street2"}
            error={errors?.billingAddress?.[0]?.street2?.message}
          />

          <div className="block sm:hidden">
            {/* City Dropdown */}
            <Controller
              name="billingAddress.0.city"
              control={control}
              render={({ field, fieldState: { error } }) => (
                <div>
                  <Selectbox
                    options={cityOptions}
                    value={field.value || ""}
                    onChange={(option) => {
                      field.onChange(option.value);
                      trigger(["billingAddress.0.city"]);
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
              name="billingAddress.0.state"
              control={control}
              render={({ field, fieldState: { error } }) => (
                <div>
                  <Selectbox
                    options={stateOptions}
                    value={field.value || ""}
                    onChange={(option) => {
                      field.onChange(option.value);
                      setValue("billingAddress.0.city", "", {
                        shouldValidate: true,
                      });
                      trigger(["billingAddress.0.state"]);
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
