import React, { Suspense } from "react";
import SuccessComponent from "@/features/success/SuccessComponent";

const Success = () => {
  return (
    <Suspense fallback={<></>}>
      {" "}
      <SuccessComponent />
    </Suspense>
  );
};

export default Success;
