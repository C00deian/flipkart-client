import { securedApi } from "../lib/ClientUrlBase";

export const checkout = async (cartId: string) => {
  const res = await securedApi.post("/carts/checkout", { cartId });

  // 🔥 Stripe Redirect
  window.location.href = res.data.checkoutUrl;
};
