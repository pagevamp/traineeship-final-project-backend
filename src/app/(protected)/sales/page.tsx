import React from "react";
import SalesComponent from "@/features/sales";

export async function generateMetadata() {
  return {
    title: "Sales | Arctern Express",
  };
}
const Index = () => {
  return (
    <div className="px-1 py-6">
      <SalesComponent />
    </div>
  );
};

export default Index;
