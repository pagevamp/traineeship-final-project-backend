import { api } from "@/lib/axios";
import { Obj } from "@/types";

export const loginEmail = (body: Obj) => {
  return api.post("/auth/login", body);
};
