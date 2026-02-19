/**
 * Movie entity shape returned by GET /api/movies
 */
export interface Movie {
  id: string;
  title: string;
  description: string;
  genre: string;
  thumbnail: string;
  videoUrl: string;
  category: string;
}
