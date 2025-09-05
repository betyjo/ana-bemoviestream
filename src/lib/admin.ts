import prisma from "@/lib/prisma";

export const createMovie = async (movieData: {
  title: string;
  overview?: string;
  release_date?: Date;
  poster_path?: string;
  backdrop_path?: string;
  popularity?: number;
  vote_average?: number;
  vote_count?: number;
  video?: boolean;
  genreIds?: number[];
}) => {
  const createdMovie = await prisma.movie.create({
    data: {
      title: movieData.title,
      overview: movieData.overview,
      release_date: movieData.release_date,
      poster_path: movieData.poster_path,
      backdrop_path: movieData.backdrop_path,
      popularity: movieData.popularity,
      vote_average: movieData.vote_average,
      vote_count: movieData.vote_count,
      video: movieData.video,
    },
  });

  if (movieData.genreIds && movieData.genreIds.length > 0) {
    await prisma.movieGenre.createMany({
      data: movieData.genreIds.map((genreId) => ({
        movieId: createdMovie.id,
        genreId,
      })),
      skipDuplicates: true,
    });
  }

  return createdMovie;
};
