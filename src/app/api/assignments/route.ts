import { NextRequest, NextResponse } from "next/server";
import { corsHeaders } from "@/lib/cors";

export async function OPTIONS(request: NextRequest) {
  const origin = request.headers.get("origin");
  return NextResponse.json({}, { headers: corsHeaders(origin, "GET, POST, OPTIONS") });
}

export async function GET(request: NextRequest) {
  const origin = request.headers.get("origin");
  const headers = {
    ...corsHeaders(origin),
    "Cache-Control": "public, s-maxage=300, stale-while-revalidate=600",
  };

  try {
    const { searchParams } = new URL(request.url);
    const semester = searchParams.get("semester") || "Spring 2026";

    const siteId = process.env.WIX_SITE_ID!;
    const apiKey = process.env.WIX_API_KEY!;

    const res = await fetch("https://www.wixapis.com/wix-data/v2/items/query", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: apiKey,
        "wix-site-id": siteId,
      },
      body: JSON.stringify({
        dataCollectionId: "AssignmentDefinitions",
        query: {
          filter: {
            semester: { $eq: semester },
            isActive: { $eq: true },
          },
          sort: [{ fieldName: "weekNumber", order: "ASC" }],
          paging: { limit: 50 },
        },
      }),
    });

    if (!res.ok) {
      const errBody = await res.text();
      console.error("Wix query error:", res.status, errBody);
      return NextResponse.json(
        { error: "Failed to fetch assignments" },
        { status: 500, headers }
      );
    }

    const data = await res.json();
    const assignments = (data.dataItems || []).map((item: any) => ({
      id: item.data._id,
      assignmentId: item.data.assignmentId,
      title: item.data.title,
      description: item.data.description,
      dueDate: item.data.dueDate,
      weekNumber: item.data.weekNumber,
      semester: item.data.semester,
    }));

    return NextResponse.json({ assignments }, { headers });
  } catch (error) {
    console.error("Assignments fetch failed:", error);
    return NextResponse.json(
      { error: "Failed to fetch assignments" },
      { status: 500, headers }
    );
  }
}

export async function POST(request: NextRequest) {
  const origin = request.headers.get("origin");
  const headers = corsHeaders(origin, "GET, POST, OPTIONS");

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
