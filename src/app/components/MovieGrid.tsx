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
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 p-6">
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
  );
}