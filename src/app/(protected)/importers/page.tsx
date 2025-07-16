import React from "react";
import ImportersComponent from "@/features/importers";

export async function generateMetadata() {
  return {
    title: "Importers | Arctern Express",
  };
}
const Index = () => {
  return (
    <div>
      <ImportersComponent />
    </div>
  );
};

export default Index;
