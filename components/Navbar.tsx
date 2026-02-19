'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useRouter, usePathname } from 'next/navigation';

/**
 * Responsive navbar with logo, search, and login button.
 */
export default function Navbar() {
  const [query, setQuery] = useState('');
  const router = useRouter();
  const pathname = usePathname();

  // Hide Navbar on login and signup pages
  if (pathname === '/login' || pathname === '/signup') {
    return null;
  }

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    const q = query.trim();
    if (q) router.push(`/search?q=${encodeURIComponent(q)}`);
  };

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between gap-4 px-4 md:px-8 py-3 bg-gradient-to-b from-black/80 to-transparent transition-all duration-300">
      {/* Logo - links to home */}
      <Link
        href="/"
        className="shrink-0 text-2xl md:text-3xl font-bold text-netflix-red tracking-tight hover:text-netflix-red/90 transition-colors"
        aria-label="Home"
      >
        KodFlix
      </Link>

      {/* Search */}
      <form
        onSubmit={handleSearch}
        className="hidden sm:flex flex-1 max-w-md mx-4"
      >
        <input
          type="search"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search movies..."
          className="w-full rounded-l bg-netflix-dark px-4 py-2 text-sm text-white placeholder:text-netflix-gray-light focus:outline-none focus:ring-2 focus:ring-netflix-red border border-netflix-gray border-r-0"
          aria-label="Search movies"
        />
        <button
          type="submit"
          className="rounded-r bg-netflix-gray px-4 py-2 text-white hover:bg-netflix-gray-light transition-colors"
        >
          Search
        </button>
      </form>

      {/* Right side: nav links + login */}
      <div className="flex shrink-0 items-center gap-4">
        <Link
          href="/#movies"
          className="hidden sm:block text-sm text-white/90 hover:text-white transition-colors"
        >
          Browse
        </Link>
        <button
          onClick={async () => {
            try {
              await fetch('/api/logout', { method: 'POST' });
              router.push('/login');
              router.refresh();
            } catch (error) {
              console.error('Logout failed', error);
            }
          }}
          className="rounded bg-netflix-red px-4 py-2 text-sm font-medium text-white hover:bg-netflix-red/90 transition-colors"
        >
          Sign Out
        </button>
      </div>
    </nav>
  );
}
