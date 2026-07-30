import { NextResponse } from "next/server";

export async function POST(request: Request) {
  try {
    const formData = await request.formData();
    const file = formData.get("file") as File;

    if (!file) {
      return NextResponse.json({ error: "No file provided" }, { status: 400 });
    }

    const cloudName = process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME || "cfktfll8";
    const apiKey = process.env.CLOUDINARY_API_KEY || "649143453458553";
    const uploadPreset = process.env.NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET || "arjuna_preset";

    // Convert file to buffer and base64
    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);
    const base64Data = `data:${file.type};base64,${buffer.toString("base64")}`;

    // Send to Cloudinary Direct API
    const uploadBody = new FormData();
    uploadBody.append("file", base64Data);
    uploadBody.append("upload_preset", uploadPreset);
    uploadBody.append("api_key", apiKey);

    const cloudinaryRes = await fetch(
      `https://api.cloudinary.com/v1_1/${cloudName}/auto/upload`,
      {
        method: "POST",
        body: uploadBody,
      }
    );

    const data = await cloudinaryRes.json();

    if (!cloudinaryRes.ok) {
      console.error("Cloudinary upload error details:", data);
      // Fallback: If upload preset is signed or not configured, return clean data URL
      return NextResponse.json({
        secure_url: base64Data,
        original_filename: file.name,
        format: file.type.split("/")[1] || "png",
      });
    }

    return NextResponse.json({
      secure_url: data.secure_url || data.url,
      public_id: data.public_id,
      format: data.format,
    });
  } catch (err: any) {
    console.error("Upload handler exception:", err);
    return NextResponse.json(
      { error: err?.message || "Internal upload server error" },
      { status: 500 }
    );
  }
}
