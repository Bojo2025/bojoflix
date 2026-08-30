"use client";

import { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import Link from "next/link";
import { getMovies } from "@/lib/tmdb";
import {
  RegionCategory,
  ViewingType,
  MediaType,
  Movie,
  getCategoryConfig,
  VIEWING_TYPES,
} from "@/types";
import CategoryTabs from "@/components/CategoryTabs";
import MovieGrid from "@/components/MovieGrid";
import { Film, Tv, Loader2 } from "lucide-react";

interface BrowseContentProps {
  category: RegionCategory;
  viewingType: ViewingType;
}

export default function BrowseContent({ category, viewingType }: BrowseContentProps) {
  const searchParams = useSearchParams();
  const mediaType = (searchParams.get("type") === "tv" ? "tv" : "movie") as MediaType;
  const page = parseInt(searchParams.get("page") || "1", 10) || 1;

  const [movies, setMovies] = useState<Movie[]>([]);
  const [totalPages, setTotalPages] = useState(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const catConfig = getCategoryConfig(category);
  const viewingConfig = VIEWING_TYPES.find((v) => v.id === viewingType)!;

  useEffect(() => {
    setLoading(true);
    setError(null);

    getMovies(category, viewingType, mediaType, page)
      .then((data) => {
        const sorted = [...data.results].sort((a, b) => b.vote_average - a.vote_average);
        setMovies(sorted);
        setTotalPages(data.total_pages);
      })
      .catch((e) => {
        setError(e instanceof Error ? e.message : "Failed to load content");
        setMovies([]);
      })
      .finally(() => setLoading(false));
  }, [category, viewingType, mediaType, page]);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      <div className="mb-10 animate-slide-up">
        <div className="flex items-center gap-3 mb-2">
          <span className="text-3xl">{catConfig.flag}</span>
          <h1 className="font-display font-bold text-3xl sm:text-4xl">
            {catConfig.label}{" "}
            <span className="text-brand-500">{viewingConfig.label}</span>
          </h1>
        </div>
        <p className="text-gray-400 flex items-center gap-2">
          {mediaType === "movie" ? (
            <Film className="w-4 h-4" />
          ) : (
            <Tv className="w-4 h-4" />
          )}
          Best rated {mediaType === "movie" ? "movies" : "TV series"} sorted by audience score
        </p>
      </div>

      <div className="mb-10">
        <CategoryTabs
          category={category}
          viewingType={viewingType}
          mediaType={mediaType}
        />
      </div>

      {error && (
        <div className="rounded-xl bg-yellow-500/10 border border-yellow-500/20 p-4 text-yellow-200 text-sm mb-8">
          {error}
        </div>
      )}

      {loading ? (
        <div className="flex items-center justify-center py-20 gap-3 text-gray-400">
          <Loader2 className="w-6 h-6 animate-spin" />
          Loading...
        </div>
      ) : (
        <MovieGrid
          movies={movies}
          mediaType={mediaType}
          showRank
          emptyMessage={`No ${mediaType === "movie" ? "movies" : "series"} found in this category.`}
        />
      )}

      {!loading && totalPages > 1 && (
        <div className="flex justify-center gap-2 mt-12">
          {page > 1 && (
            <Link
              href={`/browse/${category}/${viewingType}/?type=${mediaType}&page=${page - 1}`}
              className="px-5 py-2.5 rounded-xl bg-white/5 border border-white/10 text-sm font-medium hover:bg-white/10 transition-colors"
            >
              ← Previous
            </Link>
          )}
          <span className="px-5 py-2.5 text-sm text-gray-500">
            Page {page} of {totalPages}
          </span>
          {page < totalPages && (
            <Link
              href={`/browse/${category}/${viewingType}/?type=${mediaType}&page=${page + 1}`}
              className="px-5 py-2.5 rounded-xl bg-brand-600 hover:bg-brand-500 text-sm font-medium transition-colors"
            >
              Next →
            </Link>
          )}
        </div>
      )}
    </div>
  );
}
