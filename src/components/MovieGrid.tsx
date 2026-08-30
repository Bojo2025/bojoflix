import { Movie, MediaType } from "@/types";
import MovieCard from "./MovieCard";

interface MovieGridProps {
  movies: Movie[];
  mediaType?: MediaType;
  showRank?: boolean;
  emptyMessage?: string;
}

export default function MovieGrid({
  movies,
  mediaType = "movie",
  showRank = false,
  emptyMessage = "No titles found. Try a different category.",
}: MovieGridProps) {
  if (movies.length === 0) {
    return (
      <div className="text-center py-20">
        <p className="text-gray-400 text-lg">{emptyMessage}</p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4 sm:gap-5">
      {movies.map((movie, index) => (
        <MovieCard
          key={movie.id}
          movie={movie}
          mediaType={mediaType}
          rank={showRank ? index + 1 : undefined}
        />
      ))}
    </div>
  );
}
