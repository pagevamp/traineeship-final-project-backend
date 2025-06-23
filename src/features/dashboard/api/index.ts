import { api } from "@/lib/axios";

export const getProfileInformation = () => {
  return api.get("/users/profile");
};
