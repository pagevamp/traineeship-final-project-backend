import React from "react";
import ProfileComponent from "@/features/profile/components/ProfileComponent";

export async function generateMetadata() {
  return {
    title: "Profile | Arctern Express",
  };
}
const Index = () => {
  return (
    <div>
      <ProfileComponent />
    </div>
  );
};

export default Index;
