import { NextRequest } from "next/server";
import { query } from "@/lib/db";
import { successResponse, errorResponse } from "@/lib/api-utils";

export async function GET(request: NextRequest) {
  try {
    const games = await query(
      "SELECT id, name, slug, genre, description, pointsPerWin, pointsPerMatch FROM games WHERE isActive = 1 AND playToEarn = 1 ORDER BY name ASC"
    );
    return successResponse({ games: games ?? [] });
  } catch (error) {
    console.error("Play-to-earn games fetch error:", error);
    return errorResponse("Internal server error", 500);
  }
}
