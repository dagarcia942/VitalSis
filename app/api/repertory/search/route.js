import { NextResponse } from "next/server";
import { searchRubrics, meta } from "@/lib/repertory";

// GET /api/repertory/search?q=dulces
export async function GET(request) {
  const { searchParams } = new URL(request.url);
  const q = searchParams.get("q") || "";
  const limit = Number(searchParams.get("limit")) || 8;

  const rubrics = searchRubrics(q, limit);
  return NextResponse.json({ query: q, count: rubrics.length, rubrics, source: meta });
}
