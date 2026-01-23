'use client';

import { Heading } from "@/app/components/Heading";
import Inputs from "@/app/components/inputs/Inputs";
import Button from "@/app/components/Button";

import { CategoryFormType, categorySchema } from "./schema";

import { useForm, SubmitHandler } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import toast from "react-hot-toast";

import { uploadToCloudinary } from "@/app/components/helper/uploadToCloudinary";
import { addCategory } from "@/app/services/auth.service";

export const AddCategoryForm = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [imageFile, setImageFile] = useState<File | null>(null);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<CategoryFormType>({
    resolver: zodResolver(categorySchema),
    defaultValues: {
      name: "",
      slug: "",
      imageUrl: "",
    },
    mode: "all",
  });

const onSubmit: SubmitHandler<CategoryFormType> = async (data) => {
  setIsLoading(true);

  try {
    // ✅ File comes from RHF
    const file = data.imageUrl[0];

    const uploaded = await uploadToCloudinary(file);

    const payload = {
      name: data.name,
      slug: data.slug,
      imageUrl: uploaded.secure_url,
    };

    await addCategory(payload);

    toast.success("Category created successfully");
    reset();

  } catch (error) {
    console.error(error);
    toast.error("Failed to create category");
  } finally {
    setIsLoading(false);
  }
};


  return (
    <>
      <Heading title="Add New Category" />

      <Inputs<CategoryFormType>
        id="name"
        label="Category Name"
        register={register}
        errors={errors}
        disabled={isLoading}
        required
      />

      <Inputs<CategoryFormType>
        id="slug"
        label="Slug"
        register={register}
        errors={errors}
        disabled={isLoading}
        required
      />

      {/* Category Image */}
      <div className="flex flex-col gap-2">
  <label className="font-medium">Category Image</label>

  <input
    type="file"
    accept="image/*"
    disabled={isLoading}
    {...register("imageUrl")}
  />

  {errors.imageUrl && (
    <p className="text-sm text-red-500">
      {errors.imageUrl.message as string}
    </p>
  )}
</div>

      <Button
        label={isLoading ? "Loading..." : "Add Category"}
        onClick={handleSubmit(onSubmit)}
        disabled={isLoading}
      />
    </>
  );
};
