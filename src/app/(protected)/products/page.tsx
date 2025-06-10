import React from "react";
import ProductComponent from "@/features/product";

export async function generateMetadata() {
  return {
    title: "Products | Arctern Express",
  };
}
const Index = () => {
  return (
    <div>
      <ProductComponent />
    </div>
  );
};

export default Index;
