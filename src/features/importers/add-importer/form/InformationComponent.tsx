import { Input } from "@/components/ui/input";
import React, { useEffect, useState } from "react";
import { ImporterChildPropsInterface } from "../../types";
import PhoneInputField from "@/components/PhoneInputField/PhoneInputField";
import { phoneNumberLimit } from "@/features/users/constant";
import { useGetNetTerms } from "../../hooks";
import { Controller } from "react-hook-form";
import { Selectbox } from "@/components/ui/select-box";
import { Icon } from "@iconify/react/dist/iconify.js";

const InformationComponent = (props: ImporterChildPropsInterface) => {
  const {
    register,
    control,
    setValue,
    watch,
    trigger,
    errors,
    defaultValues,
    isEdit,
  } = props;
  // managing states
  const [state, setState] = useState({
    pagination: {
      page: 1,
      recordsPerPage: 100,
    },
    count: 0,
    filter: {
      sortParams: {
        sortParam: "createdAt",
        sortOrder: "DESC",
      },
    },
  });
  const [phoneLimit, setPhoneLimit] = useState(10);
  const [organizationPhoneLimit, setOrganizationPhoneLimit] = useState(10);

  const { data: getAllNetTerms, isLoading: isNetTermLoading } = useGetNetTerms({
    pagination: state.pagination,
    filters: state.filter,
  });

  useEffect(() => {
    const abc = phoneNumberLimit(defaultValues?.user?.countryCode);
    setPhoneLimit(abc || 10);
  }, [defaultValues?.user?.countryCode]);

  useEffect(() => {
    const abc = phoneNumberLimit(defaultValues?.countryCode);
    setOrganizationPhoneLimit(abc || 10);
  }, [defaultValues?.countryCode]);

  const phoneNumberProps = {
    phoneLimit,
    defaultValues,
    setValue,
    trigger,
    register,
  };
  const organizationPhoneNumberProps = {
    phoneLimit: organizationPhoneLimit,
    defaultValues,
    setValue,
    trigger,
    register,
  };
  return (
    <div className="p-4 bg-[#fafafa] mt-6 rounded-2xl">
      <p className="font-secondary font-medium tracking-normal pb-6">
        Information
      </p>

      <div className="relative sm:grid sm:grid-cols-2 gap-14">
        <div className="absolute left-[50%] top-[50%] w-[1px] bg-[#d6d6d67e] translate-x-[-50%] translate-y-[-50%] h-[100%] hidden md:block"></div>
        <div className="space-y-4">
          <Input
            labelName="First Name"
            placeholder="Enter Your First Name"
            type="text"
            register={register}
            trigger={trigger}
            name={"user.firstName"}
            error={errors?.user?.firstName?.message}
            required
          />
          <Input
            labelName="Email"
            placeholder="Enter Your Email"
            register={register}
            trigger={trigger}
            type="email"
            name={"user.email"}
            required
            disabled={isEdit}
            error={errors?.user?.email?.message}
          />
          {!isEdit && (
            <Input
              labelName="Password"
              placeholder="Enter Your Password"
              onChange={(e) => {
                setValue("user.password", e.target.value);
                trigger("user.password");
                trigger("user.confirmPassword");
              }}
              type="password"
              name={"user.password"}
              required
              error={errors?.user?.password?.message}
            />
          )}
          <Input
            labelName="Organization Name"
            placeholder="Enter Your Organization Name"
            type="text"
            register={register}
            trigger={trigger}
            name={"name"}
            required
            error={errors?.name?.message}
          />

          <PhoneInputField
            label="Organization Phone Number"
            error={errors?.phoneNumber?.message}
            name="phoneNumber"
            {...organizationPhoneNumberProps}
            disabled={isEdit}
          />
          <div>
            <Controller
              name="netTerm.id"
              control={control}
              render={({ field, fieldState: { error } }: any) => {
                return (
                  <div>
                    <Selectbox
                      options={
                        isNetTermLoading
                          ? [{ label: "Loading...", value: "" }]
                          : getAllNetTerms?.data?.data?.items?.map(
                              (netTerm: any) => ({
                                label: `${netTerm?.title} (${netTerm?.days})`,
                                value: netTerm?.id,
                              })
                            )
                      }
                      value={field?.value}
                      onChange={(value) => {
                        setValue("netTerm.id", value?.value);
                        trigger("netTerm.id");
                      }}
                      placeholder="Select Net Terms"
                      emptyText="No data found."
                      className="w-full bg-transparent h-12"
                      label="Net Terms"
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
        </div>
        <div className="space-y-4">
          <Input
            labelName="Last Name"
            placeholder="Enter Your Last Name"
            type="text"
            name={"user.lastName"}
            register={register}
            trigger={trigger}
            required
            error={errors?.user?.lastName?.message}
          />

          <PhoneInputField
            label="Contact Number"
            name="user.phoneNumber"
            countryCode={"user.countryCode"}
            {...phoneNumberProps}
            disabled={isEdit}
            error={errors?.user?.phoneNumber?.message}
          />

          {!isEdit && (
            <Input
              labelName="Confirm Password"
              placeholder="Re-enter your password"
              type="password"
              onChange={(e) => {
                setValue("user.confirmPassword", e.target.value);
                trigger("user.password");
                trigger("user.confirmPassword");
              }}
              name={"user.confirmPassword"}
              required
              error={errors?.user?.confirmPassword?.message}
            />
          )}

          <Input
            labelName="Tax Id"
            placeholder="Enter Your Tax Id"
            type="text"
            register={register}
            trigger={trigger}
            name={"taxId"}
            required
            error={errors?.taxId?.message}
          />
          <Input
            labelName="Organization Email"
            placeholder="Enter Your Organization Email"
            register={register}
            trigger={trigger}
            type="email"
            name={"email"}
            required
            error={errors?.email?.message}
            disabled={isEdit}
          />
        </div>
      </div>
    </div>
  );
};

export default InformationComponent;
