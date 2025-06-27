import { api } from "@/lib/axios";

export const getVehicleType = () => {
  return api.get("/vehicles/types");
};
