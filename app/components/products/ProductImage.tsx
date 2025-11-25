"use client";

import { CartProductType, SelectedImageType } from "@/app/types/CartProductTypes";
import Image from "next/image";

interface ProductImageProps {
  cartProduct: CartProductType;
  product: any;
  handleColorSelect: (value: SelectedImageType) => void;
}

export const ProductImage: React.FC<ProductImageProps> = ({
  cartProduct,
  product,
  handleColorSelect,
}) => {
  return (
    <div
      className="
        grid
        grid-cols-6
        gap-4
        h-full
        max-h-[500px]
        min-h-[300px]
        sm:min-h-[400px]
        p-4
      "
    >
      {/* Left side – thumbnails */}
      <div
        className="
          flex
          flex-col
          items-center
          justify-center
          gap-4
          border
          border-slate-200
          rounded-sm
          h-full
          w-24
        "
      >
        {product?.images?.map((image: SelectedImageType) => (
          <div
            key={image.color}
            onClick={() => handleColorSelect(image)}
            className={`
              relative 
              w-[80%]
              h-20 
              rounded 
              cursor-pointer
              border
              ${cartProduct.selectedImage?.color === image.color
                ? "border-teal-500 border"
                : "border-transparent"
              }
            `}
          >
            <Image
              src={image.image}
              alt={image.color}
              fill
              className="object-contain"
            />
          </div>
        ))}
      </div>

      {/* Right side – main selected image */}
      <div className="relative col-span-5 aspect-square">
        {cartProduct?.selectedImage && (
          <Image
            src={cartProduct.selectedImage.image}
            alt={cartProduct.name}
            fill
            className="object-contain w-full
              max-h-[500px]
              min-h-[300px]
              sm:min-h-[400px]
              "
          />
        )}
      </div>

    </div>
  );
};
