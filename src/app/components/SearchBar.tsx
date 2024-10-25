'use client';

import { useForm } from 'react-hook-form';
import { useRouter } from 'next/navigation';
import { useState, useEffect } from 'react';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';

const searchSchema = z.object({
  query: z.string().min(2, 'Search query must be at least 2 characters'),
});

type SearchForm = z.infer<typeof searchSchema>;

export default function SearchBar() {
  const router = useRouter();
  const [debouncedQuery, setDebouncedQuery] = useState('');
  
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<SearchForm>({
    resolver: zodResolver(searchSchema),
  });

  const query = watch('query');

  useEffect(() => {
    const timer = setTimeout(() => {
      if (query && query.length >= 2) {
        setDebouncedQuery(query);
        router.push(`/search?q=${encodeURIComponent(query)}`);
      }
    }, 500);

    return () => clearTimeout(timer);
  }, [query, router]);

  const onSubmit = (data: SearchForm) => {
    router.push(`/search?q=${encodeURIComponent(data.query)}`);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="w-full max-w-2xl mx-auto p-4">
      <div className="relative">
        <input
          {...register('query')}
          type="text"
          placeholder="Search movies..."
          className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        {errors.query && (
          <p className="text-red-500 text-sm mt-1">{errors.query.message}</p>
        )}
        <button
          type="submit"
          className="absolute right-2 top-1/2 transform -translate-y-1/2 px-4 py-1 bg-blue-500 text-white rounded-lg"
        >
          Search
        </button>
      </div>
    </form>
  );
}
