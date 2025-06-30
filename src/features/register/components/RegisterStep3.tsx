import React from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import { motion } from "framer-motion";
import { CustomerRegister3Props } from "../types";

const Register3 = (props: CustomerRegister3Props) => {
  const {
    appendDirector,
    directorFields,
    removeDirector,
    register,
    errors,
    financeFields,
    appendFinance,
    removeFinance,
  } = props;
  return (
    <motion.div
      className="text-[16px] w-full px-3 mt-[10px]"
      initial={{ x: 10, opacity: 0.1 }}
      animate={{ x: 0, opacity: 1 }}
      transition={{ duration: 0.6, delay: 0.1, ease: "easeOut" }}
    >
      <div className="flex justify-end mb-[26px]">
        <Button
          variant="outline"
          onClick={() => appendDirector({ name: "", email: "", phone: "" })}
          className="flex items-center gap-2 h-[40px] text-primary border border-primary hover:bg-primary-light hover:text-primary"
        >
          Add
          <Image src="/plus.svg" alt="plus" width={24} height={24} />
        </Button>
      </div>
      {directorFields?.map((field: any, index: number) => (
        <div
          className="grid grid-cols-1 sm:grid-cols-2 relative lg:grid-cols-3 gap-y-[18px] gap-x-[10px] mb-8"
          key={field.id}
        >
          <Input
            placeholder="Enter Director Name"
            labelName="Director Name"
            name={`directorDetails.${index}.name`}
            register={register}
            required
            type="text"
            error={errors?.directorDetails?.[index]?.name?.message}
          />
          <Input
            placeholder="Enter Email Id"
            labelName="Email Id"
            name={`directorDetails.${index}.email`}
            register={register}
            required
            type="email"
            error={errors?.directorDetails?.[index]?.email?.message}
          />
          <Input
            placeholder="Enter Phone Number"
            labelName="Phone Number"
            name={`directorDetails.${index}.phone`}
            register={register}
            required
            type="text"
            numberType
            maxLength={15}
            error={errors?.directorDetails?.[index]?.phone?.message}
          />
          {directorFields?.length > 1 && (
            <button
              type="button"
              onClick={() => removeDirector(index)}
              className="absolute -top-2 -right-3 bg-orange-500 text-white rounded-full w-6 h-6 text-xs"
            >
              ✕
            </button>
          )}
        </div>
      ))}

      <div className="flex flex-col gap-y-[22px]">
        <div className="flex flex-row items-center justify-between w-full">
          <div className="flex-1"></div>{" "}
          <div className="font-primary text-xl mx-auto">
            Finance Manager Information
          </div>
          <div className="flex-1 flex justify-end">
            <Button
              variant="outline"
              onClick={() => appendFinance({ name: "", email: "", phone: "" })}
              className="flex gap-2 h-[40px] text-primary border border-primary hover:bg-primary-light hover:text-primary"
            >
              Add
              <Image src="/plus.svg" alt="plus" width={24} height={24} />
            </Button>
          </div>
        </div>
        {financeFields?.map((field: any, index: number) => (
          <div
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-[10px] relative"
            key={field.id}
          >
            <Input
              placeholder="Enter Finance Manager Name"
              labelName="Finance Manager Name"
              name={`financialDirectorDetails.${index}.name`}
              register={register}
              required
              type="text"
              error={errors?.financialDirectorDetails?.[index]?.name?.message}
            />
            <Input
              placeholder="Enter Email Id"
              labelName="Email Id"
              name={`financialDirectorDetails.${index}.email`}
              register={register}
              required
              error={errors?.financialDirectorDetails?.[index]?.email?.message}
            />
            <Input
              placeholder="Enter Phone Number"
              labelName="Phone Number"
              name={`financialDirectorDetails.${index}.phone`}
              register={register}
              required
              type="text"
              numberType
              maxLength={15}
              error={errors?.financialDirectorDetails?.[index]?.phone?.message}
            />
            {financeFields?.length > 1 && (
              <button
                type="button"
                onClick={() => removeFinance(index)}
                className="absolute -top-2 -right-3 bg-orange-500 hover:bg-orange-600 text-white rounded-full w-6 h-6 text-xs"
              >
                ✕
              </button>
            )}
          </div>
        ))}
      </div>
    </motion.div>
  );
};

export default Register3;
