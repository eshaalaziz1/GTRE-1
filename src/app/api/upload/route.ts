import { NextRequest, NextResponse } from "next/server";
import { getWixServerClient } from "@/lib/wix-client";

const ALLOWED_ORIGINS = [
  "https://www.reatgt.org",
  "https://reatgt.org",
];

function corsHeaders(origin: string | null) {
  const allowedOrigin = ALLOWED_ORIGINS.find((o) => o === origin) || ALLOWED_ORIGINS[0];
  return {
    "Access-Control-Allow-Origin": allowedOrigin,
    "Access-Control-Allow-Methods": "POST, OPTIONS",
    "Access-Control-Allow-Headers": "Content-Type",
  };
}

export async function OPTIONS(request: NextRequest) {
  const origin = request.headers.get("origin");
  return NextResponse.json({}, { headers: corsHeaders(origin) });
}

export async function POST(request: NextRequest) {
  const origin = request.headers.get("origin");
  const headers = corsHeaders(origin);

  try {
    const formData = await request.formData();
    const file = formData.get("file") as File | null;

    if (!file) {
      return NextResponse.json(
        { error: "No file provided" },
        { status: 400, headers }
      );
    }

    const client = getWixServerClient();

    // Generate upload URL from Wix Media
    const uploadResult = await client.files.generateFileUploadUrl(file.type, {
      fileName: file.name,
    });

    const uploadUrl = uploadResult.uploadUrl;
    if (!uploadUrl) {
      throw new Error("Failed to get upload URL from Wix");
    }

    // Upload the file to Wix Media
    const fileBuffer = await file.arrayBuffer();
    const uploadResponse = await fetch(
      `${uploadUrl}?filename=${encodeURIComponent(file.name)}`,
      {
        method: "PUT",
        headers: { "Content-Type": file.type },
        body: fileBuffer,
      }
    );

    if (!uploadResponse.ok) {
      throw new Error(`Upload failed: ${uploadResponse.statusText}`);
    }

    const uploadData = await uploadResponse.json();
    const fileUrl = uploadData.file?.url || uploadData.url || "";

    return NextResponse.json(
      { success: true, fileUrl },
      { status: 200, headers }
    );
  } catch (error) {
    console.error("Failed to upload file:", error);
    return NextResponse.json(
      { error: "Failed to upload file" },
      { status: 500, headers }
    );
  }
}
