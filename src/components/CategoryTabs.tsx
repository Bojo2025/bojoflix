import Link from "next/link";
import { RegionCategory, ViewingType, CATEGORIES, VIEWING_TYPES } from "@/types";
import { cn } from "@/lib/utils";
import { Film, Tv } from "lucide-react";

interface CategoryTabsProps {
  category: RegionCategory;
  viewingType: ViewingType;
  mediaType?: "movie" | "tv";
}

export default function CategoryTabs({
  category,
  viewingType,
  mediaType = "movie",
}: CategoryTabsProps) {
  return (
    <div className="space-y-6">
      {/* Region tabs */}
      <div className="flex flex-wrap gap-2">
        {CATEGORIES.map((cat) => (
          <Link
            key={cat.id}
            href={`/browse/${cat.id}/${viewingType}/?type=${mediaType}`}
            className={cn(
              "px-4 py-2 rounded-xl text-sm font-medium transition-all border",
              category === cat.id
                ? "bg-brand-600 border-brand-500 text-white shadow-lg shadow-brand-500/20"
                : "bg-white/5 border-white/10 text-gray-400 hover:text-white hover:bg-white/10"
            )}
          >
            <span className="mr-1.5">{cat.flag}</span>
            {cat.label}
          </Link>
        ))}
      </div>

      {/* Viewing type tabs */}
      <div className="flex flex-wrap gap-2">
        {VIEWING_TYPES.map((vt) => (
          <Link
            key={vt.id}
            href={`/browse/${category}/${vt.id}/?type=${mediaType}`}
            className={cn(
              "px-5 py-2.5 rounded-xl text-sm font-medium transition-all border flex items-center gap-2",
              viewingType === vt.id
                ? "bg-white/10 border-white/20 text-white"
                : "bg-transparent border-white/5 text-gray-500 hover:text-white hover:border-white/10"
            )}
          >
            {vt.id === "theatre" ? (
              <Film className="w-4 h-4" />
            ) : (
              <Tv className="w-4 h-4" />
            )}
            {vt.label}
          </Link>
        ))}
      </div>

      {/* Media type toggle */}
      <div className="flex gap-2">
        <Link
          href={`/browse/${category}/${viewingType}/?type=movie`}
          className={cn(
            "px-4 py-2 rounded-lg text-sm font-medium transition-all",
            mediaType === "movie"
              ? "bg-surface-elevated text-white"
              : "text-gray-500 hover:text-white"
          )}
        >
          Movies
        </Link>
        <Link
          href={`/browse/${category}/${viewingType}/?type=tv`}
          className={cn(
            "px-4 py-2 rounded-lg text-sm font-medium transition-all",
            mediaType === "tv"
              ? "bg-surface-elevated text-white"
              : "text-gray-500 hover:text-white"
          )}
        >
          TV Series
        </Link>
      </div>
    </div>
  );
}
