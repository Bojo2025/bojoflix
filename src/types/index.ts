export type RegionCategory = "american" | "indian" | "international";
export type ViewingType = "theatre" | "ott";
export type MediaType = "movie" | "tv";

export interface Movie {
  id: number;
  title: string;
  name?: string;
  overview: string;
  poster_path: string | null;
  backdrop_path: string | null;
  vote_average: number;
  vote_count: number;
  release_date?: string;
  first_air_date?: string;
  genre_ids?: number[];
  media_type?: MediaType;
  popularity: number;
}

export interface MovieDetails extends Movie {
  genres: { id: number; name: string }[];
  runtime?: number;
  number_of_seasons?: number;
  number_of_episodes?: number;
  status: string;
  tagline?: string;
  imdb_id?: string;
  external_ids?: { imdb_id?: string };
}

export interface WatchProvider {
  provider_id: number;
  provider_name: string;
  logo_path: string;
  display_priority: number;
}

export interface WatchProviders {
  link?: string;
  flatrate?: WatchProvider[];
  rent?: WatchProvider[];
  buy?: WatchProvider[];
  free?: WatchProvider[];
}

export interface TMDBResponse<T> {
  page: number;
  results: T[];
  total_pages: number;
  total_results: number;
}

export interface CategoryConfig {
  id: RegionCategory;
  label: string;
  description: string;
  flag: string;
  gradient: string;
  originCountry?: string;
  originalLanguage?: string;
  excludeCountries?: string[];
}

export const CATEGORIES: CategoryConfig[] = [
  {
    id: "american",
    label: "American",
    description: "Hollywood blockbusters & acclaimed US cinema",
    flag: "🇺🇸",
    gradient: "from-blue-600/20 to-red-600/20",
    originCountry: "US",
    originalLanguage: "en",
  },
  {
    id: "indian",
    label: "Indian",
    description: "Bollywood, Tollywood & regional Indian cinema",
    flag: "🇮🇳",
    gradient: "from-orange-500/20 to-green-600/20",
    originCountry: "IN",
  },
  {
    id: "international",
    label: "International",
    description: "Award-winning films from around the world",
    flag: "🌍",
    gradient: "from-purple-600/20 to-teal-500/20",
    excludeCountries: ["US", "IN"],
  },
];

export const VIEWING_TYPES = [
  {
    id: "theatre" as ViewingType,
    label: "In Theatre",
    description: "Currently showing in cinemas",
    icon: "film",
  },
  {
    id: "ott" as ViewingType,
    label: "OTT",
    description: "Stream on Netflix, Prime & more",
    icon: "tv",
  },
];

export function getCategoryConfig(id: RegionCategory): CategoryConfig {
  return CATEGORIES.find((c) => c.id === id)!;
}

export function formatRating(rating: number): string {
  return rating.toFixed(1);
}

export function getRatingColor(rating: number): string {
  if (rating >= 7.5) return "text-emerald-400";
  if (rating >= 6) return "text-yellow-400";
  if (rating >= 4) return "text-orange-400";
  return "text-red-400";
}

export function getRatingLabel(rating: number): string {
  if (rating >= 8) return "Excellent";
  if (rating >= 7) return "Great";
  if (rating >= 6) return "Good";
  if (rating >= 5) return "Average";
  return "Poor";
}

export function getTitle(item: Movie): string {
  return item.title || item.name || "Unknown";
}

export function getYear(item: Movie): string {
  const date = item.release_date || item.first_air_date;
  return date ? new Date(date).getFullYear().toString() : "N/A";
}
