import prisma from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    const data = await req.json();

    const {
      title,
      overview,
      release_date,
      poster_path,
      backdrop_path,
      video,
      vote_average,
      vote_count,
      popularity,
      genreIds, // renamed to match your example
      tagline,
      status,
      adult,
      original_language,
      original_title,
      trailer_url,
    } = data;

    // Validate required fields
    if (!title || !overview || !release_date || !poster_path) {
      return NextResponse.json(
        { error: "Missing required fields" },
        { status: 400 }
      );
    }

    // Create movie with genre connections if genreIds are provided
    const movie = await prisma.movie.create({
      data: {
        title,
        overview,
        release_date: new Date(release_date),
        poster_path,
        backdrop_path: backdrop_path || "",
        video: video || false,
        vote_average: vote_average || 0,
        vote_count: vote_count || 0,
        popularity: popularity || 0,
        tagline: tagline || "",
        status: status || "",
        adult: adult || false,
        original_language: original_language || "",
        original_title: original_title || "",
        trailer_url: trailer_url || "",
        genres: genreIds?.length
          ? {
              connect: genreIds.map((id: number) => ({ id })),
            }
          : undefined,
      },
      include: {
        genres: true, // include connected genres in the response
      },
    });

    return NextResponse.json(movie, { status: 201 });
  } catch (err) {
    console.error(err);
    return NextResponse.json(
      { error: "Failed to create movie" },
      { status: 500 }
    );
  }
}
export async function GET(_req: any) {
  const movies = await prisma.movie.findMany();
  return NextResponse.json(movies);
}
