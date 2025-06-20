"use client";
import ProductId from "@/features/product/components/ProductId";
import React from "react";
import { useForm } from "react-hook-form";

const Page = () => {
  const { control } = useForm();
  return <ProductId control={control} />;
};

export default Page;
