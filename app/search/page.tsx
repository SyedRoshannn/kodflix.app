export const dynamic = "force-dynamic";
'use client';

import { useSearchParams } from 'next/navigation';
import { useMovies } from '@/hooks/useSearchMovies';
import MovieRow from '@/components/MovieRow';
import MovieRowSkeleton from '@/components/MovieRowSkeleton';

export default function SearchPage() {
  const searchParams = useSearchParams();
  const q = searchParams.get('q') ?? '';
  const { movies, loading, error } = useMovies(q);

  if (!q.trim()) {
    return (
      <div className="flex min-h-[50vh] items-center justify-center px-4">
        <p className="text-netflix-gray-light">Enter a search term to find movies.</p>
      </div>
    );
  }

  if (loading) {
    return (
      <div className="pb-16">
        <h1 className="px-4 py-6 text-2xl font-bold">Searching for &quot;{q}&quot;</h1>
        <MovieRowSkeleton cardCount={6} titleWidth="w-32" />
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex min-h-[50vh] flex-col items-center justify-center gap-4 px-4">
        <p className="text-netflix-red">Failed to search: {error}</p>
      </div>
    );
  }

  if (movies.length === 0) {
    return (
      <div className="flex min-h-[50vh] flex-col items-center justify-center gap-4 px-4">
        <p className="text-netflix-gray-light">No movies found for &quot;{q}&quot;</p>
      </div>
    );
  }

  return (
    <div className="pb-16">
      <h1 className="px-4 py-6 text-2xl font-bold">
        Results for &quot;{q}&quot; ({movies.length})
      </h1>
      <MovieRow title="Search Results" movies={movies} />
    </div>
  );
}
