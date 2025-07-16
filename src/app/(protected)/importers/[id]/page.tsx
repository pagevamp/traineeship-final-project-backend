import React from "react";
import SingleImporterComponent from "@/features/importers/single-importer-detail";

export async function generateMetadata() {
  return {
    title: "Importer Detail | Arctern Express",
  };
}
const Index = () => {
  return (
    <div>
      <SingleImporterComponent />
    </div>
  );
};

export default Index;
