import prisma from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function GET(_req: any) {
  const movies = await prisma.movie.findMany();
  return NextResponse.json(movies);
}
