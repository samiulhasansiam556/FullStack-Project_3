import { v2 as cloudinary } from "cloudinary";
import { NextResponse } from "next/server";

cloudinary.config({
  cloud_name: process.env.NEXT_PUBLIC_CLOUDINARY_NAME,
  api_key: process.env.NEXT_PUBLIC_CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

export async function POST(req) {
  try {
    const { paramsToSign } = await req.json();
    console.log("Params to Sign (before modification):", paramsToSign);

    // Ensure folder is included before signing
   
    const signature = cloudinary.utils.api_sign_request(
      paramsToSign,
      process.env.CLOUDINARY_API_SECRET
    );

    console.log("Generated Signature:", signature);
    return NextResponse.json({ signature});
  } catch (error) {
    console.error("Cloudinary Signature Error:", error);
    return NextResponse.json(
      { error: "Failed to generate signature" },
      { status: 500 }
    );
  }
}
