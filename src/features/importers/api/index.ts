import { userListParams } from "@/features/users/types";
import { api } from "@/lib/axios";

export const createImporter = (body: any) => {
  return api.post("/importers", body);
};
export const getAllNetTerms = (params: any) => {
  const queryParams = new URLSearchParams();

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

  const url = `/settings/net-terms${
    queryParams.toString() ? `?${queryParams.toString()}` : ""
  }`;
  return api.get(url);
};
export const getAllImporters = (params: userListParams = {}) => {
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

  const url = `/importers${
    queryParams.toString() ? `?${queryParams.toString()}` : ""
  }`;
  return api.get(url);
};
export const getImporterById = (id: string) => {
  return api.get(`/importers/${id}`);
};

export const updateImporter = (id: string, body: any) => {
  return api.put(`/importers/${id}`, body);
};
export const getAllCountryList = () => {
  return api.get("/country/states");
};
