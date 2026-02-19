'use client';

import Link from 'next/link';
import Image from 'next/image';
import type { Movie } from '@/types/movie';

interface HeroProps {
  movie: Movie;
}

/**
 * Hero banner showing the featured movie with backdrop and CTA.
 */
export default function Hero({ movie }: HeroProps) {
  return (
    <section className="relative h-[56vw] min-h-[320px] max-h-[600px] w-full overflow-hidden">
      {/* Backdrop image */}
      <div className="absolute inset-0">
        <Image
          src={movie.thumbnail}
          alt={movie.title}
          fill
          className="object-cover"
          priority
          sizes="100vw"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-netflix-black via-netflix-black/60 to-transparent" />
      </div>

      {/* Content overlay */}
      <div className="absolute bottom-0 left-0 right-0 p-4 md:p-8 lg:p-12 flex flex-col justify-end">
        <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white drop-shadow-lg max-w-2xl mb-2 md:mb-4 animate-fade-in">
          {movie.title}
        </h1>
        <p className="text-sm md:text-base text-white/90 max-w-xl mb-4 md:mb-6 line-clamp-2 md:line-clamp-3">
          {movie.description}
        </p>
        <div className="flex flex-wrap gap-3">
          <Link
            href={`/movie/${movie.id}`}
            className="inline-flex items-center gap-2 rounded bg-white px-5 py-2.5 text-base font-semibold text-netflix-black hover:bg-white/90 transition-colors"
          >
            <PlayIcon />
            More Info
          </Link>
        </div>
      </div>
    </section>
  );
}

function PlayIcon() {
  return (
    <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden>
      <path d="M8 5v14l11-7L8 5z" />
    </svg>
  );
}
