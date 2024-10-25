export const TMDB_API_KEY = process.env.TMDB_API_KEY;
export const AUTH_COOKIE_NAME = 'auth_token';

// Add your TMDB API read access token here
export const TMDB_AUTH_TOKEN = 'eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJlZDY5NTk0ZjgwNzFmNTlmZGZkYjUwN2EwMmRiNzA5ZCIsIm5iZiI6MTcyOTY5NjAzMy42OTE4MzYsInN1YiI6IjY3MTkwZjcwNWJlOWU4NzU5ZGE2YjcyNSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.QUnBzKxBVXpiiZv8thtgcEkTmrHrkWdO3aMgihoR5Tg';

export const fetchConfig = {
  headers: {
    'Authorization': TMDB_AUTH_TOKEN,
    'accept': 'application/json'
  },
  next: { revalidate: 60 }
};