import { publicApi } from "@/app/lib/axios/public";
import { Product } from "@/app/types/ProductFormType";
import { ApiResponse } from "@/app/types/User";

export type GetProductsParams = {
  categorySlug?: string;
};

export const getAllProducts = async (
  params?: GetProductsParams
): Promise<Product[]> => {
  const res = await publicApi.get<ApiResponse<Product[]>>("/products", {
    params,
  });

  return res.data.data;
};


export const getProduct = async (id: string): Promise<Product> => {
  const res = await publicApi.get<ApiResponse<Product>>(`/products/${id}`);
  return res.data.data;
};




