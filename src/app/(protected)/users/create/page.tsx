import React, { Suspense } from "react";
import ChildIndex from "@/features/users/create";

const Index = () => {
  return (
    <Suspense fallback={<></>}>
      <ChildIndex />
    </Suspense>
  );
};

export default Index;
