
export type Product =  {
  id: number;
  name: string;
  description: string;
  category: string;
  brand: string;
  images: UploadedImageType[]
  reviews : Review[]
  quantity: number;
  price: number;
  inStock: boolean
  categoryName:string
};


export type ProductFormType =  {
  // id: string;
  name: string;
  description: string;
  category: string;
  brand: string;
  images: UploadedImageType[]
  reviews : Review[]
  quantity: number;
  price: number;
  inStock : boolean
};


 export type ImageType = {
     color: string
     colorCode: string
     imageUrl : File | null
 }

  export type UploadedImageType = {
     color: string
     colorCode: string
     imageUrl : string
 }

export type Review  = {
    id: string
    userId: string
    productId: string
    comment: string
    createdDate : string
 }