import React from "react";
import InfoBar from "./InfoBar";
import Header from "./header";

const CustomerId = () => {
  return (
    <div className="min-h-screen">
      <div className="w-full max-w-full mx-auto">
        <div className="mb-4">
          <Header />
        </div>
        <div className="mb-4 w-full">
          <InfoBar />
        </div>
      </div>
    </div>
  );
};

export default CustomerId;
