import { NextRequest, NextResponse } from 'next/server';

const TMDB_API_KEY = process.env.TMDB_API_KEY;
const BASE_URL = 'https://api.themoviedb.org/3';

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams;
  const page = searchParams.get('page') || '1';
  const query = searchParams.get('query');

  const endpoint = query
    ? `${BASE_URL}/search/movie?api_key=${TMDB_API_KEY}&query=${query}&page=${page}`
    : `${BASE_URL}/movie/popular?api_key=${TMDB_API_KEY}&page=${page}`;

  try {
    const response = await fetch(endpoint);
    const data = await response.json();
    return NextResponse.json(data);
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  } catch (error) {
    return NextResponse.json({ error: 'Failed to fetch movies' }, { status: 500 });
  }
}