import { Suspense } from 'react';
import MovieGrid from './components/MovieGrid';
import { Movie } from './types';

async function getPopularMovies() {
  const response = await fetch(
    `https://api.themoviedb.org/3/movie/popular?api_key=${process.env.TMDB_API_KEY}&page=1`,
    { next: { revalidate: 3600 } }
  );
  const data = await response.json();
  return data.results as Movie[];
}

export default async function Home() {
  const initialMovies = await getPopularMovies();

  return (
    <main>
      <Suspense fallback={<div>Loading...</div>}>
        <MovieGrid initialMovies={initialMovies} />
      </Suspense>
    </main>
  );
}