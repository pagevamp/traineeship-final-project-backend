import React from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import { motion } from "framer-motion";
import { CustomerRegister4Props } from "../types";

const Register4 = (props: CustomerRegister4Props) => {
  const {
    tradeReferenceFields,
    appendTradeReference,
    removeTradeReference,
    register,
    errors,
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
          onClick={() =>
            appendTradeReference({
              referenceName: "",
              businessAssociation: "",
              phone: "",
              email: "",
            })
          }
          className="flex items-center text-primary border border-primary hover:text-primary hover:bg-primary-light gap-2 h-[40px]"
        >
          Add
          <Image src="/plus.svg" alt="plus" width={24} height={24} />
        </Button>
      </div>
      {tradeReferenceFields?.map((field: any, index: number) => (
        <div
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-y-[18px] gap-x-[10px] mb-8 relative"
          key={field.id}
        >
          <Input
            placeholder="Enter Reference Name"
            labelName="Reference Name"
            name={`tradeReferenceDetails.${index}.referenceName`}
            register={register}
            required
            type="text"
            error={
              errors?.tradeReferenceDetails?.[index]?.referenceName?.message
            }
          />

          <Input
            placeholder="Enter Business Association"
            labelName="Business Association"
            name={`tradeReferenceDetails.${index}.businessAssociation`}
            register={register}
            required
            type="text"
            error={
              errors?.tradeReferenceDetails?.[index]?.businessAssociation
                ?.message
            }
          />

          <Input
            placeholder="Enter Email Id"
            labelName="Email Id"
            name={`tradeReferenceDetails.${index}.email`}
            register={register}
            required
            type="text"
            error={errors?.tradeReferenceDetails?.[index]?.email?.message}
          />

          <Input
            placeholder="Enter Phone Number"
            labelName="Phone Number"
            name={`tradeReferenceDetails.${index}.phone`}
            register={register}
            required
            numberType
            type="text"
            error={errors?.tradeReferenceDetails?.[index]?.phone?.message}
          />
          {tradeReferenceFields?.length > 1 && (
            <button
              type="button"
              onClick={() => removeTradeReference(index)}
              className="absolute -top-2 -right-3 bg-orange-500 hover:bg-orange-600 text-white rounded-full w-6 h-6 text-xs"
            >
              ✕
            </button>
          )}
        </div>
      ))}
    </motion.div>
  );
};

export default Register4;
