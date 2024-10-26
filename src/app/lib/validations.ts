import { z } from 'zod';

 export const movieDetailsSchema = z.object({
  id: z.number(),
  title: z.string(),
  poster_path: z.string().nullable(),
  tagline: z.string().nullable(),
  genres: z.array(z.object({
      id: z.number(),
      name: z.string(),
  })),
  overview: z.string(),
  release_date: z.string(),
  runtime: z.number().nullable(),
  vote_average: z.number(),
});

export const castMemberSchema = z.object({
  id: z.number(),
  name: z.string(),
  profile_path: z.string().nullable(),
  character: z.string(),
});

export const recommendationsSchema = z.object({
  results: z.array(z.object({
      id: z.number(),
      title: z.string(),
      poster_path: z.string().nullable(),
  })),
});
