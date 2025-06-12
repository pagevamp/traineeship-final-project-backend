import React from "react";
import SingleCustomerComponent from "@/features/customer/component/single-customer-detail";

export async function generateMetadata() {
  return {
    title: "Customer Detail | Arctern Express",
  };
}
const Index = () => {
  return (
    <div>
      <SingleCustomerComponent />
    </div>
  );
};

export default Index;
