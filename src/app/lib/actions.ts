'use server'

const watchlist = new Set<string>();

export async function getWatchlist(): Promise<Set<string>> {
  return watchlist;
}

export async function toggleWatchlist(movieId: string): Promise<boolean> {
  if (watchlist.has(movieId)) {
    watchlist.delete(movieId);
    return false;
  } else {
    watchlist.add(movieId);
    return true;
  }
}