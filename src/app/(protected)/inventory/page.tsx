import React from "react";
import InventoryComponent from "@/features/inventory";

export async function generateMetadata() {
  return {
    title: "Inventory | Arctern Express",
  };
}
const Index = () => {
  return (
    <div>
      <InventoryComponent />
    </div>
  );
};

export default Index;
