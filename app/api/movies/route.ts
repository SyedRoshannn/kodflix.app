import { NextResponse } from 'next/server';
import {
  searchOMDB,
  mapSearchToMovie,
  OMDBSearchItem,
} from '@/lib/omdb';
import type { Movie } from '@/types/movie';
const SEARCH_TERMS: Record<string, string> = {
  trending: 'avengers',
  action: 'action',
  drama: 'drama',
  comedy: 'comedy',
};

/**
 * Fetches movies from OMDB API, grouped by category.
 * Uses multiple searches to populate rows (trending, action, drama, comedy).
 */
export async function GET() {
  try {
    const key = process.env.OMDB_API_KEY;
    if (!key) {
      return NextResponse.json(
        { error: 'OMDB_API_KEY is not configured. Add it to .env.local' },
        { status: 500 }
      );
    }

    const seen = new Set<string>();
    const movies: Movie[] = [];

    for (const [category, query] of Object.entries(SEARCH_TERMS)) {
      const result = await searchOMDB(query);
      const items = (result.Search ?? []) as OMDBSearchItem[];
      for (const item of items) {
        if (item.imdbID && !seen.has(item.imdbID) && item.Type === 'movie') {
          seen.add(item.imdbID);
          movies.push(mapSearchToMovie(item, category));
        }
      }
    }

    if (movies.length === 0) {
      return NextResponse.json(
        { error: 'No movies found from OMDB. Check your API key.' },
        { status: 502 }
      );
    }

    return NextResponse.json(movies);
  } catch (err) {
    console.error('OMDB fetch error:', err);
    return NextResponse.json(
      { error: 'Failed to fetch movies from OMDB' },
      { status: 500 }
    );
  }
}
