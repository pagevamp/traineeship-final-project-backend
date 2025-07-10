import { api } from "@/lib/axios";

export const getAllInventoryList = (params: any) => {
  const queryParams = new URLSearchParams();

  if (params.searchParam?.trim()) {
    queryParams.append("search", params.searchParam.trim());
  }

  if (params.order?.trim()) {
    queryParams.append("order", params.order.trim());
  }
  if (params.sortBy?.trim()) {
    queryParams.append("sortBy", params.sortBy.trim());
  }

  if (params.limit) {
    queryParams.append("limit", params.limit.toString());
  }

  if (params.offset) {
    queryParams.append("offset", params.offset.toString());
  }

  if (params.createdById) {
    queryParams.append("createdById", params.createdById.toString());
  }

  const queryString = queryParams.toString();
  const url = `/products/all${queryString ? `?${queryString}` : ""}`;

  return api.get(url);
};

export const getAllUnitOfMeasure = (body: any) => {
  return api.post("/settings/unit-measure/get", body);
};

export const getInventoryById = (params: any) => {
  return api.get(`/products/${params.id}`);
};

export const createInventory = (body: any) => {
  return api.post("/products", body);
};

export const updateInventory = (body: any) => {
  return api.put(`/products/${body.id}`, body);
};
