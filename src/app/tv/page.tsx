"use client";

import { useEffect, useState, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import {
  getTVDetails,
  getWatchProviders,
  getImageUrl,
  getIMDBUrl,
  getRottenTomatoesSearchUrl,
} from "@/lib/tmdb";
import { MovieDetails, WatchProviders, getTitle, getYear, formatRating, getRatingColor } from "@/types";
import RatingBadge from "@/components/RatingBadge";
import WatchProvidersSection from "@/components/WatchProviders";
import {
  ArrowLeft,
  Calendar,
  ExternalLink,
  Star,
  Users,
  Layers,
  Tv,
  Loader2,
} from "lucide-react";

function TVDetail() {
  const searchParams = useSearchParams();
  const id = parseInt(searchParams.get("id") || "", 10);

  const [show, setShow] = useState<MovieDetails | null>(null);
  const [providers, setProviders] = useState<WatchProviders | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (isNaN(id)) {
      setError("Invalid series ID");
      setLoading(false);
      return;
    }

    setLoading(true);
    Promise.all([getTVDetails(id), getWatchProviders(id, "tv")])
      .then(([showData, providerData]) => {
        setShow(showData);
        setProviders(providerData);
      })
      .catch((e) => setError(e instanceof Error ? e.message : "Failed to load series"))
      .finally(() => setLoading(false));
  }, [id]);

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[60vh] gap-3 text-gray-400">
        <Loader2 className="w-6 h-6 animate-spin" />
        Loading series...
      </div>
    );
  }

  if (error || !show) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[60vh] px-4 text-center">
        <p className="text-gray-400 mb-6">{error || "Series not found"}</p>
        <Link href="/" className="px-6 py-3 rounded-xl bg-brand-600 hover:bg-brand-500 font-semibold">
          Go Home
        </Link>
      </div>
    );
  }

  const title = getTitle(show);
  const year = getYear(show);
  const imdbId = show.imdb_id || show.external_ids?.imdb_id;

  return (
    <div>
      <div className="relative h-[40vh] sm:h-[50vh] overflow-hidden">
        {show.backdrop_path && (
          <Image
            src={getImageUrl(show.backdrop_path, "original")}
            alt={title}
            fill
            className="object-cover"
            priority
          />
        )}
        <div className="absolute inset-0 bg-gradient-to-t from-surface via-surface/80 to-surface/30" />
        <div className="absolute top-6 left-4 sm:left-8">
          <Link
            href="/"
            className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-black/50 backdrop-blur-sm border border-white/10 text-sm hover:bg-black/70 transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            Back
          </Link>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-32 sm:-mt-40 relative z-10 pb-20">
        <div className="flex flex-col md:flex-row gap-8">
          <div className="shrink-0 mx-auto md:mx-0">
            <div className="relative w-56 sm:w-64 aspect-[2/3] rounded-2xl overflow-hidden shadow-2xl shadow-black/50 border border-white/10">
              <Image
                src={getImageUrl(show.poster_path, "w500")}
                alt={title}
                fill
                className="object-cover"
                priority
              />
            </div>
          </div>

          <div className="flex-1 pt-4 md:pt-16">
            <div className="flex items-center gap-2 text-brand-400 text-sm font-medium mb-2">
              <Tv className="w-4 h-4" />
              TV Series
            </div>
            <h1 className="font-display font-bold text-3xl sm:text-4xl lg:text-5xl mb-3">{title}</h1>
            {show.tagline && (
              <p className="text-gray-400 italic text-lg mb-4">&ldquo;{show.tagline}&rdquo;</p>
            )}

            <div className="flex flex-wrap items-center gap-4 mb-6">
              <RatingBadge rating={show.vote_average} size="lg" showLabel />
              <div className="flex items-center gap-1.5 text-gray-400 text-sm">
                <Users className="w-4 h-4" />
                {show.vote_count.toLocaleString()} ratings
              </div>
              <div className="flex items-center gap-1.5 text-gray-400 text-sm">
                <Calendar className="w-4 h-4" />
                {year}
              </div>
              {show.number_of_seasons && (
                <div className="flex items-center gap-1.5 text-gray-400 text-sm">
                  <Layers className="w-4 h-4" />
                  {show.number_of_seasons} season{show.number_of_seasons > 1 ? "s" : ""}
                </div>
              )}
              {show.number_of_episodes && (
                <div className="flex items-center gap-1.5 text-gray-400 text-sm">
                  {show.number_of_episodes} episodes
                </div>
              )}
            </div>

            {show.genres && (
              <div className="flex flex-wrap gap-2 mb-6">
                {show.genres.map((genre) => (
                  <span
                    key={genre.id}
                    className="px-3 py-1 rounded-full bg-white/5 border border-white/10 text-sm text-gray-300"
                  >
                    {genre.name}
                  </span>
                ))}
              </div>
            )}

            <p className="text-gray-300 leading-relaxed mb-8 max-w-3xl">
              {show.overview || "No overview available."}
            </p>

            <div className="flex flex-wrap gap-3 mb-10">
              {imdbId && (
                <a
                  href={getIMDBUrl(imdbId)}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-yellow-500/10 border border-yellow-500/20 text-yellow-400 text-sm font-medium hover:bg-yellow-500/20 transition-colors"
                >
                  <Star className="w-4 h-4" />
                  View on IMDb
                  <ExternalLink className="w-3.5 h-3.5" />
                </a>
              )}
              <a
                href={getRottenTomatoesSearchUrl(title)}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-red-500/10 border border-red-500/20 text-red-400 text-sm font-medium hover:bg-red-500/20 transition-colors"
              >
                Rotten Tomatoes
                <ExternalLink className="w-3.5 h-3.5" />
              </a>
            </div>
          </div>
        </div>

        <div className="grid sm:grid-cols-3 gap-4 mb-10 mt-8">
          <div className="rounded-2xl bg-surface-elevated border border-white/5 p-5 text-center">
            <p className="text-sm text-gray-500 mb-2">Audience Score</p>
            <p className={`text-4xl font-display font-bold ${getRatingColor(show.vote_average)}`}>
              {formatRating(show.vote_average)}
            </p>
            <p className="text-xs text-gray-500 mt-1">out of 10</p>
          </div>
          <div className="rounded-2xl bg-surface-elevated border border-white/5 p-5 text-center">
            <p className="text-sm text-gray-500 mb-2">Total Ratings</p>
            <p className="text-4xl font-display font-bold text-white">
              {show.vote_count >= 1000
                ? `${(show.vote_count / 1000).toFixed(1)}k`
                : show.vote_count}
            </p>
            <p className="text-xs text-gray-500 mt-1">audience votes</p>
          </div>
          <div className="rounded-2xl bg-surface-elevated border border-white/5 p-5 text-center">
            <p className="text-sm text-gray-500 mb-2">Status</p>
            <p className="text-2xl font-display font-bold text-white">{show.status}</p>
          </div>
        </div>

        <WatchProvidersSection
          flatrate={providers?.flatrate}
          rent={providers?.rent}
          buy={providers?.buy}
          free={providers?.free}
          link={providers?.link}
          title={title}
        />
      </div>
    </div>
  );
}

export default function TVPage() {
  return (
    <Suspense
      fallback={
        <div className="flex items-center justify-center min-h-[60vh]">
          <Loader2 className="w-6 h-6 animate-spin text-gray-400" />
        </div>
      }
    >
      <TVDetail />
    </Suspense>
  );
}
