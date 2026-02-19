import type { Movie } from '@/types/movie';

/**
 * Mock movie data for development and API simulation.
 * In production, this would be replaced by a real backend.
 */
export const MOCK_MOVIES: Movie[] = [
  {
    id: '1',
    title: 'The Dark Knight',
    description:
      'When the menace known as the Joker wreaks havoc and chaos on the people of Gotham, Batman must accept one of the greatest psychological and physical tests of his ability to fight injustice.',
    genre: 'Action, Crime, Drama',
    thumbnail: 'https://image.tmdb.org/t/p/w500/qJ2tW6WMUDux911r6m7haRef0WH.jpg',
    videoUrl: 'https://example.com/video/1',
    category: 'trending',
  },
  {
    id: '2',
    title: 'Inception',
    description:
      'A thief who steals corporate secrets through the use of dream-sharing technology is given the inverse task of planting an idea into the mind of a C.E.O.',
    genre: 'Action, Sci-Fi, Thriller',
    thumbnail: 'https://image.tmdb.org/t/p/w500/9gk7adHYeDvHkCSEqAvQNLV5HuS.jpg',
    videoUrl: 'https://example.com/video/2',
    category: 'trending',
  },
  {
    id: '3',
    title: 'Interstellar',
    description:
      'A team of explorers travel through a wormhole in space in an attempt to ensure humanity\'s survival.',
    genre: 'Adventure, Drama, Sci-Fi',
    thumbnail: 'https://image.tmdb.org/t/p/w500/gEU2QniE6E77NI6lCU6MxlNBvIx.jpg',
    videoUrl: 'https://example.com/video/3',
    category: 'trending',
  },
  {
    id: '4',
    title: 'John Wick',
    description:
      'An ex-hit-man comes out of retirement to track down the gangsters that killed his dog and took everything from him.',
    genre: 'Action, Thriller',
    thumbnail: 'https://image.tmdb.org/t/p/w500/fZ8hx5nX0qPj2Hy4vjEdnVj2bK.jpg',
    videoUrl: 'https://example.com/video/4',
    category: 'action',
  },
  {
    id: '5',
    title: 'Mad Max: Fury Road',
    description:
      'In a post-apocalyptic wasteland, a woman rebels against a tyrannical ruler in search for her homeland with the aid of a group of female prisoners.',
    genre: 'Action, Adventure, Sci-Fi',
    thumbnail: 'https://image.tmdb.org/t/p/w500/hE24GYddaxB9MVZl1CaiI86M3kp.jpg',
    videoUrl: 'https://example.com/video/5',
    category: 'action',
  },
  {
    id: '6',
    title: 'The Matrix',
    description:
      'A computer hacker learns from mysterious rebels about the true nature of his reality and his role in the war against its controllers.',
    genre: 'Action, Sci-Fi',
    thumbnail: 'https://image.tmdb.org/t/p/w500/f89U3ADr1oiB1s9GkdPOEpXUk5H.jpg',
    videoUrl: 'https://example.com/video/6',
    category: 'action',
  },
  {
    id: '7',
    title: 'The Shawshank Redemption',
    description:
      'Two imprisoned men bond over a number of years, finding solace and eventual redemption through acts of common decency.',
    genre: 'Drama',
    thumbnail: 'https://image.tmdb.org/t/p/w500/q6y0Go1tsGEsmtFryDOJo3dEmqu.jpg',
    videoUrl: 'https://example.com/video/7',
    category: 'drama',
  },
  {
    id: '8',
    title: 'Forrest Gump',
    description:
      'The presidencies of Kennedy and Johnson, the Vietnam War, and other historical events unfold from the perspective of an Alabama man.',
    genre: 'Drama, Romance',
    thumbnail: 'https://image.tmdb.org/t/p/w500/saHP97rTPS5eLmrLQEcANmKrsFl.jpg',
    videoUrl: 'https://example.com/video/8',
    category: 'drama',
  },
  {
    id: '9',
    title: 'The Godfather',
    description:
      'The aging patriarch of an organized crime dynasty transfers control of his clandestine empire to his reluctant son.',
    genre: 'Crime, Drama',
    thumbnail: 'https://image.tmdb.org/t/p/w500/3bhkrj58Vtu7enYsRolD1fZdja1.jpg',
    videoUrl: 'https://example.com/video/9',
    category: 'drama',
  },
  {
    id: '10',
    title: 'Pulp Fiction',
    description:
      'The lives of two mob hitmen, a boxer, a gangster and his wife intertwine in four tales of violence and redemption.',
    genre: 'Crime, Drama',
    thumbnail: 'https://image.tmdb.org/t/p/w500/d5iIlFn5s0ImszYzBPb8JPIfbXD.jpg',
    videoUrl: 'https://example.com/video/10',
    category: 'drama',
  },
];

/** Category labels for display */
export const CATEGORY_LABELS: Record<string, string> = {
  trending: 'Trending Now',
  action: 'Action',
  drama: 'Drama',
};
