import { MovieDetails, CastMember, Movie } from '@/app/types';

const API_KEY = 'ed69594f8071f59fdfdb507a02db709d';

export async function fetchMovieDetails(id: string): Promise<MovieDetails> {
    const response = await fetch(`https://api.themoviedb.org/3/movie/${id}?api_key=${API_KEY}`);
    if (!response.ok) throw new Error('Network response was not ok');
    return response.json();
}

export async function fetchMovieCredits(id: string): Promise<{ cast: CastMember[] }> {
    const response = await fetch(`https://api.themoviedb.org/3/movie/${id}/credits?api_key=${API_KEY}`);
    if (!response.ok) throw new Error('Network response was not ok');
    return response.json();
}

export async function fetchMovieRecommendations(id: string): Promise<{ results: Movie[] }> {
    const response = await fetch(`https://api.themoviedb.org/3/movie/${id}/recommendations?api_key=${API_KEY}`);
    if (!response.ok) throw new Error('Network response was not ok');
    return response.json();
}
