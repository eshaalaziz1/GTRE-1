import { NextRequest, NextResponse } from "next/server";
import { corsHeaders } from "@/lib/cors";

export async function OPTIONS(request: NextRequest) {
  const origin = request.headers.get("origin");
  return NextResponse.json({}, { headers: corsHeaders(origin) });
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
        dataCollectionId: "Events",
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
        { error: "Failed to fetch events" },
        { status: 500, headers }
      );
    }

    const data = await res.json();
    const events = (data.dataItems || []).map((item: any) => ({
      id: item.data._id,
      weekNumber: item.data.weekNumber,
      weekLabel: item.data.weekLabel,
      eventName: item.data.eventName,
      eventDate: item.data.eventDate,
      eventTime: item.data.eventTime,
      eventLocation: item.data.eventLocation,
      semester: item.data.semester,
    }));

    return NextResponse.json({ events }, { headers });
  } catch (error) {
    console.error("Events fetch failed:", error);
    return NextResponse.json(
      { error: "Failed to fetch events" },
      { status: 500, headers }
    );
  }
}
