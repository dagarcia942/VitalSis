import { NextResponse } from "next/server";
import { analyze, meta } from "@/lib/repertory";

// POST /api/repertory/repertorize
// body: { rubricIds?: string[], query?: string, limit?: number }
export async function POST(request) {
  let body = {};
  try {
    body = await request.json();
  } catch {
    body = {};
  }
  const { rubricIds, query, limit } = body;
  const { rubrics, remedies } = analyze({ rubricIds, query, limit });

  return NextResponse.json({
    rubrics,
    remedies,
    topRemedy: remedies[0] || null,
    source: meta,
  });
}
