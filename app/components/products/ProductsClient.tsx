'use client';

import { useSearchParams } from "next/navigation";
import { useProducts } from "@/hooks/useProducts";
import ProductCard from "./ProductCard";
import NullData from "../NullData";

const ProductsClient = () => {
const searchParams = useSearchParams();
  const categorySlug = searchParams.get("category") ?? undefined;

  const { products, loading, error } = useProducts({
    categorySlug,
  });

  if (loading) return <div>Loading...</div>;
  if (error) return <NullData title={error} />;
  if (!products.length) return <NullData title="No Products Found" />;

  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6 gap-8">{
          products.map((product: any) => {
            return (
              <ProductCard product={product} key={product.id} />
            )
          }
          )}
        </div>
  );
};

export default ProductsClient;
