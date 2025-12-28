"use client";
import { formatePrice } from "@/app/utils/formatePrice";
import { truncateText } from "@/app/utils/truncateText";
import { Rating } from "@mui/material";
import Image from "next/image";
import { useRouter } from "next/navigation";
import React from "react";

interface ProductCardProps {
  data: any;
}

export const getProductRating = (data: any) => {
  if (!data.reviews || data.reviews.length === 0) {
    return 0;
  }

  const total = data.reviews.reduce(
    (acc: number, item: any) => acc + item.rating,
    0
  );

  return total / data.reviews.length;
};


const ProductCard: React.FC<ProductCardProps> = ({ data }) => {


  const router = useRouter();

  return (
    <div onClick={() =>
      router.push(`/product/${data.id}`)
    }
      className="col-span-1
      cursor-pointer
      border-[1.2px]
      border-slate-200
      bg-slate-50
      rounded-sm
      p-2
      transition
      hover:scale-105
      text-center
      tex-sm
      "
    >
      <div
        className="
          flex flex-col
          items-center
          w-full
          gap-1
          "
      >
        <div className="aspect-square overflow-hidden relative w-full">
          <Image
            fill
            src={data.images[0].imageUrl}
            alt={data.name}
            className="w-full h-full object-contain"
          />
        </div>
        <div className="mt-4">{truncateText(data.name)}</div>
        <div>
          <Rating value={getProductRating(data)} readOnly />
        </div>
        <div>{data.reviews.length} reviews </div>
        <div className="font-semibold">{formatePrice(data.price)}</div>
      </div>
    </div>
  );
};

export default ProductCard;
