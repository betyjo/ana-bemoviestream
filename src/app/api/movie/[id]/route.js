// GET /api/movies/:id
import prisma from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function GET(req, { params }) {
  const movie = await prisma.movie.findUnique({
    where: { id: parseInt(params.id) },
    include: { videos: true },
  });

  if (!movie)
    return NextResponse.json({ error: "Movie not found" }, { status: 404 });

  // Convert all Date fields to ISO strings
  const serializedMovie = {
    ...movie,
    release_date: movie.release_date
      ? movie.release_date.toISOString()
      : null,
    createdAt: movie.createdAt ? movie.createdAt.toISOString() : null, // if exists
    updatedAt: movie.updatedAt ? movie.updatedAt.toISOString() : null, // if exists
    videos: movie.videos.map((v) => ({
      ...v,
      published_at: v.published_at ? v.published_at.toISOString() : null,
    })),
  };

  return NextResponse.json(serializedMovie);
}
