import React from "react";
import SingleInventoryComponent from "@/features/inventory/single-detail/index";

export async function generateMetadata() {
  return {
    title: "Inventory Variation Detail | Arctern Express",
  };
}
const Index = () => {
  return (
    <div>
      <SingleInventoryComponent />
    </div>
  );
};

export default Index;
