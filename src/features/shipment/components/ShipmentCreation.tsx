import React from "react";
import ShipmentAdd from "./ShipmentAdd";
import ShipmentPickup from "./ShipmentPickup";
import ShipmentDetail from "./ShipmentDetails";
import ShipmentItemDetails from "./ShipmentItemDetails";

const ShipmentCreation = () => {
  return (
    <>
      <ShipmentAdd />
      <ShipmentDetail />
      <ShipmentPickup />
      <ShipmentItemDetails />
    </>
  );
};

export default ShipmentCreation;
