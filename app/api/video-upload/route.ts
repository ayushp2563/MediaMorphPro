import { NextRequest, NextResponse } from "next/server";
import { auth } from "@clerk/nextjs/server";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function POST(request: NextRequest) {
  try {
    // TODO: Implement user authentication
    // const { userId } = auth();
    // if (!userId) {
    //   return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    // }

    const body = await request.json();
    const { title, description, publicId, url, originalSize, duration } = body;

    if (!publicId || !url) {
      return NextResponse.json(
        { error: "Invalid video data" },
        { status: 400 }
      );
    }

    const video = await prisma.video.create({
      data: {
        title,
        description,
        publicId,
        url,
        originalSize: String(originalSize),
        compressedSize: String(originalSize), // For now, we're using the same size
        duration: duration || 0,
        // userId, // Uncomment this when you implement user authentication
      },
    });

    return NextResponse.json(video);
  } catch (error) {
    console.error("Save video details failed", error);
    return NextResponse.json(
      { error: "Save video details failed" },
      { status: 500 }
    );
  } finally {
    await prisma.$disconnect();
  }
}
