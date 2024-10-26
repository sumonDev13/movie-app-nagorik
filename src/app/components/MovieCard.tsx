'use client';

import Image from 'next/image';
import Link from 'next/link';
import { Movie } from '../types';

export default function MovieCard({ movie }: { movie: Movie }) {
  const posterUrl = movie.poster_path
    ? `https://image.tmdb.org/t/p/w500${movie.poster_path}`
    : '/placeholder.jpg';

  return (
    <Link href={`/movies/${movie.id}`}>
      <div className="bg-white rounded-lg shadow-lg overflow-hidden transition-transform hover:scale-105">
        <div className="relative h-96">
          <Image
            src={posterUrl}
            alt={movie.title}
            fill
            className="object-cover"
            loading="lazy"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          />
        </div>
        <div className="p-4">
          <h2 className="text-xl font-semibold mb-2 text-black">{movie.title}</h2>
          <p className="text-gray-600 text-sm mb-2">
            {new Date(movie.release_date).getFullYear()}
          </p>
          <div className="flex items-center">
            <span className="text-yellow-500">★</span>
            <span className="ml-1 text-gray-700">{movie.vote_average ? movie.vote_average.toFixed(1) : 'N/A'}</span>
          </div>
        </div>
      </div>
    </Link>
  );
}