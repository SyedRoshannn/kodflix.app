'use client';

import Link from 'next/link';
import Image from 'next/image';
import type { Movie } from '@/types/movie';

interface MovieCardProps {
  movie: Movie;
}

/**
 * Movie card with hover scale, lift, shadow, image zoom, and play button.
 * Clicking navigates to /movie/[id].
 */
export default function MovieCard({ movie }: MovieCardProps) {
  return (
    <Link
      href={`/movie/${movie.id}`}
      className="group relative flex-shrink-0 w-[160px] sm:w-[180px] md:w-[200px] overflow-hidden rounded-lg
        transition-all duration-300 ease-out
        hover:scale-105 hover:-translate-y-2 hover:z-10
        hover:shadow-[0_12px_40px_rgba(0,0,0,0.6)]
        focus:outline-none focus:ring-2 focus:ring-netflix-red focus:ring-offset-2 focus:ring-offset-netflix-black"
    >
      {/* Thumbnail with zoom-on-hover */}
      <div className="relative aspect-video w-full bg-netflix-gray overflow-hidden">
        <Image
          src={movie.thumbnail}
          alt={movie.title}
          fill
          className="object-cover transition-transform duration-500 ease-out group-hover:scale-110"
          sizes="(max-width: 640px) 160px, (max-width: 768px) 180px, 200px"
        />
        {/* Dark overlay on hover - fades in first */}
        <div
          className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity duration-300 ease-out"
          aria-hidden
        />
      </div>

      {/* Play button - scale-in + fade on hover */}
      <div
        className="absolute inset-0 flex items-center justify-center opacity-0 scale-75 group-hover:opacity-100 group-hover:scale-100 transition-all duration-300 ease-out pointer-events-none delay-75"
        aria-hidden
      >
        <span className="flex h-14 w-14 items-center justify-center rounded-full bg-white/95 text-netflix-black shadow-xl ring-2 ring-white/50 transition-transform duration-200 group-hover:scale-110">
          <svg className="h-7 w-7 ml-0.5" fill="currentColor" viewBox="0 0 24 24">
            <path d="M8 5v14l11-7L8 5z" />
          </svg>
        </span>
      </div>

      {/* Title bar - slides up slightly on hover */}
      <div className="absolute bottom-0 left-0 right-0 p-3 bg-gradient-to-t from-black/90 via-black/50 to-transparent opacity-0 translate-y-2 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-300 ease-out delay-100">
        <p className="text-xs font-semibold text-white truncate drop-shadow-sm">
          {movie.title}
        </p>
      </div>
    </Link>
  );
}
