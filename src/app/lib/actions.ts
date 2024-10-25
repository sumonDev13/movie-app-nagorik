'use server';

import { MovieDetails } from "../types";

let watchlist = new Map<number, MovieDetails>();

export async function addToWatchlist(movie: MovieDetails) {
  watchlist.set(movie.id, movie);
  return { success: true };
}

export async function removeFromWatchlist(movieId: number) {
  watchlist.delete(movieId);
  return { success: true };
}

export async function getWatchlist(): Promise<MovieDetails[]> {
  return Array.from(watchlist.values());
}