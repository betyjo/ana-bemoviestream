import prisma from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function GET() {
  const movies = (await prisma.movie.findMany({
    select: { genreIds: true },
  })) as { genreIds: number[] }[];

  const genreSet = new Set<number>();
  movies.forEach((movie) => {
    movie.genreIds.forEach((id) => genreSet.add(id));
  });

  const genres = Array.from(genreSet).map((id) => ({
    id,
    name: `Genre ${id}`,
  }));

  return NextResponse.json(genres);
}
