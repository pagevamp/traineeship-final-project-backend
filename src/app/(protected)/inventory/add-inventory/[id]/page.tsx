import React from "react";
import AddInventoryComponent from "@/features/inventory/add-inventory";

export async function generateMetadata() {
  return {
    title: "Edit Inventory | Arctern Express",
  };
}
const Index = ({ params }: { params: { id: string } }) => {
  const { id } = params;


  return (
    <div>
      <AddInventoryComponent id={id} />
    </div>
  );
};

export default Index;
