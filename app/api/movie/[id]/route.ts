import { NextRequest, NextResponse } from 'next/server';
import { getOMDBMovieById, mapSingleToMovie } from '@/lib/omdb';

/**
 * GET /api/movie/[id]
 * Fetches a single movie from OMDB by IMDb ID (e.g. tt3896198).
 */
export async function GET(
  _req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;
  if (!id) {
    return NextResponse.json({ error: 'Missing movie ID' }, { status: 400 });
  }
  try {
    const key = process.env.OMDB_API_KEY;
    if (!key) {
      return NextResponse.json(
        { error: 'OMDB_API_KEY is not configured' },
        { status: 500 }
      );
    }
    const data = await getOMDBMovieById(id);
    if (!data) {
      return NextResponse.json({ error: 'Movie not found' }, { status: 404 });
    }
    const movie = mapSingleToMovie(data);
    return NextResponse.json(movie);
  } catch (err) {
    console.error('Movie fetch error:', err);
    return NextResponse.json(
      { error: 'Failed to fetch movie' },
      { status: 500 }
    );
  }
}
