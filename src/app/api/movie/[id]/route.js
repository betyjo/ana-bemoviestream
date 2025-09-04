// GET /api/movies/:id
import prisma from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function GET(req, { params }) {
  const movie = await prisma.movie.findUnique({
    where: { id: parseInt(params.id) },
    include: { videos: true },
  });

  if (!movie) return NextResponse.json({ error: "Movie not found" }, { status: 404 });

  return NextResponse.json(movie);
}
