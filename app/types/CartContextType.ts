import { CartProductType } from "./CartProductTypes"

 export type CartContextType = {
    cartTotalQty: number
    cartProducts: CartProductType[]
     handleAddProductToCart: (product: CartProductType) => void;
     handleRemoveProductFromCart: (product: CartProductType) => void;
     handleCartQtyIncrease: (product: CartProductType) => void;
    
}