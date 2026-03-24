import { NextRequest, NextResponse } from "next/server";

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
    const {
      studentName,
      studentEmail,
      assignmentId,
      assignmentTitle,
      submissionType,
      submissionContent,
      fileUrl,
      comments,
    } = body;

    if (!assignmentId || !assignmentTitle || !submissionType) {
      return NextResponse.json(
        { error: "Assignment ID, title, and submission type are required" },
        { status: 400, headers }
      );
    }

    if (!submissionContent && !fileUrl) {
      return NextResponse.json(
        { error: "Please provide a submission (link, text, or file)" },
        { status: 400, headers }
      );
    }

    const siteId = process.env.WIX_SITE_ID!;
    const apiKey = process.env.WIX_API_KEY!;

    const res = await fetch(
      "https://www.wixapis.com/wix-data/v2/items",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: apiKey,
          "wix-site-id": siteId,
        },
        body: JSON.stringify({
          dataCollectionId: "AssignmentSubmissions",
          dataItem: {
            data: {
              studentName: studentName || "",
              studentEmail: studentEmail || "",
              assignmentId,
              assignmentTitle,
              submissionType,
              submissionContent: submissionContent || "",
              fileUrl: fileUrl || "",
              comments: comments || "",
              submittedAt: new Date().toISOString(),
            },
          },
        }),
      }
    );

    if (!res.ok) {
      const errBody = await res.text();
      console.error("Wix API error:", res.status, errBody);
      return NextResponse.json(
        { error: "Failed to submit assignment" },
        { status: 500, headers }
      );
    }

    return NextResponse.json(
      { success: true, message: "Assignment submitted successfully" },
      { status: 200, headers }
    );
  } catch (error) {
    console.error("Assignment submission failed:", error);
    return NextResponse.json(
      { error: "Failed to submit assignment" },
      { status: 500, headers }
    );
  }
}
