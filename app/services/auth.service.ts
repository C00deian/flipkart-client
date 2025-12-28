import type {
  LoginRequest,
  RegisterRequest,
  RegisterResponse,
} from "../types/User";

import { ProductFormType } from "../types/ProductFormType";
import { publicApi, securedApi } from "@/app/lib/ClientUrlBase";

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



export const getAllCategory = async () => {
  const res = await publicApi.get("/products/categories");
  return res;
};

export const getAllProducts = async () => {
  const res = await publicApi.get("/products");
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

export const getCurrentUser = async () => {
  const res = await securedApi.get("/auth/me");
  return res;
};
