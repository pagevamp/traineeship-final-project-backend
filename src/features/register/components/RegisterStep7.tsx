import React, { useRef } from "react";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import { Input } from "@/components/ui/input";
import { motion } from "framer-motion";
import { CustomerRegister7Props } from "../types";
import * as XLSX from "xlsx";

const Register7 = (props: CustomerRegister7Props) => {
  const {
    appendProduct,
    productFields,
    removeProduct,
    register,
    errors,
    defaultValues,
  } = props;

  // Ref for file input
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Handle file input click
  const handlePaperclipClick = () => {
    if (fileInputRef.current) {
      fileInputRef.current.value = ""; // reset so same file can be uploaded again
      fileInputRef.current.click();
    }
  };

  // Handle file upload and parse Excel
  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const data = await file.arrayBuffer();
    const workbook = XLSX.read(data);
    const sheetName = workbook.SheetNames[0];
    const worksheet = workbook.Sheets[sheetName];
    const jsonData = XLSX.utils.sheet_to_json(worksheet, { header: 1 });
    // jsonData is an array of arrays (rows)
    if (jsonData.length < 2) return; // no data
    const headers = jsonData[0] as string[];
    const hsCodeIdx = headers.findIndex((h) => h.toLowerCase() === "hscode");
    const commodityNameIdx = headers.findIndex(
      (h) => h.toLowerCase() === "commodityname"
    );
    if (hsCodeIdx === -1 || commodityNameIdx === -1) return;
    const productsToAdd = (jsonData.slice(1) as any[][])
      .filter((row) => row[hsCodeIdx] && row[commodityNameIdx])
      .map((row) => ({
        hsCode: String(row[hsCodeIdx]),
        commodityName: String(row[commodityNameIdx]),
      }));

    if (
      productFields.length > 0 &&
      !productFields[0].hsCode &&
      !productFields[0].commodityName &&
      productsToAdd.length > 0
    ) {
      // Replace the first empty product with the first uploaded product
      removeProduct(0);
      appendProduct(productsToAdd[0]);
      // Append the rest
      productsToAdd.slice(1).forEach((product) => appendProduct(product));
    } else {
      // Just append all
      productsToAdd.forEach((product) => appendProduct(product));
    }
  };

  return (
    <motion.div
      className="text-[16px] w-full sm:max-w-screen-lg mx-auto px-4 mt-2 scroll-bar"
      style={{ maxHeight: "80vh", overflowY: "auto" }}
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
        <div
          className="border border-[#D55B09] rounded-[7px] h-[40px] w-[40px] flex items-center justify-center cursor-pointer hover:bg-primary-light"
          onClick={handlePaperclipClick}
        >
          <Image src="/paperClip.svg" alt="paperclip" width={26} height={26} />
          <input
            type="file"
            accept=".xlsx,.xls"
            ref={fileInputRef}
            onChange={handleFileChange}
            style={{ display: "none" }}
          />
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
            labelName="HS Code"
            placeholder="Enter HS Code"
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
              className="absolute -top-2 -right-2 bg-orange-500 hover:bg-orange-600 text-white rounded-full w-6 h-6 text-xs"
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
