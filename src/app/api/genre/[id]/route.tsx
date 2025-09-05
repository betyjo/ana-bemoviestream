import prisma from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function GET(
  req: Request,
  { params }: { params: { id: string } }
) {
  const genreId = parseInt(params.id, 10);

  // Fetch all movies that belong to this genre
  const movies = await prisma.movie.findMany({
    where: {
      genres: {
        some: { genreId }, // filter by join table
      },
    },
    include: {
      genres: {
        include: { genre: true },
      },
    },
  });

  // Grab the genre itself
  const genre = await prisma.genre.findUnique({
    where: { id: genreId },
  });

  if (!genre) {
    return NextResponse.json({ error: "Genre not found" }, { status: 404 });
  }

  return NextResponse.json({
    genre,
    movies,
  });
}
