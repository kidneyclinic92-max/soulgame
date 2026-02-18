import { NextRequest } from "next/server";
import { verifyToken, extractToken } from "@/lib/auth";
import { queryOne } from "@/lib/db";

export interface AuthUser {
  id: string;
  username: string;
  email: string;
  password: string;
  totalPoints: number;
  totalEarnings: number;
  avatar: string | null;
  bio: string | null;
  role: string;
  createdAt: Date;
  updatedAt: Date;
}

/**
 * Get the current authenticated user from the request.
 * Returns null if not authenticated.
 */
export async function getAuthUser(request: NextRequest): Promise<AuthUser | null> {
  const authHeader = request.headers.get("authorization");
  const token = extractToken(authHeader);

  if (!token) return null;

  const payload = verifyToken(token);
  if (!payload) return null;

  const user = await queryOne<AuthUser>(
    `SELECT id, username, email, password, totalPoints, totalEarnings, avatar, bio, role, createdAt, updatedAt
     FROM users WHERE id = @userId`,
    { userId: payload.userId }
  );

  return user ?? null;
}
