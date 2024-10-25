import { fetchConfig, TMDB_API_KEY } from './auth';
import { movieSchema, movieListSchema} from './validations';

const BASE_URL = 'https://api.themoviedb.org/3';

export async function fetchMovieDetails(id: string) {
  try {
    const response = await fetch(
      `${BASE_URL}/movie/${id}?api_key=${TMDB_API_KEY}`,
      fetchConfig
    );
    const data = await response.json();
    return movieSchema.parse(data);
  } catch (error) {
    console.error('Error fetching movie details:', error);
    throw error;
  }
}

export async function searchMovies(query: string, page: number = 1) {
  try {
    const response = await fetch(
      `${BASE_URL}/search/movie?api_key=${TMDB_API_KEY}&query=${query}&page=${page}`,
      fetchConfig
    );
    const data = await response.json();
    return movieListSchema.parse(data);
  } catch (error) {
    console.error('Error searching movies:', error);
    throw error;
  }
}