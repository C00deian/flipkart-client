import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { getAllCategory } from "@/app/services/auth.service";
import { Category } from "@/app/types/ProductFormType";

export const useCategories = () => {
   const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
          const res = await getAllCategory();
          console.log("categories", res)
        setCategories(res);
      } catch {
        toast.error("Failed to load categories");
      } finally {
        setLoading(false);
      }
    };

    fetchCategories();
  }, []);

  return { categories, loading };
};
