'use client';

import { useState } from 'react';
import { MovieDetails } from '@/app/types';
import { addToWatchlist,removeFromWatchlist } from '../lib/actions';
import { useOptimistic } from 'react';

type OptimisticState = {
  isInWatchlist: boolean;
  version: number;
};

export default function WatchlistButton({ 
  movie,
  initialState = { isInWatchlist: false, version: 0 }
}: { 
  movie: MovieDetails;
  initialState?: OptimisticState;
}) {
  const [optimisticState, setOptimisticState] = useOptimistic<OptimisticState>(
    initialState,
    (state, update: Partial<OptimisticState>) => ({ ...state, ...update })
  );
  
  const [error, setError] = useState<string | null>(null);

  const handleWatchlist = async () => {
    try {
      setError(null);
      const newIsInWatchlist = !optimisticState.isInWatchlist;
      
      // Optimistically update the UI
      setOptimisticState({ 
        isInWatchlist: newIsInWatchlist,
        version: optimisticState.version + 1 
      });

      // Perform the actual update
      const action = newIsInWatchlist ? addToWatchlist : removeFromWatchlist;
      const result = await action(
        newIsInWatchlist ? movie : movie.id,
        optimisticState.version
      );

      if (!result.success) {
        // Revert optimistic update if server update failed
        setOptimisticState({ 
          isInWatchlist: !newIsInWatchlist,
          version: optimisticState.version 
        });
        setError('Failed to update watchlist');
      }
    } catch (err) {
      setOptimisticState({ 
        isInWatchlist: !optimisticState.isInWatchlist,
        version: optimisticState.version 
      });
      setError('An error occurred');
    }
  };

  return (
    <div>
      <button
        onClick={handleWatchlist}
        className={`px-6 py-2 rounded-lg ${
          optimisticState.isInWatchlist
            ? 'bg-red-500 hover:bg-red-600'
            : 'bg-blue-500 hover:bg-blue-600'
        } text-white transition-colors`}
      >
        {optimisticState.isInWatchlist ? 'Remove from Watchlist' : 'Add to Watchlist'}
      </button>
      {error && <p className="text-red-500 mt-2 text-sm">{error}</p>}
    </div>
  );
}