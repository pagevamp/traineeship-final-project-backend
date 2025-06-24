import { api } from "@/lib/axios";
import { departmentListParams } from "../types";

export const createDepartment = (body: any) => {
  return api.post("/departments", body);
};

export const getDepartments = () => {
  return api.get("/departments");
};

export const getAllDepartments = (params: departmentListParams = {}) => {
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
  const url = `/departments${queryString ? `?${queryString}` : ""}`;

  return api.get(url);
};

export const getDepartmentDetailById = (id: string) => {
  return api.get(`/departments/${id}`);
};
