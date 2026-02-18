import { NextRequest } from "next/server";
import { getAuthUser } from "@/lib/get-auth-user";
import { query, queryOne } from "@/lib/db";
import { successResponse, errorResponse } from "@/lib/api-utils";

export async function GET(request: NextRequest) {
  try {
    const user = await getAuthUser(request);
    if (!user) return errorResponse("Authentication required", 401);

    const { searchParams } = new URL(request.url);
    const page = Math.max(1, parseInt(searchParams.get("page") || "1"));
    const limit = Math.min(50, Math.max(1, parseInt(searchParams.get("limit") || "20")));
    const offset = (page - 1) * limit;

    const summary = await queryOne<{ totalPoints: number; totalEarnings: number }>(
      `SELECT totalPoints, totalEarnings FROM users WHERE id = @userId`,
      { userId: user.id }
    );

    const transactions = await query<Array<{
      id: string;
      amount: number;
      type: string;
      description: string | null;
      createdAt: Date;
      gameName: string | null;
      gameSlug: string | null;
    }>>(
      `SELECT rt.id, rt.amount, rt.type, rt.description, rt.createdAt, g.name AS gameName, g.slug AS gameSlug
       FROM reward_transactions rt
       LEFT JOIN games g ON g.id = rt.gameId
       WHERE rt.userId = @userId
       ORDER BY rt.createdAt DESC
       OFFSET @offset ROWS FETCH NEXT @limit ROWS ONLY`,
      { userId: user.id, offset, limit }
    );

    const countResult = await queryOne<{ total: number }>(
      `SELECT COUNT(1) AS total FROM reward_transactions WHERE userId = @userId`,
      { userId: user.id }
    );
    const total = countResult?.total ?? 0;

    return successResponse({
      summary: summary ?? { totalPoints: 0, totalEarnings: 0 },
      transactions: (transactions ?? []).map((t) => ({
        id: t.id,
        amount: t.amount,
        type: t.type,
        description: t.description,
        createdAt: t.createdAt,
        game: t.gameName ? { name: t.gameName, slug: t.gameSlug } : null,
      })),
      pagination: { page, limit, total, totalPages: Math.ceil(total / limit) },
    });
  } catch (error) {
    console.error("Earnings fetch error:", error);
    return errorResponse("Internal server error", 500);
  }
}
