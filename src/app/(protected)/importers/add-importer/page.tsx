import React, { Suspense } from "react";
import AddImporterComponent from "@/features/importers/add-importer";
import { Icon } from "@iconify/react/dist/iconify.js";

export async function generateMetadata() {
  return {
    title: "Add Importer | Arctern Express",
  };
}
const Index = () => {
  return (
    <Suspense
      fallback={
        <div className="flex items-center justify-center">
          <Icon icon="codex:loader" className="text-[30px] animate-spin" />
        </div>
      }
    >
      <AddImporterComponent />
    </Suspense>
  );
};

export default Index;
