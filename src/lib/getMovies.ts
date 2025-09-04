import prisma from "@/lib/prisma";
import type { Movie, VideoProps } from "../../type";

// Get movies that are "Now Playing" (release date <= today)
export const getNowPlayingMovies = async (): Promise<Movie[]> => {
  return prisma.movie.findMany({
    where: { release_date: { lte: new Date() } },
    orderBy: { popularity: "desc" },
  });
};

// Get upcoming movies (release date > today)
export const getUpcomingMovies = async (): Promise<Movie[]> => {
  return prisma.movie.findMany({
    where: { release_date: { gt: new Date() } },
    orderBy: { release_date: "asc" },
  });
};

// Get top-rated movies
export const getTopRatedMovies = async (): Promise<Movie[]> => {
  return prisma.movie.findMany({
    orderBy: { vote_average: "desc" },
  });
};

// Get popular movies (by popularity)
export const getPopularMovies = async (): Promise<Movie[]> => {
  return prisma.movie.findMany({
    orderBy: { popularity: "desc" },
  });
};

// Discover movies by genre or keyword
export const getDiscoverMovies = async (genreId?: number, keywords?: string): Promise<Movie[]> => {
  const where: any = {};
  if (genreId) where.genreIds = { has: genreId };
  if (keywords) where.title = { contains: keywords, mode: "insensitive" };

  return prisma.movie.findMany({
    where,
    orderBy: { popularity: "desc" },
  });
};

// Search movies by term
export const getSearchedMovies = async (term: string): Promise<Movie[]> => {
  return prisma.movie.findMany({
    where: { title: { contains: term, mode: "insensitive" } },
    orderBy: { popularity: "desc" },
  });
};

// Get movie details by ID
export const getMovieDetails = async (id: number): Promise<Movie | null> => {
  return prisma.movie.findUnique({ where: { id } });
};

// Get movie videos
export const getMovieVideos = async (movieId: number): Promise<VideoProps[]> => {
  return prisma.video.findMany({ where: { movieId } });
};
