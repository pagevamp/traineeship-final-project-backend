import { departmentListParams } from "@/features/departments/types";
import { api } from "@/lib/axios";

export const createDesignation = (body: {
  name: string;
  department: { id: string };
}) => {
  return api.post("/departments/designations", body);
};

export const getAllDesignations = (
  departmentId: string,
  params: departmentListParams = {}
) => {
  if (!departmentId) {
    throw new Error("departmentId is required to fetch designations");
  }

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

  const url = `/departments/${departmentId}${
    queryParams.toString() ? `?${queryParams.toString()}` : ""
  }`;
  return api.get(url);
};

export const deleteDesignation = (id: string) => {
  return api.delete(`/departments/designations/${id}`);
};

export const updateDesignation = (id: string, body: any) => {
  return api.put(`/departments/designations/${id}`, body);
};
