import React, { useEffect } from "react";
import { Input } from "@/components/ui/input";
import { motion } from "framer-motion";
import { EMPLOYEE_SIZE, getCompanyTypeOptions } from "../constant";
import { CustomerRegister1Props } from "../types";
import { Controller } from "react-hook-form";
import { Selectbox } from "@/components/ui/select-box";
import { Icon } from "@iconify/react/dist/iconify.js";
import { useCheckUniqueEmail } from "../hooks";
import { useDebouncedCallback } from "@/hooks/useDebouncedCallback";

const Register1 = (props: CustomerRegister1Props) => {
  const {
    register,
    control,
    setValue,
    trigger,
    errors,
    watch,
    setError,
    clearErrors,
  } = props;
  const companyEmail = watch("companyEmail");

  // Debounce email value for API call
  const [debouncedEmail, setDebouncedEmail] = React.useState(companyEmail);
  const debouncedSetEmail = useDebouncedCallback(
    (val: string) => setDebouncedEmail(val),
    500
  );
  React.useEffect(() => {
    debouncedSetEmail(companyEmail);
  }, [companyEmail, debouncedSetEmail]);

  const { data, isLoading, error } = useCheckUniqueEmail(debouncedEmail);
  const isEmailUnique = data?.data?.data;

  // Block continue if email is not unique
  useEffect(() => {
    if (debouncedEmail && isEmailUnique === false) {
      setError("companyEmail", {
        type: "required",
        message: "Email already exists",
      });
    } else if (debouncedEmail && isEmailUnique === true) {
      clearErrors("companyEmail");
    }
  }, [debouncedEmail, isEmailUnique, setError, clearErrors]);

  return (
    <motion.div
      className="text-[16px] max-w-[500px] w-full px-4 sm:px-6 md:px-8 lg:px-0 justify-items flex flex-col gap-4"
      initial={{ x: 10, opacity: 0.1 }}
      animate={{ x: 0, opacity: 1 }}
      transition={{ duration: 0.6, delay: 0.1, ease: "easeOut" }}
    >
      <div>
        <Input
          type="text"
          name="companyName"
          register={register}
          placeholder="Enter Company Name"
          labelName="Company Name"
          required
          error={errors?.companyName?.message}
        />
      </div>

      <div>
        <Input
          type="email"
          name="companyEmail"
          register={register}
          placeholder="Enter Company Mail"
          labelName="Company Mail"
          required
          error={errors?.companyEmail?.message}
        />
        {/* Email uniqueness */}
        {debouncedEmail && (
          <div className="text-xs flex items-center gap-1">
            {!isLoading && error && (
              <span className="text-destructive">Error checking email</span>
            )}
            {!isLoading &&
              !error &&
              debouncedEmail &&
              isEmailUnique === true && (
                <span className="font-[300] font-secondary flex items-center gap-1 mt-1 text-green-500">
                  <Icon
                    icon="solar:check-circle-bold"
                    width="14"
                    height="14"
                    className="text-success"
                  />
                  Email is available
                </span>
              )}
          </div>
        )}
      </div>

      <div>
        <Controller
          name="companyType"
          control={control}
          render={({ field, fieldState: { error } }: any) => {
            return (
              <div>
                <Selectbox
                  options={getCompanyTypeOptions()}
                  value={field?.value}
                  onChange={(value) => {
                    setValue("companyType", value?.value);
                    trigger("companyType");
                  }}
                  placeholder="Select Company Type"
                  emptyText="No data found."
                  className="w-full bg-transparent h-12 font-secondary text-sm font-[300]"
                  label="Company Type"
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
          type="text"
          name="yearOfEstablishment"
          register={register}
          placeholder="Enter Year"
          labelName="Years Since Incorporated"
          required
          numberType
          maxLength={4}
          error={errors?.yearOfEstablishment?.message}
        />
        {/* <DatePicker
          selected={date}
          onSelect={setDate}
          placeholder="Enter Date"
          label="Years Since Incorporated"
          className="w-full text-xs"
        /> */}
      </div>

      <div>
        <Controller
          name="employeeSize"
          control={control}
          render={({ field, fieldState: { error } }: any) => {
            return (
              <div>
                <Selectbox
                  options={EMPLOYEE_SIZE?.map((size: any) => ({
                    label: size?.label,
                    value: size?.value,
                  }))}
                  value={field?.value}
                  onChange={(value) => {
                    setValue("employeeSize", value?.value);
                    trigger("employeeSize");
                  }}
                  placeholder="Select Employee Size"
                  emptyText="No data found."
                  className="w-full bg-transparent h-12"
                  label="Employee Size"
                  optional
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
    </motion.div>
  );
};

export default Register1;
