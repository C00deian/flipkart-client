"use client";

import { createContext, useCallback, useEffect, useState } from "react";
import { CartContextType } from "@/app/types/CartContextType";
import { CartProductType } from "@/app/types/CartProductTypes";
import toast from "react-hot-toast";

export const CartContext = createContext<CartContextType | null>(null);

export const CartContextProvider = ({ children }: { children: React.ReactNode }) => {
  const [cartTotalQty, setCartTotalQty] = useState(0);
  const [cartProducts, setCartProducts] = useState<CartProductType[]>([]);
  const [cartTotalAmount, setCartTotalAmount] = useState(0);

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


  const handleClearCart = useCallback(() => { 
    setCartProducts([]);
    setCartTotalQty(0);
    localStorage.setItem("eShopCartItems" , JSON.stringify(null))

  },[cartProducts])



  useEffect(() => {
    const cartItems: any = localStorage.getItem("eShopCartItems")
    const cProducts: CartProductType[] = JSON.parse(cartItems);
    setCartProducts(cProducts);
  }, [])

  useEffect(() => {
    const getTotal = () => {

      if (cartProducts) {
        const { total, qty } = cartProducts?.reduce((acc, item) => {
          const itemTotal = item.price * item.quantity;
        
          acc.total += itemTotal;
          acc.qty += item.quantity;
          return acc;
        },
          { total: 0, qty: 0 }
        );

        setCartTotalQty(qty);
        setCartTotalAmount(total);
      }
    };

    getTotal();

  }, [cartProducts])

  const value: CartContextType = {
    cartTotalQty,
    cartProducts,
    cartTotalAmount,
    handleAddProductToCart,
    handleRemoveProductFromCart,
    handleCartQtyIncrease,
    handleCartQtyDecrease,
    handleClearCart
  };

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
};
