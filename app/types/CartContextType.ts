import { CartProductType } from "./CartProductTypes"

 export type CartContextType = {
    cartTotalQty: number
    cartTotalAmount:number
    cartProducts: CartProductType[]
     handleAddProductToCart: (product: CartProductType) => void;
     handleRemoveProductFromCart: (product: CartProductType) => void;
     handleCartQtyIncrease: (product: CartProductType) => void;
    handleCartQtyDecrease: (product: CartProductType) => void;
    handleClearCart: () => void;
}