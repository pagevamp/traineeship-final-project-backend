import React from "react";
import InventoryDetails from "@/features/inventory/components/InventoryDetails";

export async function generateMetadata() {
  return {
    title: "Inventory Detail | Arctern Express",
  };
}
const Index = ({ params }: { params: { id: string } }) => {
  return (
    <div>
      <InventoryDetails id={params.id} />
    </div>
  );
};

export default Index;
