import { getWatchlist } from '@/app/lib/actions';
import { NextResponse } from 'next/server';

export async function GET(
  request: Request,
  { params }: { params: { movieId: string } }
) {
  const watchlist = await getWatchlist();
  return NextResponse.json({ 
    isInWatchlist: watchlist.has(params.movieId) 
  });
}
