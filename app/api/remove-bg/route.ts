// app/api/remove-bg/route.ts
import { NextRequest, NextResponse } from "next/server";
import cloudinary from "cloudinary";

// Configure Cloudinary with environment variables
cloudinary.v2.config({
  cloud_name: process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

export async function POST(req: NextRequest) {
  try {
    const { data } = await req.json(); // Get image data from request

    // Upload image to Cloudinary with background removal
    const uploadResponse = await cloudinary.v2.uploader.upload(data, {
      upload_preset: "remove-bg",
      background_removal: "cloudinary_ai",
    });

    // Respond with the URL of the processed image
    return NextResponse.json(
      { url: uploadResponse.secure_url },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error uploading image:", error);
    return NextResponse.json(
      { error: "Failed to remove background" },
      { status: 500 }
    );
  }
}
