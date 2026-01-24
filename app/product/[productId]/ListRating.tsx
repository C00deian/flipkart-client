"use client"


import { Heading } from "@/app/components/Heading";
import { Review } from "@/app/types/ProductFormType";
import { maskUserId } from "@/app/utils/masked";
import Rating from "@mui/material/Rating";
import moment from "moment";

interface ListRatingProps {
  reviews: Review[];
}

export const ListRating: React.FC<ListRatingProps> = ({ reviews }) => {
  if (!reviews || reviews.length === 0) return null;

  return (
    <div className="mt-12">
      <Heading title="Ratings & Reviews" /> 

      <div className="flex flex-col gap-8 mt-6">
        {reviews.map((review) => (
          <div
            key={review.id}
            className="border-b pb-6 max-w-[720px]"
          >
            {/* ⭐ Rating + Title */}
            <div className="flex items-center gap-3">
              <Rating
                value={review.rating}
                readOnly
                size="small"
              />
              <span className="font-semibold text-sm">
                {review.title?.trim() || "Best in the market!"}
              </span>
            </div>

            {/* 📝 Review Text */}
            <p className="text-sm text-gray-800 mt-2 leading-relaxed">
              {review.comment}
            </p>

            {/* 👤 User + Meta */}
            <div className="flex flex-wrap items-center gap-3 text-xs text-gray-500 mt-3">
              <span className="font-medium text-gray-700">
                {maskUserId(review.userId)}
              </span>

              {review.isVerifiedPurchase && (
                <span className="text-green-600 font-medium">
                  ✔ Certified Buyer
                </span>
              )}

              <span>
                {moment(review.createdAt).format("MMM, YYYY")}
              </span>
            </div>

            {/* 👍 Helpful */}
            {typeof review.helpfulCount === "number" && (
              <div className="mt-2 text-xs text-gray-500">
                {review.helpfulCount} people found this helpful
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};