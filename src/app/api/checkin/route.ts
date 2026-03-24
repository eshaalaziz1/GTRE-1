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
    const { eventId, eventName, code, studentName, studentEmail } = body;

    if (!eventId || !code) {
      return NextResponse.json(
        { error: "Event ID and code are required" },
        { status: 400, headers }
      );
    }

    const siteId = process.env.WIX_SITE_ID!;
    const apiKey = process.env.WIX_API_KEY!;

    // Query EventCodes collection to validate the code
    const codeRes = await fetch(
      "https://www.wixapis.com/wix-data/v2/items/query",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: apiKey,
          "wix-site-id": siteId,
        },
        body: JSON.stringify({
          dataCollectionId: "EventCodes",
          query: {
            filter: {
              eventId: { $eq: eventId },
              active: { $eq: true },
            },
          },
        }),
      }
    );

    if (!codeRes.ok) {
      const errBody = await codeRes.text();
      console.error("Wix query error:", codeRes.status, errBody);
      return NextResponse.json(
        { error: "Failed to validate code" },
        { status: 500, headers }
      );
    }

    const codeData = await codeRes.json();
    const items = codeData.dataItems || [];

    if (items.length === 0) {
      return NextResponse.json(
        { error: "No active event found for this session" },
        { status: 404, headers }
      );
    }

    const eventCode = items[0].data?.code;
    if (!eventCode || eventCode.toUpperCase() !== code.toUpperCase()) {
      return NextResponse.json(
        { error: "Invalid code. Please try again." },
        { status: 401, headers }
      );
    }

    // Code is valid — log attendance
    const attendanceRes = await fetch(
      "https://www.wixapis.com/wix-data/v2/items",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: apiKey,
          "wix-site-id": siteId,
        },
        body: JSON.stringify({
          dataCollectionId: "Attendance",
          dataItem: {
            data: {
              memberName: studentName || "",
              memberEmail: studentEmail || "",
              eventName: eventName || "",
              eventDate: new Date().toISOString(),
              checkInTime: new Date().toISOString(),
              attended: true,
            },
          },
        }),
      }
    );

    if (!attendanceRes.ok) {
      const errBody = await attendanceRes.text();
      console.error("Wix insert error:", attendanceRes.status, errBody);
      return NextResponse.json(
        { error: "Failed to record attendance" },
        { status: 500, headers }
      );
    }

    return NextResponse.json(
      { success: true, message: "Checked in successfully" },
      { status: 200, headers }
    );
  } catch (error) {
    console.error("Check-in failed:", error);
    return NextResponse.json(
      { error: "Check-in failed" },
      { status: 500, headers }
    );
  }
}
