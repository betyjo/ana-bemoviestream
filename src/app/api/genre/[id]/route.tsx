import prisma from "@/lib/prisma";
import { NextResponse } from "next/server";

// GET /api/movies/genre/:id
export async function GET(
  req: Request,
  { params }: { params: { id: string } }
) {
  const genreId = parseInt(params.id);

  const movies = await prisma.movie.findMany({
    where: { genreIds: { has: genreId } },
  });

  return NextResponse.json(movies);
}
