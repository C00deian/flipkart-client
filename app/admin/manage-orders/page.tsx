"use client"
import  { useContext, useEffect, useState } from 'react'
import Container from '@/app/components/Container';
import NullData from '@/app/components/NullData';
import { AuthContext } from '@/app/context/AuthContext';
import { getAllOrders } from '@/app/services/auth.service';
import toast from 'react-hot-toast';
import ManageOrdersClient from './ManageOrdersClient';
import { Orders } from '@/app/types/OrderTypes';


export const ManageOrders = () => {

  const { currentUser } = useContext(AuthContext);

  const [orders, setOrders] = useState<Orders[]>([]);

  useEffect(() => {
    const fetchOrders = async () => {
      try {
      
        const res = await getAllOrders();
        setOrders(res.data);
      } catch (error) {
        console.error("Error fetching orders", error);
        toast.error("Failed to load orders");
      }
    };

    fetchOrders();
  }, []);


  if (!currentUser || currentUser.id !== 7) {
    return <NullData title='Oops! Access Denied' />
  }

  return (
    <div className='pt-8'>
      <Container>
        <ManageOrdersClient orders={orders} />
      </Container>
    </div>
  )
}

export default ManageOrders;