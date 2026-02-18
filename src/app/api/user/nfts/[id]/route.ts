import { NextRequest } from "next/server";
import { getAuthUser } from "@/lib/get-auth-user";
import { execute, queryOne } from "@/lib/db";
import { successResponse, errorResponse } from "@/lib/api-utils";

export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const user = await getAuthUser(request);
    if (!user) return errorResponse("Authentication required", 401);

    const { id } = await params;
    if (!id) return errorResponse("NFT id required", 400);

    const existing = await queryOne<{ userId: string }>(
      `SELECT userId FROM user_nfts WHERE id = @id`,
      { id }
    );
    if (!existing) return errorResponse("NFT not found", 404);
    if (existing.userId !== user.id) return errorResponse("Forbidden", 403);

    await execute(`DELETE FROM user_nfts WHERE id = @id`, { id });
    return successResponse({ deleted: true });
  } catch (error) {
    console.error("NFT delete error:", error);
    return errorResponse("Internal server error", 500);
  }
}
