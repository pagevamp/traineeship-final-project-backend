import React from "react";
import AddCustomerComponent from "@/features/customer/component/Add-Customer";

export async function generateMetadata() {
  return {
    title: "Add Customer | Arctern Express",
  };
}
const Index = () => {
  return (
    <div>
      <AddCustomerComponent />
    </div>
  );
};

export default Index;
