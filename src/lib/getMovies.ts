import prisma from "@/lib/prisma";
import { getImagePath } from "@/lib/getImagePath";
import type { Movie, VideoProps } from "../../type";

// Helper: maps database Movie to frontend Movie with local poster/backdrop paths
const mapMoviePaths = (movie: Movie): Movie => ({
  ...movie,
  poster_path: movie.poster_path ? getImagePath(movie.poster_path) : undefined,
  backdrop_path: movie.backdrop_path ? getImagePath(movie.backdrop_path) : undefined,
});

// Get movies that are "Now Playing" (release date <= today)
export const getNowPlayingMovies = async (): Promise<Movie[]> => {
  const movies = await prisma.movie.findMany({
    where: { release_date: { lte: new Date() } },
    orderBy: { popularity: "desc" },
  });
  return movies.map(mapMoviePaths);
};

// Get upcoming movies (release date > today)
export const getUpcomingMovies = async (): Promise<Movie[]> => {
  const movies = await prisma.movie.findMany({
    where: { release_date: { gt: new Date() } },
    orderBy: { release_date: "asc" },
  });
  return movies.map(mapMoviePaths);
};

// Get top-rated movies
export const getTopRatedMovies = async (): Promise<Movie[]> => {
  const movies = await prisma.movie.findMany({
    orderBy: { vote_average: "desc" },
  });
  return movies.map(mapMoviePaths);
};

// Get popular movies
export const getPopularMovies = async (): Promise<Movie[]> => {
  const movies = await prisma.movie.findMany({
    orderBy: { popularity: "desc" },
  });
  return movies.map(mapMoviePaths);
};

// Discover movies by genre or keyword
export const getDiscoverMovies = async (genreId?: number, keywords?: string): Promise<Movie[]> => {
  const where: {
    genreIds?: { has: number };
    title?: { contains: string; mode: "insensitive" };
  } = {};

  if (genreId) where.genreIds = { has: genreId };
  if (keywords) where.title = { contains: keywords, mode: "insensitive" };

  const movies = await prisma.movie.findMany({
    where,
    orderBy: { popularity: "desc" },
  });

  return movies.map(mapMoviePaths);
};

// Search movies by term
export const getSearchedMovies = async (term: string): Promise<Movie[]> => {
  const movies = await prisma.movie.findMany({
    where: { title: { contains: term, mode: "insensitive" } },
    orderBy: { popularity: "desc" },
  });
  return movies.map(mapMoviePaths);
};

// Get movie details by ID
export const getMovieDetails = async (id: number): Promise<Movie | null> => {
  const movie = await prisma.movie.findUnique({ where: { id } });
  return movie ? mapMoviePaths(movie) : null;
};

// Get movie videos
export const getMovieVideos = async (movieId: number): Promise<VideoProps[]> => {
  return prisma.video.findMany({ where: { movieId } });
};
