import React from "react";
import CustomerComponent from "@/features/consumer";

export async function generateMetadata() {
  return {
    title: "Customer | Arctern Express",
  };
}
const Index = () => {
  return (
    <div>
      <CustomerComponent />
    </div>
  );
};

export default Index;
