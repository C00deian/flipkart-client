export type CartProductType = {
  id: number;
  name: string;
  description: string;
  category: string;
  brand: string;
  selectedImage: SelectedImageType;
  quantity: number;
  price: number;
};

export type SelectedImageType = {
  color: string;
  colorCode: string;
  image: string;
};
