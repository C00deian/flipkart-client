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


// import { createContext, useContext, useState } from "react";
// import toast from "react-hot-toast";

// import { CartContextType } from "@/app/types/CartContextType";
// import { CartDto } from "@/app/types/CartProductTypes";
// import { createCart, addItemToCart } from "@/app/services/cart.service";
// import { AuthContext } from "@/app/context/AuthContext";

// export const CartContext = createContext<CartContextType | null>(null);

// export const CartProvider = ({ children }: { children: React.ReactNode }) => {
//   const auth = useContext(AuthContext);
//   if (!auth) {
//     throw new Error("CartProvider must be used inside AuthProvider");
//   }

//   const { currentUser } = auth;

//   const [cart, setCart] = useState<CartDto | null>(null);
//   const [loading, setLoading] = useState(false);

//   const handleAddProductToCart = async (
//     productId: string,
//     quantity = 1
//   ) => {
//     if (!currentUser) {
//       toast.error("Please login first");
//       return;
//     }

//     try {
//       setLoading(true);

//       let activeCart = cart;
//       if (!activeCart) {
//         activeCart = await createCart();
//         setCart(activeCart);
//       }

//       const addedItem = await addItemToCart(
//         currentUser.id,
//         productId,
//         quantity
//       );

//       // optimistic update
//       setCart((prev) =>
//         prev
//           ? {
//               ...prev,
//               items: [...prev.items, addedItem],
//               totalQuantity: prev.totalQuantity + quantity,
//               totalAmount:
//                 prev.totalAmount + addedItem.unitPrice * quantity,
//             }
//           : prev
//       );

//       toast.success("Product added to cart");
//     } catch (error) {
//       console.error(error);
//       toast.error("Failed to add product");
//     } finally {
//       setLoading(false);
//     }
//   };

//   const handleClearCart = () => {
//     setCart(null);
//   };

//   const value: CartContextType = {
//     cartId: cart?.id ?? null,
//     cart,
//     cartTotalQty: cart?.totalQuantity ?? 0,
//     cartTotalAmount: cart?.totalAmount ?? 0,
//     loading,
//     handleAddProductToCart,
//     handleClearCart,
//   };

//   return (
//     <CartContext.Provider value={value}>
//       {children}
//     </CartContext.Provider>
//   );
// };
