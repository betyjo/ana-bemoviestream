import prisma from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function GET() {
  const movies = await prisma.movie.findMany({
    include: {
      genres: {
        include: {
          genre: true,
        },
      },
    },
  });

  const genreMap = new Map<number, { id: number; name: string }>();

  movies.forEach((movie) => {
    movie.genres.forEach((mg) => {
      genreMap.set(mg.genre.id, { id: mg.genre.id, name: mg.genre.name });
    });
  });

  const genres = Array.from(genreMap.values());

  return NextResponse.json({ genres, movies });
}
