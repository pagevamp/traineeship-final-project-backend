import { api } from "@/lib/axios";

export const getVehicleType = () => {
  return api.get("/vehicles/types");
};
export const createCustomer = (body: any) => {
  return api.post("/customer", body);
};
export const updateCustomer = (id: string, body: any) => {
  return api.put(`/customer/${id}`, body);
};
export const checkUniqueEmail = (email: string) => {
  return api.get(`/customer/check-unique-email?email=${email}`);
};
