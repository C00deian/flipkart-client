"use client"

import { truncateText } from "@/utils/truncateText"
import { CartProductType } from "../types/CartProductTypes"
import Image from "next/image"
import { formatePrice } from "@/utils/formatePrice"
import SetQuantity from "../components/products/SetQuantity"
import Link from "next/link"
import { useCart } from "@/hooks/useCart"

interface ItemContentProps {
    item: CartProductType
}
const CartContent: React.FC<ItemContentProps> = ({ item }) => {
 
    const { handleRemoveProductFromCart,handleCartQtyIncrease , handleCartQtyDecrease} = useCart();

    return (
        <div className="
    grid
    grid-cols-5
    text-xs
    md:text-sm
    border-t-[1.5px]
    border-slate-200
    py-4
      ">
            <div className="flex justify-self-start col-span-2 gap-2 md:gap-4">
                <Link href={`/product/${item.id}`}>
                    <div
                        key={item.id}
                        className={`
                              relative
                               w-[70px]
                               aspect-square
                               rounded cursor-pointer`}
                    >
                        <Image
                            src={item.selectedImage.image}
                            alt={item.name}
                            fill
                            className="object-contain"
                        />
                    </div>
                </Link>
                <div className="flex flex-col justify-between">
                    <Link href={`/product/${item.id}`}>
                        <div>{truncateText(item.name)}</div>
                    </Link>
                    <div>{item.selectedImage.color}</div>
                    <div className="w-[70px]">
                        <button className="text-slate-500 underline hover:cursor-pointer"
                            onClick={() => handleRemoveProductFromCart(item)}
                        >
                            Remove
                        </button>
                    </div>
                </div>
            </div>
            <div>
                <div className="justify-self-center">
                    {formatePrice(item.price)}
                </div>
            </div>

            <div>
                <div className="justify-self-center">
                    <SetQuantity
                        cartCounter={true}
                        cartProduct={item}
                        handleQtyDecrease={() => handleCartQtyDecrease(item)}
                        handleQtyIncrease={() =>handleCartQtyIncrease(item)}
                    />
                </div>
            </div>
            <div>
                <div className="justify-self-end font-semibold">
                    {formatePrice(item.price * item.quantity)}
                </div>
            </div>

        </div>
    )
}

export default CartContent