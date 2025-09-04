import prisma from "@/lib/prisma";
import type { Genre } from "../../type"; // 

export const getAllGenres = async (genreId: number): Promise<Genre[]> => {
 
  const movies = await prisma.movie.findMany({
    select: { genreIds: true },
  });


  const genreSet = new Set<number>();
  movies.forEach((movie: { genreIds: any[]; }) => {
    movie.genreIds.forEach((id) => genreSet.add(id));
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
