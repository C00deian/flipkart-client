"use client";

import { createContext, useCallback, useEffect, useState } from "react";
import { CartContextType } from "@/app/types/CartContextType";
import { CartProductType } from "@/app/types/CartProductTypes";
import toast from "react-hot-toast";

export const CartContext = createContext<CartContextType | null>(null);

export const CartContextProvider = ({ children }: { children: React.ReactNode }) => {
  const [cartTotalQty, setCartTotalQty] = useState(10);
  const [cartProducts, setCartProducts] = useState<CartProductType[]>([]);




  const handleAddProductToCart = useCallback((product: CartProductType) => {
    setCartProducts((prev) => {
      let updatedCart;
      prev
        ? updatedCart = [...prev, product]
        : updatedCart = [product];
      localStorage.setItem("eShopCartItems",
        JSON.stringify(updatedCart)
      );

      return updatedCart;
    });
       toast.success("Product added to cart.");
  }, [cartProducts])


  const handleRemoveProductFromCart = useCallback((product: CartProductType) => {
    if(cartProducts) {
      const filteredProduct = cartProducts.filter((item) => {
        return item.id !== product.id
      })
      setCartProducts(filteredProduct);
         localStorage.setItem("eShopCartItems",
        JSON.stringify(filteredProduct))
    }
       toast.success("Product removed.");
  }, [cartProducts])



  const handleCartQtyIncrease = useCallback((product: CartProductType) => {
    let updatedCart;
    if (product.quantity === 49) {
      return toast.error("Oops! Maximum reached");
    }
    if (cartProducts) {
      updatedCart = [...cartProducts];

      const existingIndex = cartProducts.findIndex((item) => item.id === product.id);
 
      if (existingIndex > -1) {
        updatedCart[existingIndex].quantity =
          updatedCart[existingIndex].quantity + 1;
      }

      setCartProducts(updatedCart)
      localStorage.setItem("eShopCartItems",
        JSON.stringify(updatedCart));

    }
  }, [cartProducts])

   const handleCartQtyDecrease = useCallback((product: CartProductType) => {
    let updatedCart;
    if (product.quantity === 1) {
      return toast.error("Oops! Minimum reached");
    }
    if (cartProducts) {
      updatedCart = [...cartProducts];

      const existingIndex = cartProducts.findIndex((item) => item.id === product.id);
 
      if (existingIndex > -1) {
        updatedCart[existingIndex].quantity =
          updatedCart[existingIndex].quantity - 1;
      }

      setCartProducts(updatedCart)
      localStorage.setItem("eShopCartItems",
        JSON.stringify(updatedCart));

    }
  }, [cartProducts])

  useEffect(() => {
    const cartItems: any = localStorage.getItem("eShopCartItems")
    const cProducts: CartProductType[] = JSON.parse(cartItems);
    setCartProducts(cProducts);
  }, [])

  const value: CartContextType = {
    cartTotalQty,
    cartProducts,
    handleAddProductToCart,
    handleRemoveProductFromCart,
    handleCartQtyIncrease,
    handleCartQtyDecrease
  };

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
};
