import React from "react";
import SingleUserDetailComponent from "@/features/users/component/single-user-detail";

export async function generateMetadata() {
  return {
    title: "User Detail | Arctern Express",
  };
}
const Index = () => {
  return (
    <div>
      <SingleUserDetailComponent />
    </div>
  );
};

export default Index;
