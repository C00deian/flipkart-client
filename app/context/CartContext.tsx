"use client";

import { createContext, useCallback, useEffect, useState } from "react";
import { CartContextType } from "@/app/types/CartContextType";
import { CartProductType } from "@/app/types/CartProductTypes";

export const CartContext = createContext<CartContextType | null>(null);

export const CartContextProvider = ({ children }: { children: React.ReactNode }) => {
  const [cartTotalQty, setCartTotalQty] = useState(10);
  const [cartProducts, setCartProducts] = useState<CartProductType[]>([]);




 const handleAddProductToCart = useCallback((product: CartProductType) => {
 setCartProducts((prev) => {
  const updatedCart = [...(prev ?? []), product];
  localStorage.setItem("eShopCartItems", JSON.stringify(updatedCart));
  return updatedCart;
});

}, []);

  useEffect(() => {
    const cartItems: any = localStorage.getItem("eShopCartItems")
    const cProducts: CartProductType[] = JSON.parse(cartItems);
    setCartProducts(cProducts);
  },[])

  const value: CartContextType = {
    cartTotalQty,
    cartProducts,
    handleAddProductToCart,
  };

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
};
