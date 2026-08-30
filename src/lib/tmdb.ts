import {
  Movie,
  MovieDetails,
  RegionCategory,
  ViewingType,
  MediaType,
  TMDBResponse,
  WatchProviders,
} from "@/types";

const TMDB_BASE = "https://api.themoviedb.org/3";
const TMDB_IMAGE = "https://image.tmdb.org/t/p";

export function getImageUrl(
  path: string | null,
  size: "w200" | "w500" | "w780" | "original" = "w500"
): string {
  if (!path) return "/placeholder-poster.svg";
  return `${TMDB_IMAGE}/${size}${path}`;
}

function getApiKey(): string {
  const key =
    process.env.TMDB_API_KEY ||
    process.env.NEXT_PUBLIC_TMDB_API_KEY;
  if (!key || key === "your_tmdb_api_key_here") {
    throw new Error(
      "TMDB API key is not configured. Add TMDB_API_KEY to .env.local (dev) or NEXT_PUBLIC_TMDB_API_KEY (static build)."
    );
  }
  return key;
}

async function tmdbFetch<T>(endpoint: string, params: Record<string, string> = {}): Promise<T> {
  const apiKey = getApiKey();

  const url = new URL(`${TMDB_BASE}${endpoint}`);
  url.searchParams.set("api_key", apiKey);
  Object.entries(params).forEach(([key, value]) => {
    if (value) url.searchParams.set(key, value);
  });

  const res = await fetch(url.toString());

  if (!res.ok) {
    throw new Error(`TMDB API error: ${res.status} ${res.statusText}`);
  }

  return res.json();
}

function getRegionParams(category: RegionCategory): Record<string, string> {
  switch (category) {
    case "american":
      return {
        with_origin_country: "US",
        with_original_language: "en",
      };
    case "indian":
      return {
        with_origin_country: "IN",
      };
    case "international":
      return {
        without_origin_country: "US|IN",
      };
    default:
      return {};
  }
}

function getRegionCode(category: RegionCategory): string {
  switch (category) {
    case "american":
      return "US";
    case "indian":
      return "IN";
  default:
      return "US";
  }
}

export async function getMovies(
  category: RegionCategory,
  viewingType: ViewingType,
  mediaType: MediaType = "movie",
  page = 1
): Promise<TMDBResponse<Movie>> {
  const regionParams = getRegionParams(category);
  const region = getRegionCode(category);

  if (viewingType === "theatre" && mediaType === "movie") {
    if (category === "american") {
      return tmdbFetch<TMDBResponse<Movie>>("/movie/now_playing", {
        region,
        page: page.toString(),
      });
    }

    return tmdbFetch<TMDBResponse<Movie>>("/discover/movie", {
      ...regionParams,
      "primary_release_date.gte": new Date(Date.now() - 90 * 24 * 60 * 60 * 1000)
        .toISOString()
        .split("T")[0],
      "primary_release_date.lte": new Date().toISOString().split("T")[0],
      sort_by: "vote_average.desc",
      "vote_count.gte": "50",
      page: page.toString(),
    });
  }

  const discoverEndpoint = mediaType === "movie" ? "/discover/movie" : "/discover/tv";

  return tmdbFetch<TMDBResponse<Movie>>(discoverEndpoint, {
    ...regionParams,
    sort_by: "vote_average.desc",
    "vote_count.gte": "100",
    watch_region: region,
    with_watch_providers: viewingType === "ott" ? "8|9|337|350|15|531|386|1899|283|1796" : "",
    page: page.toString(),
  });
}

export async function getTopRated(
  category: RegionCategory,
  mediaType: MediaType = "movie",
  page = 1
): Promise<TMDBResponse<Movie>> {
  const regionParams = getRegionParams(category);
  const endpoint = mediaType === "movie" ? "/discover/movie" : "/discover/tv";

  return tmdbFetch<TMDBResponse<Movie>>(endpoint, {
    ...regionParams,
    sort_by: "vote_average.desc",
    "vote_count.gte": "500",
    page: page.toString(),
  });
}

export async function getTrending(
  mediaType: MediaType = "movie",
  page = 1
): Promise<TMDBResponse<Movie>> {
  const timeWindow = "week";
  return tmdbFetch<TMDBResponse<Movie>>(`/trending/${mediaType}/${timeWindow}`, {
    page: page.toString(),
  });
}

export async function getMovieDetails(id: number): Promise<MovieDetails> {
  return tmdbFetch<MovieDetails>(`/movie/${id}`, {
    append_to_response: "external_ids",
  });
}

export async function getTVDetails(id: number): Promise<MovieDetails> {
  const data = await tmdbFetch<MovieDetails & { name: string }>(`/tv/${id}`, {
    append_to_response: "external_ids",
  });
  return { ...data, title: data.name };
}

export async function getWatchProviders(
  id: number,
  mediaType: MediaType,
  region: string = "US"
): Promise<WatchProviders | null> {
  const data = await tmdbFetch<{
    results: Record<string, WatchProviders>;
  }>(`/${mediaType}/${id}/watch/providers`);

  return data.results[region] || data.results.US || null;
}

export async function searchContent(query: string, page = 1): Promise<TMDBResponse<Movie>> {
  return tmdbFetch<TMDBResponse<Movie>>("/search/multi", {
    query,
    page: page.toString(),
    include_adult: "false",
  });
}

export function getIMDBUrl(imdbId: string): string {
  return `https://www.imdb.com/title/${imdbId}/`;
}

export function getRottenTomatoesSearchUrl(title: string): string {
  return `https://www.rottentomatoes.com/search?search=${encodeURIComponent(title)}`;
}
