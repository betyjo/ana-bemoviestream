import prisma from "@/lib/prisma";
import { Movie, VideoProps } from "../../type";


export function getImagePath(path?: string): string {
  if (!path || path === "") return "/placeholder.jpg"; 
  return path.startsWith("/") ? path : `/${path}`;
}

const mapMoviePaths = (movie: Movie): Movie => ({
  ...movie,
  poster_path: getImagePath(movie.poster_path),
  backdrop_path: getImagePath(movie.backdrop_path),
});

export const getNowPlayingMovies = async (): Promise<Movie[]> => {
  const movies = await prisma.movie.findMany({
    where: { release_date: { lte: new Date() } },
    orderBy: { popularity: "desc" },
  });
  return movies.map(mapMoviePaths);
};


export const getUpcomingMovies = async (): Promise<Movie[]> => {
  const movies = await prisma.movie.findMany({
    where: { release_date: { gt: new Date() } },
    orderBy: { release_date: "asc" },
  });
  return movies.map(mapMoviePaths);
};


export const getTopRatedMovies = async (): Promise<Movie[]> => {
  const movies = await prisma.movie.findMany({
    orderBy: { vote_average: "desc" },
  });
  return movies.map(mapMoviePaths);
};

export const getPopularMovies = async (): Promise<Movie[]> => {
  const movies = await prisma.movie.findMany({
    orderBy: { popularity: "desc" },
  });
  return movies.map(mapMoviePaths);
};


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


export const getSearchedMovies = async (term: string): Promise<Movie[]> => {
  const movies = await prisma.movie.findMany({
    where: { title: { contains: term, mode: "insensitive" } },
    orderBy: { popularity: "desc" },
  });
  return movies.map(mapMoviePaths);
};

export const getMovieDetails = async (id: number): Promise<Movie | null> => {
  const movie = await prisma.movie.findUnique({ where: { id } });
  return movie ? mapMoviePaths(movie) : null;
};


export const getMovieVideos = async (movieId: number): Promise<VideoProps[]> => {
  return prisma.video.findMany({ where: { movieId } });
};
