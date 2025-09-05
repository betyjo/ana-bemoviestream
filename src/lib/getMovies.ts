import prisma from "@/lib/prisma";
import { Movie, VideoProps } from "@/type";

export function getImagePath(path?: string): string {
  if (!path || path === "") return "/placeholder.jpg";
  return path.startsWith("/") ? path : `/${path}`;
}
// Get all genres
export const getAllGenres = async (): Promise<{ id: number; name: string }[]> => {
  return prisma.genre.findMany();
};

// Get movies by genre
export const getMoviesByGenre = async (genreId: number): Promise<Movie[]> => {
  const movies = await prisma.movie.findMany({
    include: { movieGenres: { include: { genre: true } } },
  });

  return movies
    .filter((m) => m.movieGenres.some((mg) => mg.genre.id === genreId))
    .map(mapMoviePaths);
};

// Map Prisma Movie -> your Movie type
const mapMoviePaths = (movie: any): Movie => ({
  id: movie.id,
  title: movie.title,
  overview: movie.overview ?? "",
  release_date: movie.release_date ?? new Date(),
  popularity: movie.popularity ?? 0,
  vote_average: movie.vote_average ?? 0,
  vote_count: movie.vote_count ?? 0,
  poster_path: getImagePath(movie.poster_path),
  backdrop_path: getImagePath(movie.backdrop_path),
  video: movie.video ?? false,
  genres: movie.movieGenres?.map((mg: any) => ({
    id: mg.genre.id,
    name: mg.genre.name,
  })) || [],
  // generate genre_ids array for your type
  genre_ids: movie.movieGenres?.map((mg: any) => mg.genre.id) || [],
  tagline: movie.tagline ?? "",
  status: movie.status ?? "Released",
  adult: movie.adult ?? false,
  original_language: movie.original_language ?? "en",
  original_title: movie.original_title ?? movie.title,
});

// Movies queries
export const getNowPlayingMovies = async (): Promise<Movie[]> => {
  const movies = await prisma.movie.findMany({
    where: { release_date: { lte: new Date() } },
    orderBy: { popularity: "desc" },
    include: { movieGenres: { include: { genre: true } } },
  });
  return movies.map(mapMoviePaths);
};

export const getUpcomingMovies = async (): Promise<Movie[]> => {
  const movies = await prisma.movie.findMany({
    where: { release_date: { gt: new Date() } },
    orderBy: { release_date: "asc" },
    include: { movieGenres: { include: { genre: true } } },
  });
  return movies.map(mapMoviePaths);
};

export const getTopRatedMovies = async (): Promise<Movie[]> => {
  const movies = await prisma.movie.findMany({
    orderBy: { vote_average: "desc" },
    include: { movieGenres: { include: { genre: true } } },
  });
  return movies.map(mapMoviePaths);
};

export const getPopularMovies = async (): Promise<Movie[]> => {
  const movies = await prisma.movie.findMany({
    orderBy: { popularity: "desc" },
    include: { movieGenres: { include: { genre: true } } },
  });
  return movies.map(mapMoviePaths);
};

export const getDiscoverMovies = async (genreId?: number, keywords?: string): Promise<Movie[]> => {
  const where: any = {};
  if (keywords) where.title = { contains: keywords, mode: "insensitive" };

  const movies = await prisma.movie.findMany({
    where,
    orderBy: { popularity: "desc" },
    include: { movieGenres: { include: { genre: true } } },
  });

  return movies
    .filter((m) => !genreId || m.movieGenres.some((mg: any) => mg.genre.id === genreId))
    .map(mapMoviePaths);
};

export const getSearchedMovies = async (term: string): Promise<Movie[]> => {
  const movies = await prisma.movie.findMany({
    where: { title: { contains: term, mode: "insensitive" } },
    orderBy: { popularity: "desc" },
    include: { movieGenres: { include: { genre: true } } },
  });
  return movies.map(mapMoviePaths);
};

export const getMovieDetails = async (id: number): Promise<Movie | null> => {
  const movie = await prisma.movie.findUnique({
    where: { id },
    include: { movieGenres: { include: { genre: true } } },
  });
  return movie ? mapMoviePaths(movie) : null;
};

export const getMovieVideos = async (movieId: number): Promise<VideoProps[]> => {
  const videos = await prisma.video.findMany({ where: { movieId } });

  return videos.map((v) => ({
    id: v.id.toString(),
    key: v.key,
    name: v.name,
    site: v.site,
    type: v.type,
    official: v.official ?? false,
    size: v.size ?? 1080,
    iso_639_1: v.iso_639_1 ?? "en",          // provide default
    iso_3166_1: v.iso_3166_1 ?? "US",       // provide default
    published_at: v.published_at
      ? v.published_at.toISOString()        // convert Date -> string
      : new Date().toISOString(),           // fallback
  }));
};
