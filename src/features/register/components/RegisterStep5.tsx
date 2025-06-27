import React from "react";
import { Input } from "@/components/ui/input";
import { motion } from "framer-motion";
import { Selectbox } from "@/components/ui/select-box";
import { CustomerRegister5Props } from "../types";
import { Controller } from "react-hook-form";
import { BANK_COUNTRY, CURRENCY } from "../constant";
import { Icon } from "@iconify/react/dist/iconify.js";

const Register5 = (props: CustomerRegister5Props) => {
  const { register, errors, control, setValue, trigger } = props;
  return (
    <motion.div
      className="text-[16px] w-full px-4 sm:px-6 md:px-8 mt-4"
      initial={{ x: 10, opacity: 0.1 }}
      animate={{ x: 0, opacity: 1 }}
      transition={{ duration: 0.6, delay: 0.1, ease: "easeOut" }}
    >
      <div className="flex flex-col mb-5 items-center justify-center">
        <Input
          type="text"
          name="bankDetails.0.referenceFromBank"
          register={register}
          placeholder="Enter Reference from Bank"
          labelName="Reference from Bank"
          required
          className="w-[250px]"
          error={errors?.bankDetails?.[0]?.referenceFromBank?.message}
        />
      </div>

      <div className="relative mb-8 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-y-5 gap-x-4">
        <Input
          type="text"
          name="bankDetails.0.accountHolderName"
          register={register}
          placeholder="Enter Account Holder Name"
          labelName="Account Holder Name"
          required
          error={errors?.bankDetails?.[0]?.accountHolderName?.message}
        />
        <Input
          type="text"
          name="bankDetails.0.bankName"
          register={register}
          placeholder="Enter Bank Name"
          labelName="Bank Name"
          required
          error={errors?.bankDetails?.[0]?.bankName?.message}
        />
        <Input
          type="text"
          name="bankDetails.0.bankBranchNameAndLocation"
          register={register}
          placeholder="Enter Bank Branch Name & Location"
          labelName="Bank Branch Name & Location"
          required
          error={errors?.bankDetails?.[0]?.bankBranchNameAndLocation?.message}
        />
        <Input
          type="text"
          name="bankDetails.0.accountNumber"
          register={register}
          placeholder="Enter Account Number"
          labelName="Account Number"
          required
          error={errors?.bankDetails?.[0]?.accountNumber?.message}
        />

        <Input
          name="bankDetails.0.iban"
          register={register}
          labelName={
            <>
              IBAN{" "}
              <span className="text-[8px]">
                (International Bank Account Number)
              </span>
            </>
          }
          placeholder="Enter IBAN"
          type="text"
          required
          error={errors?.bankDetails?.[0]?.iban?.message}
        />

        <Input
          type="text"
          name="bankDetails.0.swiftBicCode"
          register={register}
          placeholder="Enter Swift/BIC Code"
          labelName="Swift/BIC Code"
          required
          error={errors?.bankDetails?.[0]?.swiftBicCode?.message}
        />

        <div>
          <Controller
            name="bankDetails.0.currency"
            control={control}
            render={({ field, fieldState: { error } }: any) => {
              return (
                <div>
                  <Selectbox
                    options={CURRENCY?.map((curr: any) => ({
                      label: curr?.label,
                      value: curr?.value,
                    }))}
                    value={field?.value}
                    onChange={(value) => {
                      setValue("bankDetails.0.currency", value?.value);
                      trigger("bankDetails.0.currency");
                    }}
                    placeholder="Select Currency"
                    emptyText="No data found."
                    className="w-full bg-transparent h-12 font-secondary text-sm font-[300]"
                    label="Currency"
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
            name="bankDetails.0.bankCountry"
            control={control}
            render={({ field, fieldState: { error } }: any) => {
              return (
                <div>
                  <Selectbox
                    options={BANK_COUNTRY?.map((curr: any) => ({
                      label: curr?.label,
                      value: curr?.value,
                    }))}
                    value={field?.value}
                    onChange={(value) => {
                      setValue("bankDetails.0.bankCountry", value?.value);
                      trigger("bankDetails.0.bankCountry");
                    }}
                    placeholder="Select Bank Country"
                    emptyText="No data found."
                    className="w-full bg-transparent h-12 font-secondary text-sm font-[300]"
                    label="Bank Country"
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

        <Input
          type="text"
          name="bankDetails.0.beneficiaryAddress"
          register={register}
          placeholder="Enter Beneficiary Address"
          labelName="Beneficiary Address"
          required
          error={errors?.bankDetails?.[0]?.beneficiaryAddress?.message}
        />

        <Input
          type="text"
          name="bankDetails.0.bankAddress"
          register={register}
          placeholder="Enter Bank Address"
          labelName="Bank Address"
          required
          error={errors?.bankDetails?.[0]?.bankAddress?.message}
        />

        <Input
          type="text"
          name="bankDetails.0.vatTrnNumber"
          register={register}
          placeholder="Enter VAT/TRN Number"
          labelName="VAT/TRN Number"
          required
          error={errors?.bankDetails?.[0]?.vatTrnNumber?.message}
        />
      </div>
    </motion.div>
  );
};

export default Register5;
