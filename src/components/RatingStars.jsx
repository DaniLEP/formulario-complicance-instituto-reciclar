// src/components/RatingStars.jsx
import React from "react";
import { Star } from "lucide-react";

export default function RatingStars({ value, onChange }) {
  return (
    <div className="flex space-x-1">
      {[1, 2, 3, 4, 5].map((star) => (
        <Star
          key={star}
          className={`h-6 w-6 cursor-pointer ${
            value >= star ? "text-yellow-400 fill-yellow-400" : "text-gray-300"
          }`}
          onClick={() => onChange(star)}
        />
      ))}
    </div>
  );
}
