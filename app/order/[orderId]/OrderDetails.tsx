
"use client"
import React from 'react'
import { Orders } from '../../types/OrderTypes'
import { Heading } from '../../components/Heading'
import { formatePrice } from '../../utils/formatePrice'
import { MdAccessTimeFilled, MdDone } from 'react-icons/md'
import { Status } from '../../components/Status'

interface OrderDetailsProps {
    order: Orders
}
export const OrderDetails: React.FC<OrderDetailsProps> = ({
    order
}) => {

    return (
        <div className='max-w-[1150px] m-auto flex flex-col gap-2'>
            <div className='mt-8'>
                <Heading
                    title='Order Details'
                />
            </div>
            <div>
                Order ID :{order.id}
            </div>
            <div>Total Amount : <span className='font-bold'>{formatePrice(order.totalPrice)}</span></div>
            <div>
                <div>Payment status : </div>
                <div>
                    {order.paymentStatus === 'PAID' ? (
                        <Status
                            text='Paid'
                            icon={MdDone}
                            bg='bg-green-200'
                            color='text-green-700'
                        />
                    ) : (
                        <Status
                            text='Pending'
                            icon={MdAccessTimeFilled}
                            bg='bg-rose-200'
                            color='text-rose-700'
                        />
                    )}
                </div>
            </div>
        </div>
    )
}
