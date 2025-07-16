import React from "react";
import AddInventoryComponent from "@/features/inventory/add-inventory";

export async function generateMetadata() {
  return {
    title: "Add Inventory | Arctern Express",
  };
}
const Index = () => {
  return (
    <div>
      <AddInventoryComponent />
    </div>
  );
};

export default Index;
