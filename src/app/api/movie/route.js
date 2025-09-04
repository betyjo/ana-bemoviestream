import prisma from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function GET(req) {
  const movies = await prisma.movie.findMany();
  return NextResponse.json(movies);
}
