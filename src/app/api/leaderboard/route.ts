import { NextRequest } from "next/server";
import { query } from "@/lib/db";
import { successResponse, errorResponse } from "@/lib/api-utils";

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const page = Math.max(1, parseInt(searchParams.get("page") || "1"));
    const limit = Math.min(100, Math.max(1, parseInt(searchParams.get("limit") || "25")));
    const offset = (page - 1) * limit;

    const leaderboard = await query<Array<{ id: string; username: string; avatar: string | null; totalPoints: number }>>(
      `SELECT id, username, avatar, totalPoints FROM users ORDER BY totalPoints DESC OFFSET @offset ROWS FETCH NEXT @limit ROWS ONLY`,
      { offset, limit }
    );

    return successResponse({
      leaderboard: (leaderboard ?? []).map((u, i) => ({ ...u, rank: offset + i + 1 })),
      pagination: { page, limit },
    });
  } catch (error) {
    console.error("Leaderboard fetch error:", error);
    return errorResponse("Internal server error", 500);
  }
}
