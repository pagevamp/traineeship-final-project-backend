import { api } from "@/lib/axios";

export const getVehicleType = () => {
  return api.get("/vehicles/types");
};
export const createCustomer = (body: any) => {
  return api.post("/customer", body);
};
