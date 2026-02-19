'use client';

import { useRef } from 'react';
import MovieCard from './MovieCard';
import type { Movie } from '@/types/movie';

interface MovieRowProps {
  title: string;
  movies: Movie[];
}

/**
 * Horizontal scrollable row of movie cards with smooth scroll.
 */
export default function MovieRow({ title, movies }: MovieRowProps) {
  const scrollRef = useRef<HTMLDivElement>(null);

  const scroll = (direction: 'left' | 'right') => {
    if (!scrollRef.current) return;
    const amount = scrollRef.current.clientWidth * 0.8;
    scrollRef.current.scrollBy({
      left: direction === 'left' ? -amount : amount,
      behavior: 'smooth',
    });
  };

  if (!movies.length) return null;

  return (
    <section className="mb-8 md:mb-10">
      <div className="flex items-center justify-between px-4 md:px-8 mb-3">
        <h2 className="text-lg md:text-xl font-semibold text-white">{title}</h2>
        <div className="flex gap-2">
          <button
            type="button"
            onClick={() => scroll('left')}
            className="rounded-full bg-white/10 p-2 hover:bg-white/20 transition-colors focus:outline-none focus:ring-2 focus:ring-white/50"
            aria-label="Scroll left"
          >
            <ChevronLeft />
          </button>
          <button
            type="button"
            onClick={() => scroll('right')}
            className="rounded-full bg-white/10 p-2 hover:bg-white/20 transition-colors focus:outline-none focus:ring-2 focus:ring-white/50"
            aria-label="Scroll right"
          >
            <ChevronRight />
          </button>
        </div>
      </div>
      <div
        ref={scrollRef}
        className="flex gap-3 overflow-x-auto scrollbar-hide scroll-smooth-x px-4 md:px-8 py-2"
      >
        {movies.map((movie) => (
          <MovieCard key={movie.id} movie={movie} />
        ))}
      </div>
    </section>
  );
}

function ChevronLeft() {
  return (
    <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
      <path d="M15.41 7.41L14 6l-6 6 6 6 1.41-1.41L10.83 12z" />
    </svg>
  );
}

function ChevronRight() {
  return (
    <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
      <path d="M10 6L8.59 7.41 13.17 12l-4.58 4.59L10 18l6-6z" />
    </svg>
  );
}
