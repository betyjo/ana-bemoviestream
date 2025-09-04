import prisma from "@/lib/prisma"; 
import { Movie } from "../../type";

// Get all "Now Playing" movies (example: filter by release date <= today)
export const getNowPlayingMovies = async (): Promise<Movie[]> => {
  const movies = await prisma.movie.findMany({
    where: {
      release_date: {
        lte: new Date(),
      },
    },
    orderBy: {
      popularity: "desc",
    },
  });

  return movies;
};

// Get "Upcoming" movies (release date > today)
export const getUpcomingMovies = async (): Promise<Movie[]> => {
  const movies = await prisma.movie.findMany({
    where: {
      release_date: {
        gt: new Date(),
      },
    },
    orderBy: {
      release_date: "asc",
    },
  });

  return movies;
};

// Get top-rated movies
export const getTopRatedMovies = async (): Promise<Movie[]> => {
  const movies = await prisma.movie.findMany({
    orderBy: {
      vote_average: "desc",
    },
  });

  return movies;
};

// Get popular movies (by popularity)
export const getPopularMovies = async (): Promise<Movie[]> => {
  const movies = await prisma.movie.findMany({
    orderBy: {
      popularity: "desc",
    },
  });

  return movies;
};

// Discover movies by genre or keywords
export const getDiscoverMovies = async (
  genreId?: number,
  keywords?: string
): Promise<Movie[]> => {
  const where: any = {};

  if (genreId) {
    // assuming genreIds is an integer array in Prisma
    where.genreIds = {
      has: genreId,
    };
  }

  if (keywords) {
    where.title = {
      contains: keywords,
      mode: "insensitive",
    };
  }

  const movies = await prisma.movie.findMany({
    where,
    orderBy: {
      popularity: "desc",
    },
  });

  return movies;
};

// Search movies by term
export const getSearchedMovies = async (term: string): Promise<Movie[]> => {
  const movies = await prisma.movie.findMany({
    where: {
      title: {
        contains: term,
        mode: "insensitive",
      },
    },
    orderBy: {
      popularity: "desc",
    },
  });

  return movies;
};

// Get a single movie by ID
export const getMovieDetails = async (id: number): Promise<Movie | null> => {
  const movie = await prisma.movie.findUnique({
    where: { id },
  });

  return movie;
};

// Get videos for a movie
export const getMovieVideos = async (id: number) => {
  const videos = await prisma.video.findMany({
    where: { movieId: id },
  });

  return videos;
};
