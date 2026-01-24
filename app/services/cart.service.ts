import { securedApi } from "../lib/ClientUrlBase";
import { CartDto , CartItemDto } from "../types/CartProductTypes";

// Create cart
export const createCart = async (): Promise<CartDto> => {
  const res = await securedApi.post<CartDto>("/carts");
  return res.data;
};

// Add item
export const addItemToCart = async (
  userId: string,
  productId: string,
  quantity = 1
): Promise<CartItemDto> => {
  const res = await securedApi.post<CartItemDto>(
    `/carts/${userId}/items`,
    { productId, quantity }
  );
  return res.data;
};
