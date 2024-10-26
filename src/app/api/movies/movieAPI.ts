import { z } from 'zod';
import { MovieDetails, CastMember, Movie } from '@/app/types';
import { movieDetailsSchema,castMemberSchema,recommendationsSchema } from '@/app/lib/validations';

const API_KEY = 'ed69594f8071f59fdfdb507a02db709d';


// Enable dynamic caching

export async function fetchPopularMovies(): Promise<Movie[]> {
    const response = await fetch(`https://api.themoviedb.org/3/movie/popular?api_key=${API_KEY}&page=1`, {
        cache: 'force-cache',
        next: { revalidate: 3600 },
    });
    if (!response.ok) throw new Error('Network response was not ok');
    const data = await response.json();
    return data.results as Movie[];
}

export async function searchMovies(query: string): Promise<Movie[]> {
    const response = await fetch(`https://api.themoviedb.org/3/search/movie?api_key=${API_KEY}&query=${query}&page=1`, {
        cache: 'force-cache',
        next: { revalidate: 60 },
    });
    if (!response.ok) throw new Error('Network response was not ok');
    const data = await response.json();
    return data.results as Movie[];
}

export async function fetchMovieDetails(id: string): Promise<MovieDetails> {
    const response = await fetch(`https://api.themoviedb.org/3/movie/${id}?api_key=${API_KEY}`, {
        cache: 'force-cache',
        next: { revalidate: 60 },
    });
    if (!response.ok) throw new Error('Network response was not ok');
    
    const data = await response.json();
     return movieDetailsSchema.parse(data);  // Validate response
}

export async function fetchMovieCredits(id: string): Promise<{ cast: CastMember[] }> {
    const response = await fetch(`https://api.themoviedb.org/3/movie/${id}/credits?api_key=${API_KEY}`, {
        cache: 'force-cache',
        next: { revalidate: 60 }
    });
    if (!response.ok) throw new Error('Network response was not ok');
    
    const data = await response.json();
    return { cast: z.array(castMemberSchema).parse(data.cast) }; 
}

export async function fetchMovieRecommendations(id: string): Promise<{ results: Movie[] }> {
    const response = await fetch(`https://api.themoviedb.org/3/movie/${id}/recommendations?api_key=${API_KEY}`, {
        cache: 'force-cache', 
        next: { revalidate: 60 },
    });
    if (!response.ok) throw new Error('Network response was not ok');
    
    const data = await response.json();
    return recommendationsSchema.parse(data);  // Validate response
}