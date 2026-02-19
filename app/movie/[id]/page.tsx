'use client';

import { useCallback, useEffect, useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import Link from 'next/link';
import Image from 'next/image';
import type { Movie } from '@/types/movie';

export default function MovieDetailsPage() {
  const params = useParams();
  const router = useRouter();
  const id = typeof params.id === 'string' ? params.id : params.id?.[0];
  const [movie, setMovie] = useState<Movie | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchMovie = useCallback(async () => {
    if (!id) return;
    try {
      setLoading(true);
      setError(null);
      const res = await fetch(`/api/movie/${id}`);
      if (!res.ok) {
        if (res.status === 404) throw new Error('Movie not found');
        throw new Error('Failed to fetch');
      }
      const data: Movie = await res.json();
      setMovie(data);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Unknown error');
      setMovie(null);
    } finally {
      setLoading(false);
    }
  }, [id]);

  useEffect(() => {
    fetchMovie();
  }, [fetchMovie]);

  const handlePlay = useCallback(() => {
    if (movie?.videoUrl) {
      window.open(movie.videoUrl, '_blank');
    }
  }, [movie?.videoUrl]);

  if (loading) {
    return (
      <div className="flex min-h-[60vh] items-center justify-center">
        <div className="h-12 w-12 animate-spin rounded-full border-4 border-netflix-red border-t-transparent" />
      </div>
    );
  }

  if (error || !movie) {
    return (
      <div className="flex min-h-[60vh] flex-col items-center justify-center gap-4 px-4">
        <p className="text-netflix-red">
          {error ?? 'Movie not found'}
        </p>
        <Link
          href="/"
          className="rounded bg-netflix-red px-4 py-2 text-white hover:bg-netflix-red/90"
        >
          Back to Home
        </Link>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-netflix-black">
      {/* Large thumbnail / backdrop */}
      <div className="relative h-[40vh] min-h-[280px] w-full overflow-hidden">
        <Image
          src={movie.thumbnail}
          alt={movie.title}
          fill
          className="object-cover"
          priority
          sizes="100vw"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-netflix-black via-netflix-black/50 to-transparent" />
      </div>

      {/* Content */}
      <div className="relative -mt-32 z-10 px-4 md:px-8 lg:px-12 pb-16">
        <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-2">
          {movie.title}
        </h1>
        {movie.genre && (
          <p className="text-netflix-gray-light text-sm md:text-base mb-4">
            {movie.genre}
          </p>
        )}
        <p className="text-white/90 max-w-2xl mb-6 text-sm md:text-base leading-relaxed">
          {movie.description}
        </p>

        {/* Play button: redirects to login if no user token (simulated via state) */}
        <button
          type="button"
          onClick={handlePlay}
          className="inline-flex items-center gap-2 rounded bg-netflix-red px-6 py-3 text-base font-semibold text-white hover:bg-netflix-red/90 transition-colors"
        >
          <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24">
            <path d="M8 5v14l11-7L8 5z" />
          </svg>
          Play
        </button>


        <div className="mt-8">
          <Link
            href="/"
            className="text-netflix-gray-light hover:text-white transition-colors text-sm"
          >
            ← Back to Browse
          </Link>
        </div>
      </div>
    </div>
  );
}
