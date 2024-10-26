'use client';

import Image from 'next/image';
import { Suspense } from 'react';
import { useQuery } from '@tanstack/react-query';
import { fetchMovieDetails,fetchMovieCredits,fetchMovieRecommendations } from '@/app/api/movies/movieAPI';
import MovieGrid from '@/app/components/MovieGrid';
import WatchlistButton from '@/app/components/WatchlistButton';

export default function MoviePage({ params }: { params: { id: string } }) {
    const { data: movie, error: movieError } = useQuery({
        queryKey: ['movie', params.id],
        queryFn: () => fetchMovieDetails(params.id),
    });

    const { data: credits, error: creditsError } = useQuery({
        queryKey: ['credits', params.id],
        queryFn: () => fetchMovieCredits(params.id),
    });

    const { data: recommendations, error: recommendationsError } = useQuery({
        queryKey: ['recommendations', params.id],
        queryFn: () => fetchMovieRecommendations(params.id),
    });

    if (movieError || creditsError || recommendationsError) {
        return <div>Error loading movie details. Please try again later.</div>;
    }

    if (!movie || !credits || !recommendations) {
        return <div>Loading...</div>;
    }

    return (
        <div className="max-w-7xl mx-auto px-4 py-8">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                <div className="relative h-[600px]">
                    <Image
                        src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
                        alt={movie.title}
                        fill
                        className="object-cover rounded-lg"
                        priority
                    />
                </div>
                <div className="md:col-span-2">
                    <h1 className="text-4xl font-bold mb-4">{movie.title}</h1>
                    {movie.tagline && <p className="text-xl text-gray-500 italic mb-4">{movie.tagline}</p>}
                    <div className="flex flex-wrap gap-2 mb-4">
                        {movie.genres.map(genre => (
                            <span key={genre.id} className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full">
                                {genre.name}
                            </span>
                        ))}
                    </div>
                    <p className="text-lg mb-6">{movie.overview}</p>
                    <div className="mb-6">
                        <p><strong>Release Date:</strong> {new Date(movie.release_date).toLocaleDateString()}</p>
                        <p><strong>Runtime:</strong> {movie.runtime} minutes</p>
                        <p><strong>Rating:</strong> {movie.vote_average.toFixed(1)}/10</p>
                        <div className="mt-4">
                            <WatchlistButton movieId={params.id} />
                        </div>
                    </div>
                </div>
            </div>
            <section className="my-12">
                <h2 className="text-2xl font-bold mb-6">Cast</h2>
                <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4">
                    {credits.cast.slice(0, 6).map(member => (
                        <div key={member.id} className="text-center">
                            <div className="relative h-48 mb-2">
                                <Image
                                    src={member.profile_path ? `https://image.tmdb.org/t/p/w200${member.profile_path}` : '/placeholder-actor.jpg'}
                                    alt={member.name}
                                    fill
                                    className="object-cover rounded"
                                />
                            </div>
                            <p className="font-semibold">{member.name}</p>
                            <p className="text-sm text-gray-600">{member.character}</p>
                        </div>
                    ))}
                </div>
            </section>
            <section className="my-12">
                <h2 className="text-2xl font-bold mb-6">Recommended Movies</h2>
                <Suspense fallback={<div>Loading recommendations...</div>}>
                    <MovieGrid initialMovies={recommendations.results.slice(0, 6)} />
                </Suspense>
            </section>
        </div>
    );
}
