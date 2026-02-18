import { NextRequest } from "next/server";
import { query, queryOne, execute, newId } from "@/lib/db";
import { verifyToken, extractToken } from "@/lib/auth";
import { successResponse, errorResponse, validateFields } from "@/lib/api-utils";

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const page = Math.max(1, parseInt(searchParams.get("page") || "1"));
    const limit = Math.min(100, Math.max(1, parseInt(searchParams.get("limit") || "10")));
    const offset = (page - 1) * limit;
    const status = searchParams.get("status");

    const whereClause = status ? "WHERE status = @status" : "";
    const params: Record<string, unknown> = { offset, limit };
    if (status) params.status = status;

    const tournaments = await query(
      "SELECT t.*, g.name AS gameName, g.genre AS gameGenre FROM tournaments t JOIN games g ON g.id = t.gameId " +
        whereClause +
        " ORDER BY t.startDate ASC OFFSET @offset ROWS FETCH NEXT @limit ROWS ONLY",
      params
    );

    const countParams: Record<string, unknown> = {};
    if (status) countParams.status = status;
    const countResult = await queryOne<{ total: number }>(
      "SELECT COUNT(1) AS total FROM tournaments " + whereClause,
      countParams
    );
    const total = countResult?.total ?? 0;

    const withGame = (tournaments ?? []).map((t: Record<string, unknown>) => ({
      ...t,
      game: { name: t.gameName, genre: t.gameGenre },
    }));

    return successResponse({
      tournaments: withGame,
      pagination: { page, limit, total, totalPages: Math.ceil(total / limit) },
    });
  } catch (error) {
    console.error("Tournaments fetch error:", error);
    return errorResponse("Internal server error", 500);
  }
}

export async function POST(request: NextRequest) {
  try {
    const authHeader = request.headers.get("authorization");
    const token = extractToken(authHeader);
    if (!token) return errorResponse("Authentication required", 401);

    const payload = verifyToken(token);
    if (!payload) return errorResponse("Invalid or expired token", 401);

    const body = await request.json();
    const validationError = validateFields(body, ["name", "gameId", "maxParticipants", "startDate"]);
    if (validationError) return errorResponse(validationError);

    const id = newId();

    await execute(
      `INSERT INTO tournaments (id, name, description, gameId, maxParticipants, prizePool, status, startDate, endDate, createdById, createdAt, updatedAt)
       VALUES (@id, @name, @description, @gameId, @maxParticipants, @prizePool, 'open', @startDate, @endDate, @createdById, GETUTCDATE(), GETUTCDATE())`,
      {
        id,
        name: body.name,
        description: body.description || "",
        gameId: body.gameId,
        maxParticipants: body.maxParticipants,
        prizePool: body.prizePool || "0",
        startDate: body.startDate,
        endDate: body.endDate || null,
        createdById: payload.userId,
      }
    );

    return successResponse(
      {
        tournament: {
          id,
          name: body.name,
          description: body.description || "",
          gameId: body.gameId,
          maxParticipants: body.maxParticipants,
          prizePool: body.prizePool || "0",
          status: "open",
          startDate: body.startDate,
          endDate: body.endDate || null,
          createdById: payload.userId,
        },
      },
      201
    );
  } catch (error) {
    console.error("Tournament create error:", error);
    return errorResponse("Internal server error", 500);
  }
}
