'use client';

/**
 * Skeleton placeholder for a single movie card.
 * Matches MovieCard dimensions and aspect ratio.
 */
export default function MovieCardSkeleton() {
  return (
    <div
      className="flex-shrink-0 w-[160px] sm:w-[180px] md:w-[200px] overflow-hidden rounded-lg"
      aria-hidden
    >
      <div className="relative aspect-video w-full bg-netflix-gray animate-shimmer" />
    </div>
  );
}
