/**
 * OMDB API helpers and types.
 * API docs: https://www.omdbapi.com/
 */
import type { Movie } from '@/types/movie';

export interface OMDBSearchItem {
  Title: string;
  Year: string;
  imdbID: string;
  Type: string;
  Poster: string;
}

export interface OMDBSearchResponse {
  Search?: OMDBSearchItem[];
  totalResults?: string;
  Response: string;
  Error?: string;
}

export interface OMDBSingleResponse {
  Title: string;
  Year: string;
  Rated: string;
  Released: string;
  Runtime: string;
  Genre: string;
  Director: string;
  Writer: string;
  Actors: string;
  Plot: string;
  Language: string;
  Country: string;
  Awards: string;
  Poster: string;
  Ratings?: { Source: string; Value: string }[];
  Metascore: string;
  imdbRating: string;
  imdbVotes: string;
  imdbID: string;
  Type: string;
  Response: string;
  Error?: string;
}

const BASE = 'https://www.omdbapi.com/';

function getApiUrl(params: Record<string, string>): string {
  const key = process.env.OMDB_API_KEY;
  if (!key) throw new Error('OMDB_API_KEY is not set');
  const search = new URLSearchParams({ ...params, apikey: key });
  return `${BASE}?${search.toString()}`;
}

export async function searchOMDB(query: string, page = 1): Promise<OMDBSearchResponse> {
  const url = getApiUrl({ s: query, page: String(page) });
  const res = await fetch(url);
  return res.json();
}

export async function getOMDBMovieById(imdbId: string): Promise<OMDBSingleResponse | null> {
  const url = getApiUrl({ i: imdbId });
  const res = await fetch(url);
  const data: OMDBSingleResponse = await res.json();
  if (data.Response === 'False' || data.Error) return null;
  return data;
}

/**
 * Maps OMDB search result to our Movie type.
 */
export function mapSearchToMovie(item: OMDBSearchItem, category: string): Movie {
  const poster =
      item.Poster && item.Poster !== 'N/A'
        ? item.Poster
        : 'https://via.placeholder.com/300x450/1a1a1a/666666?text=No+Poster';
  return {
    id: item.imdbID,
    title: item.Title,
    description: `${item.Year} • ${item.Type}`,
    genre: item.Type,
    thumbnail: poster,
    videoUrl: `https://www.imdb.com/title/${item.imdbID}`,
    category,
  };
}

/**
 * Maps OMDB full movie response to our Movie type.
 */
export function mapSingleToMovie(data: OMDBSingleResponse, category = 'movie'): Movie {
  const poster =
      data.Poster && data.Poster !== 'N/A'
        ? data.Poster
        : 'https://via.placeholder.com/300x450/1a1a1a/666666?text=No+Poster';
  return {
    id: data.imdbID,
    title: data.Title,
    description: data.Plot || `${data.Year} • ${data.Genre}`,
    genre: data.Genre || data.Type,
    thumbnail: poster,
    videoUrl: `https://www.imdb.com/title/${data.imdbID}`,
    category,
  };
}
