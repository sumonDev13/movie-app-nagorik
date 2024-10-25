'use client';

import { useState } from 'react';
import { MovieDetails } from '@/app/types';
import { addToWatchlist,removeFromWatchlist } from '@/app/lib/actions';

export default function WatchlistButton({ movie }: { movie: MovieDetails }) {
  const [isInWatchlist, setIsInWatchlist] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleWatchlist = async () => {
    setIsLoading(true);
    try {
      if (isInWatchlist) {
        await removeFromWatchlist(movie.id);
        setIsInWatchlist(false);
      } else {
        await addToWatchlist(movie);
        setIsInWatchlist(true);
      }
    } catch (error) {
      console.error('Error updating watchlist:', error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <button
      onClick={handleWatchlist}
      disabled={isLoading}
      className={`px-6 py-2 rounded-lg ${
        isInWatchlist
          ? 'bg-red-500 hover:bg-red-600'
          : 'bg-blue-500 hover:bg-blue-600'
      } text-white transition-colors`}
    >
      {isLoading
        ? 'Loading...'
        : isInWatchlist
        ? 'Remove from Watchlist'
        : 'Add to Watchlist'}
    </button>
  );
}
