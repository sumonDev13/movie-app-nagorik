import { Suspense } from 'react';
import MovieGrid from '../components/MovieGrid';
import { Movie } from '../types';

async function searchMovies(query: string) {
  const response = await fetch(
    `https://api.themoviedb.org/3/search/movie?api_key=${process.env.TMDB_API_KEY}&query=${query}&page=1`
  );
  const data = await response.json();
  return data.results as Movie[];
}

export default async function SearchPage({
  searchParams,
}: {
  searchParams: { q: string };
}) {
  const initialMovies = await searchMovies(searchParams.q);

  return (
    <main>
      <Suspense fallback={<div>Loading...</div>}>
        <MovieGrid initialMovies={initialMovies} searchQuery={searchParams.q} />
      </Suspense>
    </main>
  );
}