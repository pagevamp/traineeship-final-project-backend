import React from "react";
import VehicleHeader from "./VehicleHeader";
import VehicleInfoBar from "./VehicleInfoBar";

const VehicleId = () => {
  return (
    <div>
      <div className="mb-4">
        <VehicleHeader />
      </div>
      <div className="mb-4 w-full">
        <VehicleInfoBar />
      </div>
    </div>
  );
};

export default VehicleId;
