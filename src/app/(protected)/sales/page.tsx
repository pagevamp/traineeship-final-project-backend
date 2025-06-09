import React from "react";
import SalesComponent from "@/features/sales";

export async function generateMetadata() {
  return {
    title: "Sales | Arctern Express",
  };
}
const Index = () => {
  return (
    <div className="py-4">
      <SalesComponent />
    </div>
  );
};

export default Index;
