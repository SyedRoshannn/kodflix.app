'use client';

/**
 * Skeleton for the hero banner (featured movie).
 * Matches hero aspect ratio and layout.
 */
export default function HeroSkeleton() {
  return (
    <section
      className="relative h-[56vw] min-h-[320px] max-h-[600px] w-full overflow-hidden bg-netflix-dark"
      aria-busy
      aria-label="Loading featured content"
    >
      <div className="absolute inset-0 bg-netflix-gray animate-shimmer" />
      <div className="absolute bottom-0 left-0 right-0 p-4 md:p-8 lg:p-12">
        <div className="h-10 md:h-12 bg-netflix-gray rounded w-3/4 max-w-md mb-3 animate-shimmer" />
        <div className="h-4 bg-netflix-gray/80 rounded w-full max-w-xl mb-2 animate-shimmer" />
        <div className="h-4 bg-netflix-gray/80 rounded w-2/3 max-w-lg mb-4 animate-shimmer" />
        <div className="h-10 w-28 bg-netflix-gray rounded animate-shimmer" />
      </div>
    </section>
  );
}
