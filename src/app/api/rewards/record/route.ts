import { NextRequest } from "next/server";
import { getAuthUser } from "@/lib/get-auth-user";
import { queryOne, execute, newId } from "@/lib/db";
import { successResponse, errorResponse, validateFields } from "@/lib/api-utils";

export const dynamic = "force-dynamic";

export async function POST(request: NextRequest) {
  try {
    const user = await getAuthUser(request);
    if (!user) return errorResponse("Authentication required", 401);

    const body = await request.json();
    const validationError = validateFields(body, ["type", "gameId"]);
    if (validationError) return errorResponse(validationError);

    const { type, gameId, description } = body;

    if (!["game_win", "game_played"].includes(type)) return errorResponse("Invalid reward type");

    const game = await queryOne<{ id: string; name: string; pointsPerWin: number; pointsPerMatch: number }>(
      `SELECT id, name, pointsPerWin, pointsPerMatch FROM games WHERE id = @gameId AND isActive = 1 AND playToEarn = 1`,
      { gameId }
    );

    if (!game) return errorResponse("Game not found or not play-to-earn", 404);

    const amount = type === "game_win" ? game.pointsPerWin : game.pointsPerMatch;
    const defaultDescription = type === "game_win" ? `${game.name} match win` : `${game.name} match played`;
    const transactionId = newId();
    const newTotal = user.totalPoints + amount;

    await execute(
      `INSERT INTO reward_transactions (id, userId, amount, type, description, gameId) VALUES (@id, @userId, @amount, @type, @description, @gameId)`,
      {
        id: transactionId,
        userId: user.id,
        amount,
        type,
        description: description || defaultDescription,
        gameId: game.id,
      }
    );

    await execute(
      `UPDATE users SET totalPoints = @totalPoints, updatedAt = GETUTCDATE() WHERE id = @userId`,
      { totalPoints: newTotal, userId: user.id }
    );

    return successResponse(
      {
        transaction: { id: transactionId, amount, type, gameId: game.id },
        pointsEarned: amount,
        newTotal,
      },
      201
    );
  } catch (error) {
    console.error("Record reward error:", error);
    return errorResponse("Internal server error", 500);
  }
}
