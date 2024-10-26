export interface Movie {
    id: number;
    title: string;
    poster_path: string;
    overview: string;
    release_date: string;
    vote_average: number;
  }

  export interface MovieDetails extends Movie {
    genres: { id: number; name: string }[];
    runtime: number | null;
    tagline: string;
  }
  
  export interface CastMember {
    id: number;
    name: string;
    character: string;
    profile_path: string | null;
  }