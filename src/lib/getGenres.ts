import prisma from "@/lib/prisma";
import type { Genre } from "@/type";

export const getAllGenres = async (): Promise<Genre[]> => {
  // Fetch the MovieGenre relations instead of a non-existent `genreIds`
  const movies = await prisma.movie.findMany({
    select: {
      genres: {
        select: {
          genreId: true,
        },
      },
    },
  });

  const genreSet = new Set<number>();

  // Extract genre IDs from the relation
  movies.forEach((movie) => {
    movie.genres.forEach((mg) => genreSet.add(mg.genreId));
  });

  return Array.from(genreSet).map((id) => ({
    id,
    name: getGenreNameById(id),
  }));
};

const getGenreNameById = (id: number): string => {
  const genreMap: Record<number, string> = {
    1: "Action",
    2: "Rom-Com",
    3: "Romance",
    4: "Horror",
    5: "Cartoon",
    6: "Adventure",
    7: "Sci-Fi",
    8: "Comedy",
    9: "Drama",
  };

  return genreMap[id] || `Genre ${id}`;
};
