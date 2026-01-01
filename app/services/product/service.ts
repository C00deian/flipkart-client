import { publicApi } from "@/app/lib/axios/public";
import { Product } from "@/app/types/ProductFormType";
import { ApiResponse } from "@/app/types/User";

export const getAllProducts = async (): Promise<Product[]> => {
  const res = await publicApi.get<ApiResponse<Product[]>>("/products");
  return res.data.data;
};

export const getProduct = async (id: string): Promise<Product> => {
  const res = await publicApi.get<ApiResponse<Product>>(`/products/${id}`);
  return res.data.data;
};




