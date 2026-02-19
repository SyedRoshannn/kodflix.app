'use client';

import { useMemo } from 'react';
import { useMovies } from '@/hooks/useMovies';
import Hero from '@/components/Hero';
import HeroSkeleton from '@/components/HeroSkeleton';
import MovieRow from '@/components/MovieRow';
import MovieRowSkeleton from '@/components/MovieRowSkeleton';
import { CATEGORY_LABELS } from '@/lib/mockMovies';
import type { Movie } from '@/types/movie';

/** Number of skeleton rows to show while loading */
const SKELETON_ROW_COUNT = 3;

/**
 * Groups movies by category for display in rows.
 */
function groupByCategory(movies: Movie[]): Record<string, Movie[]> {
  return movies.reduce<Record<string, Movie[]>>((acc, movie) => {
    const cat = movie.category?.toLowerCase() || 'other';
    if (!acc[cat]) acc[cat] = [];
    acc[cat].push(movie);
    return acc;
  }, {});
}

export default function HomePage() {
  const { movies, loading, error } = useMovies();

  const grouped = useMemo(() => groupByCategory(movies), [movies]);
  const featured = useMemo(
    () => movies.find((m) => m.category === 'trending') ?? movies[0],
    [movies]
  );

  if (loading) {
    return (
      <div className="pb-16">
        <HeroSkeleton />
        <div id="movies" className="mt-4">
          {Array.from({ length: SKELETON_ROW_COUNT }, (_, i) => (
            <MovieRowSkeleton
              key={i}
              cardCount={6}
              titleWidth={i === 0 ? 'w-28' : i === 1 ? 'w-20' : 'w-24'}
            />
          ))}
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex min-h-[60vh] items-center justify-center px-4">
        <p className="text-netflix-red">Failed to load movies: {error}</p>
      </div>
    );
  }

  return (
    <div className="pb-16">
      {/* Hero with featured movie */}
      {featured && (
        <div id="hero">
          <Hero movie={featured} />
        </div>
      )}

      {/* Movie rows by category */}
      <div id="movies" className="mt-4">
        {Object.entries(grouped).map(([category, list]) => (
          <MovieRow
            key={category}
            title={CATEGORY_LABELS[category] ?? category}
            movies={list}
          />
        ))}
      </div>
    </div>
  );
}
