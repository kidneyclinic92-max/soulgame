import { NextRequest } from "next/server";
import { queryOne } from "@/lib/db";
import { verifyToken, extractToken } from "@/lib/auth";
import { successResponse, errorResponse } from "@/lib/api-utils";

export async function GET(request: NextRequest) {
  try {
    const authHeader = request.headers.get("authorization");
    const token = extractToken(authHeader);

    if (!token) return errorResponse("Authentication required", 401);

    const payload = verifyToken(token);
    if (!payload) return errorResponse("Invalid or expired token", 401);

    const user = await queryOne<{
      id: string;
      username: string;
      email: string;
      avatar: string | null;
      bio: string | null;
      totalPoints: number;
      totalEarnings: number;
      createdAt: Date;
    }>(
      `SELECT id, username, email, avatar, bio, totalPoints, totalEarnings, createdAt
       FROM users WHERE id = @userId`,
      { userId: payload.userId }
    );

    if (!user) return errorResponse("User not found", 404);

    return successResponse({ user });
  } catch (error) {
    console.error("Auth check error:", error);
    return errorResponse("Internal server error", 500);
  }
}
