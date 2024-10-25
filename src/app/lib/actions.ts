'use server';

import { revalidatePath } from 'next/cache';
import { cookies } from 'next/headers';
import { MovieDetails } from '@/app/types';

type WatchlistState = {
  movies: Map<number, MovieDetails>;
  version: number;
};

let watchlistState: WatchlistState = {
  movies: new Map(),
  version: 0,
};

export async function addToWatchlist(movie: MovieDetails, optimisticVersion: number) {
  // Check if the optimistic update is still valid
  if (optimisticVersion !== watchlistState.version) {
    throw new Error('Optimistic update conflict');
  }

  watchlistState.movies.set(movie.id, movie);
  watchlistState.version++;
  
  revalidatePath('/watchlist');
  return { success: true, version: watchlistState.version };
}

export async function removeFromWatchlist(movieId: number, optimisticVersion: number) {
  if (optimisticVersion !== watchlistState.version) {
    throw new Error('Optimistic update conflict');
  }

  watchlistState.movies.delete(movieId);
  watchlistState.version++;
  
  revalidatePath('/watchlist');
  return { success: true, version: watchlistState.version };
}

export async function getWatchlist() {
  // Simulate checking authentication
  const cookieStore = cookies();
  if (!cookieStore.has('auth_token')) {
    throw new Error('Unauthorized');
  }
  
  return {
    movies: Array.from(watchlistState.movies.values()),
    version: watchlistState.version,
  };
}