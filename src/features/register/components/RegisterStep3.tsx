import React from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import { motion } from "framer-motion";

const Register3 = (props: any) => {
  const { appendDirector, directorFields, removeDirector, register } = props;
  return (
    <motion.div
      className="text-[16px] w-full px-3 mt-[10px]"
      initial={{ x: 50, opacity: 0.1 }}
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
            className="w-full py-2 px-4 placeholder:text-xs placeholder:text-[#9C9AA5] h-12"
            placeholder="Enter Director Name"
            labelName="Director Name"
            {...register(`directorDetails.${index}.name` as const)}
          />
          <Input
            className="w-full py-2 px-4 placeholder:text-xs placeholder:text-[#9C9AA5] h-12"
            placeholder="Enter Email Id"
            labelName="Email Id"
            {...register(`directorDetails.${index}.email` as const)}
          />
          <Input
            className="w-full py-2 px-4 placeholder:text-xs placeholder:text-[#9C9AA5] h-12"
            placeholder="Enter Phone Number"
            labelName="Phone Number"
            {...register(`directorDetails.${index}.phone` as const)}
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
              className="flex gap-2 h-[40px] text-primary border border-primary hover:bg-primary-light hover:text-primary"
            >
              Add
              <Image src="/plus.svg" alt="plus" width={24} height={24} />
            </Button>
          </div>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-[10px]">
          <div className="flex flex-col gap-2">
            <Input
              className="w-full py-2 px-4 placeholder:text-xs placeholder:text-[#9C9AA5] h-12"
              id="company-type-2"
              name="company-type-2"
              labelName="Finance Manager Name"
              placeholder="Enter Finance Manager Name"
              type="text"
              required
            />
          </div>
          <div className="flex flex-col gap-2">
            <Input
              className="w-full py-2 px-4 placeholder:text-xs placeholder:text-[#9C9AA5] h-12"
              id="director-email-2"
              name="director-email-2"
              labelName="Email Id"
              placeholder="Enter Email Id"
              type="email"
              required
            />
          </div>
          <div className="flex flex-col gap-2">
            <Input
              className="w-full py-2 px-4 placeholder:text-xs placeholder:text-[#9C9AA5] h-12"
              id="director-phone-no-2"
              name="director-phone-no-2"
              labelName="Phone Number"
              placeholder="Enter Phone Number"
              type="text"
              required
            />
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default Register3;
