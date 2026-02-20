import { NextRequest } from "next/server";
import { query, queryOne } from "@/lib/db";
import { successResponse, errorResponse } from "@/lib/api-utils";

export const dynamic = "force-dynamic";

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const page = Math.max(1, parseInt(searchParams.get("page") || "1"));
    const limit = Math.min(100, Math.max(1, parseInt(searchParams.get("limit") || "12")));
    const offset = (page - 1) * limit;
    const genre = searchParams.get("genre");

    const whereClause = genre ? "WHERE genre = @genre" : "";
    const params: Record<string, unknown> = { offset, limit };
    if (genre) params.genre = genre;

    const games = await query(
      "SELECT * FROM games " + whereClause + " ORDER BY createdAt DESC OFFSET @offset ROWS FETCH NEXT @limit ROWS ONLY",
      params
    );

    const countParams: Record<string, unknown> = {};
    if (genre) countParams.genre = genre;
    const countResult = await queryOne<{ total: number }>(
      "SELECT COUNT(1) AS total FROM games " + whereClause,
      countParams
    );
    const total = countResult?.total ?? 0;

    return successResponse({
      games: games ?? [],
      pagination: { page, limit, total, totalPages: Math.ceil(total / limit) },
    });
  } catch (error) {
    console.error("Games fetch error:", error);
    return errorResponse("Internal server error", 500);
  }
}
