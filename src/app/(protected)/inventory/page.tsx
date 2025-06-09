import React from "react";
import InventoryComponent from "@/features/inventory";

export async function generateMetadata() {
  return {
    title: "Inventory | Arctern Express",
  };
}
const Index = () => {
  return (
    <div className="py-4">
      <InventoryComponent />
    </div>
  );
};

export default Index;
