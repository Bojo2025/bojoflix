import Image from "next/image";
import Link from "next/link";
import { getImageUrl } from "@/lib/tmdb";
import { Movie, MediaType, getTitle, getYear } from "@/types";
import RatingBadge from "./RatingBadge";
import { cn } from "@/lib/utils";

interface MovieCardProps {
  movie: Movie;
  mediaType?: MediaType;
  rank?: number;
  className?: string;
}

export default function MovieCard({
  movie,
  mediaType = "movie",
  rank,
  className,
}: MovieCardProps) {
  const title = getTitle(movie);
  const year = getYear(movie);
  const href = `/${mediaType}/?id=${movie.id}`;

  return (
    <Link
      href={href}
      className={cn(
        "group relative block rounded-2xl overflow-hidden bg-surface-card border border-white/5 card-hover",
        className
      )}
    >
      <div className="relative aspect-[2/3] overflow-hidden">
        <Image
          src={getImageUrl(movie.poster_path, "w500")}
          alt={title}
          fill
          className="object-cover transition-transform duration-500 group-hover:scale-110"
          sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 20vw"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black via-black/20 to-transparent opacity-80" />

        {rank && (
          <div className="absolute top-3 left-3 w-8 h-8 rounded-full bg-brand-600 flex items-center justify-center text-sm font-bold shadow-lg">
            {rank}
          </div>
        )}

        <div className="absolute top-3 right-3">
          <RatingBadge rating={movie.vote_average} size="sm" />
        </div>

        <div className="absolute bottom-0 left-0 right-0 p-4">
          <h3 className="font-semibold text-white text-sm sm:text-base line-clamp-2 leading-tight mb-1 group-hover:text-brand-300 transition-colors">
            {title}
          </h3>
          <p className="text-xs text-gray-400">{year}</p>
        </div>
      </div>
    </Link>
  );
}
