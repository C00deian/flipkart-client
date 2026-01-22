"use client"

import Container from '@/app/components/Container'
import { useContext, useEffect, useState } from 'react'
import ManageProductsClient from './ManageProductsClient'
import { getAllProducts } from '@/app/services/auth.service'
import { AuthContext } from '@/app/context/AuthContext';
import NullData from '@/app/components/NullData'
import toast from 'react-hot-toast';

const ManageProducts = () => {

  const [products, setProducts] = useState([]);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await getAllProducts();
        console.log("products",)
        setProducts(res.data.data);
      } catch (error) {
        console.error("Error fetching categories", error);
        toast.error("Failed to load categories");
      }
    };
    fetchProducts();
  }, []);

const auth = useContext(AuthContext);

 if (!auth || auth.isLoading) return <NullData title="please wait loading..."/>;

if (auth.currentUser?.role !== "ADMIN") {
  return <NullData title='OOps! Access denied'/>;
}

  return (
    <div className='pt-8'>
      <Container>
        <ManageProductsClient products={products} />
      </Container>
    </div>
  )
}

export default ManageProducts