"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { CATEGORIES, Movie } from "@/types";
import CategoryCard from "@/components/CategoryCard";
import MovieGrid from "@/components/MovieGrid";
import { getTrending, getTopRated } from "@/lib/tmdb";
import { Sparkles, TrendingUp, Star, ArrowRight, Loader2 } from "lucide-react";

export default function HomePage() {
  const [trendingMovies, setTrendingMovies] = useState<Movie[]>([]);
  const [trendingTV, setTrendingTV] = useState<Movie[]>([]);
  const [topAmerican, setTopAmerican] = useState<Movie[]>([]);
  const [topIndian, setTopIndian] = useState<Movie[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    Promise.all([
      getTrending("movie"),
      getTrending("tv"),
      getTopRated("american", "movie"),
      getTopRated("indian", "movie"),
    ])
      .then(([movies, tv, american, indian]) => {
        setTrendingMovies(movies.results);
        setTrendingTV(tv.results);
        setTopAmerican(american.results);
        setTopIndian(indian.results);
      })
      .catch((e) => setError(e instanceof Error ? e.message : "Failed to load data"))
      .finally(() => setLoading(false));
  }, []);

  return (
    <div>
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 bg-hero-glow" />
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 sm:py-28">
          <div className="max-w-3xl animate-fade-in">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-brand-500/10 border border-brand-500/20 text-brand-400 text-sm font-medium mb-6">
              <Sparkles className="w-4 h-4" />
              No account required — browse freely
            </div>
            <h1 className="font-display font-extrabold text-4xl sm:text-5xl lg:text-6xl tracking-tight mb-6">
              <span className="text-gradient">Discover the Best</span>
              <br />
              <span className="text-brand-500">Rated Entertainment</span>
            </h1>
            <p className="text-lg text-gray-400 leading-relaxed mb-8 max-w-2xl">
              Explore top-rated movies and TV series across American, Indian, and
              International cinema. Find what&apos;s in theatres and streaming on OTT
              platforms — all ranked by audience ratings.
            </p>
            <div className="flex flex-wrap gap-4">
              <Link
                href="/browse/american/theatre/"
                className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-brand-600 hover:bg-brand-500 font-semibold transition-all shadow-lg shadow-brand-500/25 hover:shadow-brand-500/40"
              >
                Browse In Theatre
                <ArrowRight className="w-4 h-4" />
              </Link>
              <Link
                href="/browse/american/ott/"
                className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-white/10 hover:bg-white/15 border border-white/10 font-semibold transition-all"
              >
                Stream on OTT
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {error && (
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-8">
          <div className="rounded-xl bg-yellow-500/10 border border-yellow-500/20 p-4 text-yellow-200 text-sm">
            <strong>Setup required:</strong> {error}. Copy{" "}
            <code className="bg-black/30 px-1.5 py-0.5 rounded">.env.example</code> to{" "}
            <code className="bg-black/30 px-1.5 py-0.5 rounded">.env.local</code> and add your
            TMDB API key as <code className="bg-black/30 px-1.5 py-0.5 rounded">NEXT_PUBLIC_TMDB_API_KEY</code>.
          </div>
        </div>
      )}

      {loading && (
        <div className="flex items-center justify-center py-20 gap-3 text-gray-400">
          <Loader2 className="w-6 h-6 animate-spin" />
          Loading top picks...
        </div>
      )}

      {!loading && (
        <>
          <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
            <div className="flex items-center gap-3 mb-8">
              <div className="w-10 h-10 rounded-xl bg-brand-500/10 flex items-center justify-center">
                <Star className="w-5 h-5 text-brand-500" />
              </div>
              <div>
                <h2 className="font-display font-bold text-2xl">Browse by Region</h2>
                <p className="text-gray-500 text-sm">American · Indian · International</p>
              </div>
            </div>
            <div className="grid md:grid-cols-3 gap-6">
              {CATEGORIES.map((category) => (
                <CategoryCard key={category.id} category={category} />
              ))}
            </div>
          </section>

          {trendingMovies.length > 0 && (
            <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
              <div className="flex items-center justify-between mb-8">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-orange-500/10 flex items-center justify-center">
                    <TrendingUp className="w-5 h-5 text-orange-400" />
                  </div>
                  <div>
                    <h2 className="font-display font-bold text-2xl">Trending Movies</h2>
                    <p className="text-gray-500 text-sm">Most popular this week</p>
                  </div>
                </div>
                <Link
                  href="/browse/american/ott/?type=movie"
                  className="text-sm text-brand-400 hover:text-brand-300 flex items-center gap-1"
                >
                  View all <ArrowRight className="w-4 h-4" />
                </Link>
              </div>
              <MovieGrid movies={trendingMovies.slice(0, 12)} mediaType="movie" />
            </section>
          )}

          {trendingTV.length > 0 && (
            <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
              <div className="flex items-center justify-between mb-8">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-purple-500/10 flex items-center justify-center">
                    <TrendingUp className="w-5 h-5 text-purple-400" />
                  </div>
                  <div>
                    <h2 className="font-display font-bold text-2xl">Trending TV Series</h2>
                    <p className="text-gray-500 text-sm">Binge-worthy shows</p>
                  </div>
                </div>
                <Link
                  href="/browse/american/ott/?type=tv"
                  className="text-sm text-brand-400 hover:text-brand-300 flex items-center gap-1"
                >
                  View all <ArrowRight className="w-4 h-4" />
                </Link>
              </div>
              <MovieGrid movies={trendingTV.slice(0, 12)} mediaType="tv" />
            </section>
          )}

          {topAmerican.length > 0 && (
            <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
              <div className="flex items-center justify-between mb-8">
                <div>
                  <h2 className="font-display font-bold text-2xl">🇺🇸 Top Rated American</h2>
                  <p className="text-gray-500 text-sm">Highest audience-rated Hollywood films</p>
                </div>
                <Link
                  href="/browse/american/ott/"
                  className="text-sm text-brand-400 hover:text-brand-300 flex items-center gap-1"
                >
                  View all <ArrowRight className="w-4 h-4" />
                </Link>
              </div>
              <MovieGrid movies={topAmerican.slice(0, 6)} mediaType="movie" showRank />
            </section>
          )}

          {topIndian.length > 0 && (
            <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 pb-20">
              <div className="flex items-center justify-between mb-8">
                <div>
                  <h2 className="font-display font-bold text-2xl">🇮🇳 Top Rated Indian</h2>
                  <p className="text-gray-500 text-sm">Bollywood & regional cinema favorites</p>
                </div>
                <Link
                  href="/browse/indian/ott/"
                  className="text-sm text-brand-400 hover:text-brand-300 flex items-center gap-1"
                >
                  View all <ArrowRight className="w-4 h-4" />
                </Link>
              </div>
              <MovieGrid movies={topIndian.slice(0, 6)} mediaType="movie" showRank />
            </section>
          )}
        </>
      )}
    </div>
  );
}
