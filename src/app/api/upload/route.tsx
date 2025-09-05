import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/prisma";

export async function POST(req: NextRequest) {
  try {
    const { filename, url, userId } = await req.json();

    if (!filename || !url || !userId) {
      return NextResponse.json({ error: "Missing fields" }, { status: 400 });
    }

    const upload = await prisma.upload.create({
      data: {
        filename,
        url,
        uploadedBy: userId,
      },
    });

    return NextResponse.json(upload, { status: 201 });
  } catch (error) {
    console.error("Upload error:", error);
    return NextResponse.json({ error: "Failed to upload" }, { status: 500 });
  }
}
