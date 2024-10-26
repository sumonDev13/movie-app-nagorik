'use client';

import { Suspense } from 'react';
import { useQuery } from '@tanstack/react-query';
import MovieGrid from './components/MovieGrid';
import { fetchPopularMovies } from './api/movies/movieAPI';

export default function Home() {
  const { data: popularMovies, error } = useQuery({
    queryKey: ['popularMovies'],
    queryFn: fetchPopularMovies,
  });

  if (error) {
    return <div>Error loading popular movies. Please try again later.</div>;
  }

  if (!popularMovies) {
    return <div>Loading...</div>;
  }

  return (
    <main>
      <h1 className="my-4 text-center text-3xl font-black">Popular Movies</h1>
      <Suspense fallback={<div>Loading...</div>}>
        <MovieGrid initialMovies={popularMovies} />
      </Suspense>
    </main>
  );
}
