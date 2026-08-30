"use client";

import { useSearchParams } from "next/navigation";
import { useEffect, useState, Suspense } from "react";
import MovieCard from "@/components/MovieCard";
import { Movie, MediaType } from "@/types";
import { searchContent } from "@/lib/tmdb";
import { Search, Loader2 } from "lucide-react";

function SearchResults() {
  const searchParams = useSearchParams();
  const query = searchParams.get("q") || "";
  const [results, setResults] = useState<Movie[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [inputValue, setInputValue] = useState(query);

  useEffect(() => {
    if (!query) return;

    setLoading(true);
    setError(null);

    searchContent(query)
      .then((data) => {
        const filtered = data.results.filter(
          (item: Movie & { media_type?: string }) =>
            item.media_type === "movie" || item.media_type === "tv"
        );
        setResults(filtered);
      })
      .catch((e) => setError(e instanceof Error ? e.message : "Search failed. Please try again."))
      .finally(() => setLoading(false));
  }, [query]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (inputValue.trim()) {
      window.location.href = `/search/?q=${encodeURIComponent(inputValue.trim())}`;
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      <h1 className="font-display font-bold text-3xl mb-8">Search</h1>

      <form onSubmit={handleSubmit} className="mb-10">
        <div className="relative max-w-xl">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-500" />
          <input
            type="text"
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            placeholder="Search movies & series..."
            className="w-full pl-12 pr-4 py-3.5 bg-white/5 border border-white/10 rounded-2xl text-white placeholder:text-gray-500 focus:outline-none focus:ring-2 focus:ring-brand-500/50 focus:border-brand-500/50 transition-all text-lg"
            autoFocus
          />
        </div>
      </form>

      {loading && (
        <div className="flex items-center justify-center py-20 gap-3 text-gray-400">
          <Loader2 className="w-6 h-6 animate-spin" />
          Searching...
        </div>
      )}

      {error && (
        <div className="rounded-xl bg-red-500/10 border border-red-500/20 p-4 text-red-300 text-sm mb-8">
          {error}
        </div>
      )}

      {!loading && query && !error && (
        <>
          <p className="text-gray-400 mb-6">
            {results.length} result{results.length !== 1 ? "s" : ""} for &ldquo;{query}&rdquo;
          </p>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4 sm:gap-5">
            {results.map((item) => (
              <MovieCard
                key={`${item.id}-${item.media_type}`}
                movie={item}
                mediaType={(item.media_type as MediaType) || "movie"}
              />
            ))}
          </div>
          {results.length === 0 && (
            <p className="text-center text-gray-400 py-20">No results found.</p>
          )}
        </>
      )}

      {!query && !loading && (
        <p className="text-gray-500 text-center py-20">
          Enter a movie or series name to search.
        </p>
      )}
    </div>
  );
}

export default function SearchPage() {
  return (
    <Suspense
      fallback={
        <div className="flex items-center justify-center py-20">
          <Loader2 className="w-6 h-6 animate-spin text-gray-400" />
        </div>
      }
    >
      <SearchResults />
    </Suspense>
  );
}
