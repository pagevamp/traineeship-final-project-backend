import React from "react";
import CustomerComponent from "@/features/consumer";

export async function generateMetadata() {
  return {
    title: "Customer | Arctern Express",
  };
}
const Index = () => {
  return (
    <div className="py-4">
      <CustomerComponent />
    </div>
  );
};

export default Index;
