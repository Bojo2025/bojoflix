import { formatRating, getRatingColor, getRatingLabel } from "@/types";
import { Star } from "lucide-react";
import { cn } from "@/lib/utils";

interface RatingBadgeProps {
  rating: number;
  size?: "sm" | "md" | "lg";
  showLabel?: boolean;
  className?: string;
}

export default function RatingBadge({
  rating,
  size = "md",
  showLabel = false,
  className,
}: RatingBadgeProps) {
  const sizeClasses = {
    sm: "text-xs px-2 py-0.5 gap-1",
    md: "text-sm px-2.5 py-1 gap-1.5",
    lg: "text-base px-3 py-1.5 gap-2",
  };

  const iconSizes = {
    sm: "w-3 h-3",
    md: "w-3.5 h-3.5",
    lg: "w-4 h-4",
  };

  return (
    <div className={cn("flex items-center gap-2", className)}>
      <div
        className={cn(
          "inline-flex items-center font-semibold rounded-lg bg-black/60 backdrop-blur-sm border border-white/10",
          sizeClasses[size],
          getRatingColor(rating)
        )}
      >
        <Star className={cn(iconSizes[size], "fill-current")} />
        {formatRating(rating)}
      </div>
      {showLabel && (
        <span className={cn("text-sm font-medium", getRatingColor(rating))}>
          {getRatingLabel(rating)}
        </span>
      )}
    </div>
  );
}
