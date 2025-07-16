"use client";
import ProductId from "@/features/product/components/ProductId";

const Page = ({ params }: { params: { id: string } }) => {
  return <ProductId id={params.id} />;
};

export default Page;
