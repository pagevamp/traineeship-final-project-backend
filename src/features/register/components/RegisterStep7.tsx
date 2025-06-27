import React from "react";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import { Input } from "@/components/ui/input";
import { motion } from "framer-motion";
import { CustomerRegister7Props } from "../types";
const Register7 = (props: CustomerRegister7Props) => {
  const { appendProduct, productFields, removeProduct, register, errors } =
    props;
  return (
    <motion.div
      className="text-[16px] w-full sm:max-w-screen-lg mx-auto px-4 mt-2"
      initial={{ x: 10, opacity: 0.1 }}
      animate={{ x: 0, opacity: 1 }}
      transition={{ duration: 0.6, delay: 0.1, ease: "easeOut" }}
    >
      <div className="flex justify-end mb-6 gap-2">
        <Button
          variant="outline"
          onClick={() => appendProduct({ hsCode: "", commodityName: "" })}
          className="flex items-center h-[40px] gap-2 text-primary hover:text-primary border border-primary hover:bg-primary-light"
        >
          Add <Image src="/plus.svg" alt="plus" width={24} height={24} />
        </Button>
        <div className="border border-[#D55B09] rounded-[7px] h-[40px] w-[40px] flex items-center justify-center">
          <Image src="PaperClip.svg" alt="paperclip" width={26} height={26} />
        </div>
      </div>
      {productFields?.map((field: any, index: number) => (
        <div
          className="grid grid-cols-1 md:grid-cols-2 gap-y-[18px] gap-x-[10px] mb-8 relative"
          key={field.id}
        >
          <Input
            name={`products.${index}.hsCode`}
            register={register}
            labelName="H S Code"
            placeholder="Enter H S Code"
            type="text"
            required
            error={errors?.products?.[index]?.hsCode?.message}
          />
          <Input
            name={`products.${index}.commodityName`}
            register={register}
            labelName="Commodity Name"
            placeholder="Enter Commodity Name"
            type="text"
            required
            error={errors?.products?.[index]?.commodityName?.message}
          />

          {productFields?.length > 1 && (
            <button
              type="button"
              onClick={() => removeProduct(index)}
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

export default Register7;
