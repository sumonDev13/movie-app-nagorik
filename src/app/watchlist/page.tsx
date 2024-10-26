import { getWatchlist } from '../lib/actions';
import MovieGrid from '@/app/components/MovieGrid';
import { Movie } from '@/app/types';

async function getWatchlistMovies(): Promise<Movie[]> {
  const watchlist = await getWatchlist();
  const movies = await Promise.all(
    Array.from(watchlist).map(async (id) => {
      const response = await fetch(
        `https://api.themoviedb.org/3/movie/${id}?api_key=${process.env.TMDB_API_KEY}`,
        { next: { revalidate: 60 } }
      );
      return response.json();
    })
  );
  return movies;
}

export default async function WatchlistPage() {
  const movies = await getWatchlistMovies();

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">My Watchlist</h1>
      {movies.length === 0 ? (
        <p className="text-gray-600">Your watchlist is empty.</p>
      ) : (
        <MovieGrid initialMovies={movies} />
      )}
    </div>
  );
}