import { securedServerApi } from "@/app/lib/axios/server/secured";

export const getOrderById = async (
  orderId: string,
  token: string
) => {
  const api = securedServerApi(token);
  const { data } = await api.get(`/orders/${orderId}`);
  return data;
};
