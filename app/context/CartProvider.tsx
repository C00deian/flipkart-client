"use client";

import { useCallback, useEffect, useState } from "react";
import toast from "react-hot-toast";
import { CartContext } from "./CartContext";
import { CartContextType } from "@/app/types/CartContextType";
import { CartProductType } from "@/app/types/CartProductTypes";

export const CartProvider = ({ children }: { children: React.ReactNode }) => {
  const [cartTotalQty, setCartTotalQty] = useState<number>(0);
  const [cartProducts, setCartProducts] = useState<CartProductType[]>([]);
  const [cartTotalAmount, setCartTotalAmount] = useState<number>(0);

  // 🟢 Add product
  const handleAddProductToCart = useCallback((product: CartProductType) => {
    setCartProducts((prev) => {
      const updatedCart = [...prev, product];
      localStorage.setItem("eShopCartItems", JSON.stringify(updatedCart));
      return updatedCart;
    });
    toast.success("Product added to cart.");
  }, []);

  // 🔴 Remove product
  const handleRemoveProductFromCart = useCallback((product: CartProductType) => {
    setCartProducts((prev) => {
      const filtered = prev.filter((item) => item.id !== product.id);
      localStorage.setItem("eShopCartItems", JSON.stringify(filtered));
      return filtered;
    });
    toast.success("Product removed.");
  }, []);

  // ➕ Increase qty
  const handleCartQtyIncrease = useCallback((product: CartProductType) => {
    setCartProducts((prev) => {
      const updated = [...prev];
      const index = updated.findIndex((item) => item.id === product.id);

      if (index > -1) {
        if (updated[index].quantity === 49) {
          toast.error("Oops! Maximum reached");
          return prev;
        }
        updated[index].quantity += 1;
      }

      localStorage.setItem("eShopCartItems", JSON.stringify(updated));
      return updated;
    });
  }, []);

  // ➖ Decrease qty
  const handleCartQtyDecrease = useCallback((product: CartProductType) => {
    setCartProducts((prev) => {
      const updated = [...prev];
      const index = updated.findIndex((item) => item.id === product.id);

      if (index > -1) {
        if (updated[index].quantity === 1) {
          toast.error("Oops! Minimum reached");
          return prev;
        }
        updated[index].quantity -= 1;
      }

      localStorage.setItem("eShopCartItems", JSON.stringify(updated));
      return updated;
    });
  }, []);

  // 🧹 Clear cart
  const handleClearCart = useCallback(() => {
    setCartProducts([]);
    setCartTotalQty(0);
    setCartTotalAmount(0);
    localStorage.removeItem("eShopCartItems");
  }, []);

  // 🔄 Load cart from localStorage
  useEffect(() => {
    const stored = localStorage.getItem("eShopCartItems");
    if (stored) {
      setCartProducts(JSON.parse(stored));
    }
  }, []);

  // 🧮 Calculate totals
  useEffect(() => {
    const { total, qty } = cartProducts.reduce(
      (acc, item) => {
        acc.total += item.price * item.quantity;
        acc.qty += item.quantity;
        return acc;
      },
      { total: 0, qty: 0 }
    );

    setCartTotalAmount(total);
    setCartTotalQty(qty);
  }, [cartProducts]);

  const value: CartContextType = {
    cartTotalQty,
    cartProducts,
    cartTotalAmount,
    handleAddProductToCart,
    handleRemoveProductFromCart,
    handleCartQtyIncrease,
    handleCartQtyDecrease,
    handleClearCart,
  };

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
};
