'use client';

import MovieCardSkeleton from './MovieCardSkeleton';

interface MovieRowSkeletonProps {
  /** Number of skeleton cards to show in the row */
  cardCount?: number;
  /** Optional title placeholder width (e.g. "Trending Now" width) */
  titleWidth?: string;
}

const DEFAULT_CARD_COUNT = 6;

/**
 * Skeleton for a single movie row: title placeholder + horizontal skeleton cards.
 */
export default function MovieRowSkeleton({
  cardCount = DEFAULT_CARD_COUNT,
  titleWidth = 'w-32',
}: MovieRowSkeletonProps) {
  return (
    <section className="mb-8 md:mb-10" aria-busy aria-label="Loading movies">
      <div className="flex items-center justify-between px-4 md:px-8 mb-3">
        <div
          className={`h-6 rounded bg-netflix-gray animate-shimmer ${titleWidth}`}
          aria-hidden
        />
        <div className="flex gap-2">
          <div className="h-9 w-9 rounded-full bg-netflix-gray animate-shimmer" aria-hidden />
          <div className="h-9 w-9 rounded-full bg-netflix-gray animate-shimmer" aria-hidden />
        </div>
      </div>
      <div className="flex gap-3 overflow-hidden px-4 md:px-8 py-2">
        {Array.from({ length: cardCount }, (_, i) => (
          <MovieCardSkeleton key={i} />
        ))}
      </div>
    </section>
  );
}
