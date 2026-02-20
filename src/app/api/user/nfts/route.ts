import { NextRequest } from "next/server";
import { getAuthUser } from "@/lib/get-auth-user";
import { query, execute, newId } from "@/lib/db";
import { successResponse, errorResponse, validateFields } from "@/lib/api-utils";

export const dynamic = "force-dynamic";

export async function GET(request: NextRequest) {
  try {
    const user = await getAuthUser(request);
    if (!user) return errorResponse("Authentication required", 401);

    const rows = await query<Array<{
      id: string;
      name: string;
      collectionName: string | null;
      imageUrl: string;
      contractAddress: string | null;
      tokenId: string | null;
      linkUrl: string | null;
      displayOrder: number;
      createdAt: Date;
    }>>(
      `SELECT id, name, collectionName, imageUrl, contractAddress, tokenId, linkUrl, displayOrder, createdAt
       FROM user_nfts
       WHERE userId = @userId
       ORDER BY displayOrder ASC, createdAt DESC`,
      { userId: user.id }
    );

    return successResponse({
      nfts: (rows ?? []).map((n) => ({
        id: n.id,
        name: n.name,
        collectionName: n.collectionName,
        imageUrl: n.imageUrl,
        contractAddress: n.contractAddress,
        tokenId: n.tokenId,
        linkUrl: n.linkUrl,
        displayOrder: n.displayOrder,
        createdAt: n.createdAt,
      })),
    });
  } catch (error) {
    console.error("NFTs list error:", error);
    return errorResponse("Internal server error", 500);
  }
}

export async function POST(request: NextRequest) {
  try {
    const user = await getAuthUser(request);
    if (!user) return errorResponse("Authentication required", 401);

    const body = await request.json().catch(() => ({}));
    const err = validateFields(body, ["name", "imageUrl"]);
    if (err) return errorResponse(err, 400);

    const name = String(body.name ?? "").trim();
    const imageUrl = String(body.imageUrl ?? "").trim();
    const collectionName = body.collectionName != null && body.collectionName !== "" ? String(body.collectionName).trim() || null : null;
    const contractAddress = body.contractAddress != null && body.contractAddress !== "" ? String(body.contractAddress).trim() || null : null;
    const tokenId = body.tokenId != null && body.tokenId !== "" ? String(body.tokenId).trim() || null : null;
    const linkUrl = body.linkUrl != null && body.linkUrl !== "" ? String(body.linkUrl).trim() || null : null;

    const id = newId();
    await execute(
      `INSERT INTO user_nfts (id, userId, name, collectionName, imageUrl, contractAddress, tokenId, linkUrl, displayOrder, createdAt)
       VALUES (@id, @userId, @name, @collectionName, @imageUrl, @contractAddress, @tokenId, @linkUrl, 0, GETUTCDATE())`,
      {
        id,
        userId: user.id,
        name,
        collectionName,
        imageUrl,
        contractAddress,
        tokenId,
        linkUrl,
      }
    );

    return successResponse({ id, name, collectionName, imageUrl, contractAddress, tokenId, linkUrl }, 201);
  } catch (error) {
    console.error("NFT add error:", error);
    return errorResponse("Internal server error", 500);
  }
}
