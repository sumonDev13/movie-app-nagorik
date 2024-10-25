import { Suspense } from 'react';
import { getWatchlist } from '../lib/actions';
import MovieGrid from '@/app/components/MovieGrid';

export default async function WatchlistPage() {
  const watchlistMovies = await getWatchlist();

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">My Watchlist</h1>
      <Suspense fallback={<div>Loading watchlist...</div>}>
        {watchlistMovies.length > 0 ? (
          <MovieGrid initialMovies={watchlistMovies} />
        ) : (
          <p className="text-center text-gray-600">
            Your watchlist is empty. Add some movies to get started!
          </p>
        )}
      </Suspense>
    </div>
  );
}
