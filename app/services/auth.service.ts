import type {
  CurrentUser,
  LoginRequest,
  RegisterRequest,
  RegisterResponse,
} from "../types/User";

import { Category, CategoryFormType, Product, ProductFormType } from "../types/ProductFormType";
import { publicApi, securedApi } from "@/app/lib/ClientUrlBase";
import { AxiosResponse } from "axios";

export const signUp = async (
  data: RegisterRequest
): Promise<RegisterResponse> => {
  const res = await publicApi.post<RegisterResponse>("/auth/register", data);

  return res.data;
};

export const login = async (data: LoginRequest): Promise<RegisterResponse> => {
  const res = await publicApi.post<RegisterResponse>("/auth/login", data);

  return res.data;
};



export const getAllCategory = async (): Promise<Category[]> => {
  const res = await publicApi.get<Category[]>("/products/categories");
  return res.data;
};


// export const getAllProducts = async () => {
//   const res = await securedApi.get("/products");
//   return res;
// };

export const getAllOrders = async () => {
  const res = await securedApi.get("/orders");
  return res;
};


export const deleteProduct = async (id: number) => {
  const res = await securedApi.delete(`/products/${id}`);
  return res;
};

export const addProduct = async (
  data: ProductFormType
): Promise<ProductFormType> => {
  const res = await securedApi.post<ProductFormType>(
    "/products/add-product",
    data
  );

  return res.data;
};

export const dispatchOrder = async (id: string) => {
    return await securedApi.put(`/orders/${id}/dispatch`); 
};

export const deliverOrder = async (id: string) => {
    return await securedApi.put(`/orders/${id}/deliver`);
};

// @/app/services/auth.service.ts

export const toggleStockStatus = async (id: number) => {
    return await securedApi.put(`/products/${id}/stock`);
};

export const getOrderByID = async (id: string) => {
    return await securedApi.get(`/orders/${id}`);
};


export const getCurrentUser = async () => {
  const res = await securedApi.get<CurrentUser>("/auth/me");
  return res.data;
};

export const addCategory = async (
  data: CategoryFormType
): Promise<CategoryFormType> => {
  const res = await securedApi.post<CategoryFormType>(
    "/products/add-category",
    data
  );

  return res.data;
};
