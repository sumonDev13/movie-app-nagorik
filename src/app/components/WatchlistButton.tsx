'use client'
import { useState, useEffect } from 'react';
import { Heart } from 'lucide-react';
import { toggleWatchlist } from '../lib/actions';

export default function WatchlistButton({ movieId }: { movieId: string }) {
  const [isInWatchlist, setIsInWatchlist] = useState(false);
  const [isPending, setIsPending] = useState(false);

  useEffect(() => {
    // Check initial watchlist status
    fetch(`/api/watchlist/check/${movieId}`)
      .then(res => res.json())
      .then(data => setIsInWatchlist(data.isInWatchlist));
  }, [movieId]);

  const handleToggle = async () => {
    try {
      setIsPending(true);
      const isAdded = await toggleWatchlist(movieId);
      setIsInWatchlist(isAdded);
    } catch (error) {
      console.error('Error toggling watchlist:', error);
    } finally {
      setIsPending(false);
    }
  };

  return (
    <button
      onClick={handleToggle}
      disabled={isPending}
      className={`flex items-center gap-2 px-4 py-2 rounded-full transition-colors ${
        isInWatchlist 
          ? 'bg-pink-600 text-white hover:bg-pink-700' 
          : 'bg-gray-200 text-black hover:bg-green-700'
      }`}
    >
      <Heart 
        className={`${isInWatchlist ? 'fill-current' : ''}`} 
        size={20} 
      />
      {isInWatchlist ? 'Remove from Watchlist' : 'Add to Watchlist'}
    </button>
  );
}