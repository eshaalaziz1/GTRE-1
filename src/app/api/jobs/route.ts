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
    const jobType = searchParams.get("type");
    const sector = searchParams.get("sector");

    const siteId = process.env.WIX_SITE_ID!;
    const apiKey = process.env.WIX_API_KEY!;

    const filter: Record<string, any> = { isActive: { $eq: true } };
    if (jobType) filter.jobType = { $eq: jobType };
    if (sector) filter.sector = { $eq: sector };

    const res = await fetch("https://www.wixapis.com/wix-data/v2/items/query", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: apiKey,
        "wix-site-id": siteId,
      },
      body: JSON.stringify({
        dataCollectionId: "JobOpportunities",
        query: {
          filter,
          sort: [{ fieldName: "_createdDate", order: "DESC" }],
          paging: { limit: 50 },
        },
      }),
    });

    if (!res.ok) {
      const errBody = await res.text();
      console.error("Wix query error:", res.status, errBody);
      return NextResponse.json(
        { error: "Failed to fetch jobs" },
        { status: 500, headers }
      );
    }

    const data = await res.json();
    const jobs = (data.dataItems || []).map((item: any) => ({
      jobId: item.data._id,
      jobTitle: item.data.title,
      company: item.data.company,
      location: item.data.location,
      jobType: item.data.jobType,
      sector: item.data.sector,
      description: item.data.description,
      applicationLink: item.data.applicationLink,
      deadline: item.data.deadline,
      postedBy: item.data.postedBy,
      compensation: item.data.compensation,
      isAlumPosted: item.data.isAlumPosted,
    }));

    return NextResponse.json({ jobs }, { headers });
  } catch (error) {
    console.error("Jobs fetch failed:", error);
    return NextResponse.json(
      { error: "Failed to fetch jobs" },
      { status: 500, headers }
    );
  }
}
