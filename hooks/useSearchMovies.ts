'use client';

import { useState, useEffect, useCallback } from 'react';
import type { Movie } from '@/types/movie';

/**
 * Fetches search results from GET /api/search?q=...
 */
export function useMovies(query: string) {
  const [movies, setMovies] = useState<Movie[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchSearch = useCallback(async () => {
    if (!query.trim()) {
      setMovies([]);
      setLoading(false);
      setError(null);
      return;
    }
    try {
      setLoading(true);
      setError(null);
      const res = await fetch(`/api/search?q=${encodeURIComponent(query.trim())}`);
      if (!res.ok) throw new Error('Search failed');
      const data: Movie[] = await res.json();
      setMovies(data ?? []);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Unknown error');
      setMovies([]);
    } finally {
      setLoading(false);
    }
  }, [query]);

  useEffect(() => {
    fetchSearch();
  }, [fetchSearch]);

  return { movies, loading, error, refetch: fetchSearch };
}
