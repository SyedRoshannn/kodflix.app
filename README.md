# KodFlix – Netflix-style Streaming Frontend

A modern Netflix-style streaming UI built with **Next.js 14** (App Router), **TypeScript**, and **Tailwind CSS**. Frontend only; uses a mock API for movies.

## Features

- **Homepage**: Dark Netflix-style UI, hero banner, horizontal movie rows by category (Trending, Action, Drama)
- **Movie details**: `/movie/[id]` with thumbnail, title, description, genre, and Play (auth-simulated)
- **Mock API**: `GET /api/movies` returns structured movie data from in-project mock data
- **Auth simulation**: React state simulates login; Play redirects to `/login` when not “logged in”. Placeholder login page can simulate sign-in for testing.

## Tech Stack

- Next.js 14 (App Router)
- TypeScript
- Tailwind CSS
- React 18

## Getting Started

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Project Structure

```
src/
├── app/
│   ├── api/movies/route.ts   # GET /api/movies (mock)
│   ├── login/page.tsx        # Placeholder login (simulate auth)
│   ├── movie/[id]/page.tsx   # Movie details
│   ├── layout.tsx
│   ├── page.tsx              # Homepage
│   └── globals.css
├── components/
│   ├── Hero.tsx
│   ├── MovieCard.tsx
│   ├── MovieRow.tsx
│   └── Navbar.tsx
├── contexts/
│   └── AuthContext.tsx       # Simulated auth state
├── hooks/
│   └── useMovies.ts          # Fetch /api/movies
├── lib/
│   └── mockMovies.ts         # Mock data + category labels
└── types/
    └── movie.ts
```

## Adding Real Auth Later

- Keep `AuthContext` and swap its implementation for a real provider (e.g. NextAuth).
- Replace the placeholder `/login` page with your login flow and call the context’s `login()` (or set token) after success.

## Scripts

- `npm run dev` – development server
- `npm run build` – production build
- `npm run start` – run production build
- `npm run lint` – ESLint
