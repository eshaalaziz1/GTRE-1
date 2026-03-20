import { NextRequest, NextResponse } from "next/server";
import { getWixServerClient } from "@/lib/wix-client";
import { COLLECTIONS } from "@/lib/constants";

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
    const body = await request.json();
    const { name, email, resumeUrl, jobId, jobTitle, company } = body;

    if (!name || !email || !jobId || !jobTitle) {
      return NextResponse.json(
        { error: "Name, email, job ID, and job title are required" },
        { status: 400, headers }
      );
    }

    const client = getWixServerClient();

    await client.items.insert(COLLECTIONS.jobApplications, {
      applicantName: name,
      applicantEmail: email,
      resumeUrl: resumeUrl || "",
      jobId,
      jobTitle,
      company: company || "",
      appliedAt: new Date().toISOString(),
      status: "Applied",
    });

    return NextResponse.json(
      { success: true, message: "Application tracked successfully" },
      { status: 200, headers }
    );
  } catch (error) {
    console.error("Failed to track application:", error);
    return NextResponse.json(
      { error: "Failed to submit application" },
      { status: 500, headers }
    );
  }
}
