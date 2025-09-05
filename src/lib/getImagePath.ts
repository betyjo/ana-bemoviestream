import prisma from "@/lib/prisma";
import { Movie, VideoProps } from "@/type";

// Returns a proper image path or placeholder
export function getImagePath(path?: string): string {
  if (!path || path === "") return "/placeholder.jpg";
  return path.startsWith("/") ? path : `/${path}`;
}

// Map a Prisma movie object to your Movie type
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
  genre_ids: movie.movieGenres?.map((mg: any) => mg.genre.id) || [],
  tagline: movie.tagline ?? "",
  status: movie.status ?? "Released",
  adult: movie.adult ?? false,
  original_language: movie.original_language ?? "en",
  original_title: movie.original_title ?? movie.title,
});

// Generic fetch helper
const fetchMovies = async (where: any = {}, orderBy: any = {}): Promise<Movie[]> => {
  const movies = await prisma.movie.findMany({
    where,
    orderBy,
    include: { movieGenres: { include: { genre: true } } },
  });
  return movies.map(mapMoviePaths);
};

// Now playing
export const getNowPlayingMovies = () =>
  fetchMovies({ release_date: { lte: new Date() } }, { popularity: "desc" });

// Upcoming
export const getUpcomingMovies = () =>
  fetchMovies({ release_date: { gt: new Date() } }, { release_date: "asc" });

// Top rated
export const getTopRatedMovies = () => fetchMovies({}, { vote_average: "desc" });

// Popular
export const getPopularMovies = () => fetchMovies({}, { popularity: "desc" });

// Discover movies by genre or keywords
export const getDiscoverMovies = (genreId?: number, keywords?: string) => {
  const where: any = {};
  if (keywords) where.title = { contains: keywords, mode: "insensitive" };
  return fetchMovies(where, { popularity: "desc" }).then((movies) =>
    genreId ? movies.filter((m) => m.genre_ids.includes(genreId)) : movies
  );
};

// Search movies
export const getSearchedMovies = (term: string) =>
  fetchMovies({ title: { contains: term, mode: "insensitive" } }, { popularity: "desc" });

// Single movie details
export const getMovieDetails = async (id: number): Promise<Movie | null> => {
  const movie = await prisma.movie.findUnique({
    where: { id },
    include: { movieGenres: { include: { genre: true } } },
  });
  return movie ? mapMoviePaths(movie) : null;
};

// Movie videos
export const getMovieVideos = async (movieId: number): Promise<VideoProps[]> => {
  const videos = await prisma.video.findMany({ where: { movieId } });
  return videos.map((v) => ({
    id: v.id.toString(),
    iso_639_1: v.iso_639_1 ?? "en",
    iso_3166_1: v.iso_3166_1 ?? "US",
    name: v.name,
    movieId: v.movieId,
    key: v.key,
    site: v.site,
    type: v.type,
    official: v.official ?? false,
    size: v.size ?? 1080,
    published_at: v.published_at?.toISOString() ?? new Date().toISOString(),
  }));
};

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
    .filter((m) => m.movieGenres.some((mg: any) => mg.genre.id === genreId))
    .map(mapMoviePaths);
};
