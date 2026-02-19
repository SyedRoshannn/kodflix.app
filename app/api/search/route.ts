import { NextRequest, NextResponse } from 'next/server';
import { searchOMDB, mapSearchToMovie } from '@/lib/omdb';

/**
 * GET /api/search?q=batman
 * Searches OMDB by title and returns movies matching our Movie type.
 */
export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const query = searchParams.get('q');
  if (!query || query.trim().length === 0) {
    return NextResponse.json([], { status: 200 });
  }
  try {
    const key = process.env.OMDB_API_KEY;
    if (!key) {
      return NextResponse.json(
        { error: 'OMDB_API_KEY is not configured' },
        { status: 500 }
      );
    }
    const result = await searchOMDB(query.trim());
    const items = result.Search ?? [];
    const movies = items
      .filter((item) => item.imdbID && item.Type === 'movie')
      .map((item) => mapSearchToMovie(item, 'search'));
    return NextResponse.json(movies);
  } catch (err) {
    console.error('Search error:', err);
    return NextResponse.json(
      { error: 'Search failed' },
      { status: 500 }
    );
  }
}
