'use client';

import { useCategories } from "@/hooks/useCategories";
import Container from "../Container";
import CategoryItem from "./CategoryItem";
import NullData from "../NullData";
import AllCategoryItem from "./AllCategoryItem";

const Categories = () => {
  const { categories, loading } = useCategories();

  if (loading) {
    return <NullData title="Loading, please wait..." />;
  }

  if (!categories || categories.length === 0) {
    return <NullData title="No categories found" />;
  }

  return (
    <div className="bg-white">
      <Container>
        <div className="flex items-center justify-between pt-4 overflow-x-auto scrollbar-hide flex-row">
           <AllCategoryItem />
          {categories.map((item) => (
            <CategoryItem key={item.id} item={item} />
          ))}
        </div>
      </Container>
    </div>
  );
};

export default Categories;
