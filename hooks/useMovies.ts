'use client';

import { useState, useEffect, useCallback } from 'react';
import type { Movie } from '@/types/movie';

/**
 * Fetches movies from GET /api/movies.
 * Separates data fetching logic from UI.
 */
export function useMovies() {
  const [movies, setMovies] = useState<Movie[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchMovies = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);
      const res = await fetch('/api/movies');
      if (!res.ok) throw new Error('Failed to fetch movies');
      const data: Movie[] = await res.json();
      setMovies(data);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Unknown error');
      setMovies([]);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchMovies();
  }, [fetchMovies]);

  return { movies, loading, error, refetch: fetchMovies };
}
