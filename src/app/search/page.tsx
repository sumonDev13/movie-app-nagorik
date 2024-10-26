'use client';

import { Suspense } from 'react';
import { useQuery } from '@tanstack/react-query';
import MovieGrid from '../components/MovieGrid';
import { searchMovies } from '../api/movies/movieAPI';


export default function SearchPage({ searchParams }: { searchParams: { q: string } }) {
    const { data: movies, error } = useQuery({
        queryKey: ['searchMovies', searchParams.q],
        queryFn: () => searchMovies(searchParams.q),
    });

    if (error) {
        return <div>Error loading search results. Please try again later.</div>;
    }

    if (!movies) {
        return <div>Loading...</div>;
    }

    return (
        <main>
            <Suspense fallback={<div>Loading...</div>}>
                <MovieGrid initialMovies={movies} searchQuery={searchParams.q} />
            </Suspense>
        </main>
    );
}
