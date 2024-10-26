'use client';

import { useState, useEffect, useRef } from 'react';
import MovieCard from './MovieCard';
import { Movie } from '../types';

export default function MovieGrid({ 
  initialMovies,
  searchQuery 
}: { 
  initialMovies: Movie[],
  searchQuery?: string 
}) {
  const [movies, setMovies] = useState<Movie[]>(initialMovies);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [hasMore, setHasMore] = useState(true);
  const observer = useRef<IntersectionObserver>();
  const lastMovieRef = useRef<HTMLDivElement>(null);

  const loadMoreMovies = async () => {
    if (loading || !hasMore) return;
    
    setLoading(true);
    const nextPage = page + 1;
    const queryParams = new URLSearchParams({
      page: nextPage.toString(),
      ...(searchQuery && { query: searchQuery }),
    });

    try {
      const response = await fetch(`/api/movies?${queryParams}`);
      const data = await response.json();
      
      if (data.results.length === 0) {
        setHasMore(false);
        return;
      }

      setMovies(prev => [...prev, ...data.results]);
      setPage(nextPage);
    } catch (error) {
      console.error('Error loading more movies:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (!lastMovieRef.current) return;

    observer.current = new IntersectionObserver(entries => {
      if (entries[0].isIntersecting) {
        loadMoreMovies();
      }
    });

    observer.current.observe(lastMovieRef.current);

    return () => observer.current?.disconnect();
  }, [lastMovieRef, loading, hasMore]);

  useEffect(() => {
    setMovies(initialMovies);
    setPage(1);
    setHasMore(true);
  }, [searchQuery, initialMovies]);

  return (
    <main className="min-h-screen">
      <div className="max-w-full mx-5 xl:max-w-[1280px] xl:mx-auto py-20">
    <div className="grid w-full grid-cols-2 gap-5 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-4 xl:grid-cols-5">
      {movies.map((movie, index) => (
        <div
          key={`${movie.id}-${index}`}
          ref={index === movies.length - 1 ? lastMovieRef : null}
        >
          <MovieCard movie={movie} />
        </div>
      ))}
      {loading && (
        <div className="col-span-full text-center py-4">
          Loading more movies...
        </div>
      )}
      {!hasMore && (
        <div className="col-span-full text-center py-4">
          No more movies to load.
        </div>
      )}
    </div>
    </div>
    </main>
  );
}