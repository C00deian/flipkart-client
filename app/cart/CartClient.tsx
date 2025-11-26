'use client'

import { useCart } from "@/hooks/useCart"
import Link from "next/link";
import { MdArrowBack } from "react-icons/md";
import { Heading } from "../components/Heading";
import Horizontal from "../components/Horizontal";
import Button from "../components/Button";


export const CartClient = () => {
    const { cartProducts } = useCart();

    if (!cartProducts || cartProducts.length === 0) {
        return (
            <div className="flex flex-col items-center">
                <div>
                    <div className="text-2xl">Your cart is empty</div>
                    <div className="">
                        <Link href={"/"}
                            className=" text-slate-500 flex items-center gap-1 mt-2" >
                            <MdArrowBack />
                            <span>Start Shopping</span>
                        </Link>
                    </div>
                </div>
            </div>
        )
    }

    return (
        <div>
            <Heading
                title="Shopping Cart"
                center
            />
            <div className="
            grid
            grid-cols-5
            text-xs
            gap-4
            items-center
            mt-8
            ">
                <div className="col-span-2 justify-self-start">PRODUCT</div>
                <div className="justify-self-center">PRICE</div>
                <div className="justify-self-center">QUANTITY</div>
                <div className="justify-self-end">TOTAL</div>
            </div>
         
            <div>
                {cartProducts && cartProducts.map((item) => {
                    return <div key={item.id}>
                        {
                            item.name
                        }
                    </div>
                })}
            </div>
            <div className="flex  border-t-2 border-slate-200
            py-4 justify-between gap-4
            ">
                <div className="w-[90px]">
                    <Button label="Clear Cart" onClick={() => { }} small outline />
                </div>
                <div className="flex text-sm flex-col gap-1 items-start">

                    <div className="flex justify-between w-full text-base font-semibold">
                        <span className="">Subtotal</span>
                        <span className="">$ 1000</span>
                    </div>

                    <p className=" text-slate-500">Taxes and shipping calculated at checkout</p>
                    <Button label="Checkout" onClick={() => { }} />
                    <Link href={"/"}
                        className=" text-slate-500 flex items-center gap-1 mt-2" >
                        <MdArrowBack />
                        <span>Continue Shopping</span>
                    </Link>
                </div>

            </div>

        </div>
    )
}
