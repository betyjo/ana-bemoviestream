// Movie type
export type Movie = {
  genre: any;
  id: number;
  title: string;
  overview: string;
  release_date: Date | string;
  popularity: number;
  vote_average: number;
  vote_count: number;
  poster_path: string;
  backdrop_path: string;
  video: boolean;
  genre_ids: number[];
  genres?: Genre[];       // optional array of genre objects
  tagline?: string;
  status?: string;
  adult?: boolean;
  original_language?: string;
  original_title?: string;
};

// Genre type
export type Genre = {
  id: number;
  name: string;
};

// Video type
export type VideoProps = {
  id: string;
  iso_639_1: string;
  iso_3166_1: string;
  key: string;
  name: string;
  official: boolean;
  published_at: string;
  site: string;
  size: number;
  type: string;
};

// Collection types
export type SearchResults = {
  page: number;
  results: Movie[];
  total_pages: number;
  total_results: number;
};

export type Genres = {
  genres: Genre[];
};

export type Videos = {
  videos: VideoProps[];
};
