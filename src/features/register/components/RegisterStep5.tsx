import React from "react";
import { Input } from "@/components/ui/input";
import { motion } from "framer-motion";
import { Selectbox } from "@/components/ui/select-box";
import { CustomerRegister5Props } from "../types";

const Register5 = (props: CustomerRegister5Props) => {
  const { register, errors } = props;
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
        <div className="flex flex-col gap-2">
          <Input
            className="w-full py-2 px-4 placeholder:text-xs placeholder:text-[#9C9AA5] h-12"
            id="bank-name"
            name="bank-name"
            labelName="Bank Name"
            placeholder="Enter Bank Name"
            type="text"
            required
          />
        </div>
        <div className="flex flex-col gap-2">
          <Input
            className="w-full py-2 px-4 placeholder:text-xs placeholder:text-[#9C9AA5] h-12"
            id="branch-location"
            name="branch-location"
            labelName="Bank Branch Name & Location"
            placeholder="Enter Bank Branch Name & Location"
            type="text"
            required
          />
        </div>

        <div className="flex flex-col gap-2">
          <Input
            className="w-full py-2 px-4 placeholder:text-xs placeholder:text-[#9C9AA5] h-12"
            id="account-number"
            name="account-number"
            labelName="Account Number"
            placeholder="Enter Account Number"
            type="text"
            required
          />
        </div>

        <div className="flex flex-col gap-2">
          <Input
            className="w-full py-2 px-4 placeholder:text-xs placeholder:text-[#9C9AA5] h-12"
            id="iban"
            name="iban"
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
          />
        </div>
        <div className="flex flex-col gap-2">
          <Input
            className="w-full py-2 px-4 placeholder:text-xs placeholder:text-[#9C9AA5] h-12"
            id="swift-bic"
            name="swift-bic"
            labelName="Swift/BIC Code"
            placeholder="Enter Swift/BIC Code"
            type="text"
            required
          />
        </div>
        {/* <div className="flex flex-col gap-2">
          <Input
            className="w-full py-2 px-4 placeholder:text-xs placeholder:text-[#9C9AA5] h-12"
            id="currency"
            name="currency"
            labelName="Currency"
            placeholder="Enter Currency"
            type="text"
            required
          />
        </div> */}

        <div>
          {/* <Controller
            name="Currency"
            control={control}
            render={({ field }) => ( */}
          <Selectbox
            options={[
              { label: "USD", value: "USD" },
              { label: "EUR", value: "EUR" },
            ]}
            // value={field.value || ""}
            // onChange={(selected) => field.onChange(selected.value)}
            value={""}
            onChange={() => {}}
            placeholder="Currency"
            emptyText="No data found."
            className="w-full bg-transparent h-12"
            label="Currency"
            optional={true}
          />
          {/* )}
          /> */}
        </div>
        <div className="flex flex-col gap-2">
          <Input
            className="w-full py-2 px-4 placeholder:text-xs placeholder:text-[#9C9AA5] h-12"
            id="bank-country"
            name="bank-country"
            labelName=" Bank Country"
            placeholder="Enter Bank Country"
            type="text"
            required
          />
        </div>
        <div className="flex flex-col gap-2">
          <Input
            className="w-full py-2 px-4 placeholder:text-xs placeholder:text-[#9C9AA5] h-12"
            id="beneficiary-address"
            name="beneficiary-address"
            labelName="Beneficiary Address"
            placeholder="Enter Beneficiary Address"
            type="text"
            required
          />
        </div>
        <div className="flex flex-col gap-2 border-[#DFDFDF]">
          <Input
            className="w-full py-2 px-4 placeholder:text-xs placeholder:text-[#9C9AA5] h-12"
            id="bank-address"
            name="bank-address"
            labelName="Bank Address"
            placeholder="Enter Bank Address"
            type="text"
            required
          />
        </div>
        <div className="flex flex-col gap-2">
          <Input
            className="w-full py-2 px-4 placeholder:text-xs placeholder:text-[#9C9AA5] h-12"
            id="vat-trn-number"
            name="vat-trn-number"
            labelName="VAT/TRN Number"
            placeholder="Enter VAT/TRN Number"
            type="text"
            required
          />
        </div>
        {/* <div className="flex flex-col gap-2 flex-1 w-full min-w-[255px]">
          <Label
            className="text-[14px] font-primary text-[#26203B]"
            required={true}
          >
            Upload Cancelled Cheque
          </Label>
          <div className="w-full h-12 border border-muted-light bg-white flex items-center justify-center gap-2 px-6 rounded-md shadow-sm">
            <Image
              src="/Upload.svg"
              alt="Company Logo"
              className="w-6 h-6 object-contain"
              width={20}
              height={20}
            />
            <span className="py-2 px-auto text-xs font-weight-300 h-12 text-center flex items-center">
              Upload Files
            </span>
          </div>
        </div> */}
      </div>
    </motion.div>
  );
};

export default Register5;
