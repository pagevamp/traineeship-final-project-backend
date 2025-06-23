import { api } from "@/lib/axios";
import { userListParams } from "../types";

export const getAllModules = () => {
  return api.get("/modules");
};
export const getAllDepartments = () => {
  return api.get("/departments");
};
export const createInternalUser = (body: any) => {
  return api.post("/users/create", body);
};
export const getAllInternalUsers = (params: userListParams = {}) => {
  const queryParams = new URLSearchParams();

  if (params.search?.trim()) {
    queryParams.append("search", params.search.trim());
  }

  if (params.limit) {
    queryParams.append("limit", params.limit.toString());
  }
  if (params.order?.trim()) {
    queryParams.append("order", params.order.trim());
  }
  if (params.sortBy?.trim()) {
    queryParams.append("sortBy", params.sortBy.trim());
  }

  if (params.offset) {
    queryParams.append("offset", params.offset.toString());
  }

  const queryString = queryParams.toString();
  const url = `/users${queryString ? `?${queryString}` : ""}`;

  return api.get(url);
};
export const getUserDetailById = (id: string) => {
  return api.get(`/users/${id}`);
};
