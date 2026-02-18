import { NextRequest } from "next/server";
import { queryOne } from "@/lib/db";
import { verifyPassword, generateToken } from "@/lib/auth";
import { successResponse, errorResponse, validateFields } from "@/lib/api-utils";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const validationError = validateFields(body, ["email", "password"]);
    if (validationError) return errorResponse(validationError);

    const { email, password } = body;

    const user = await queryOne<{ id: string; username: string; email: string; password: string }>(
      `SELECT id, username, email, password FROM users WHERE email = @email`,
      { email: email.toLowerCase() }
    );

    if (!user) return errorResponse("Invalid email or password", 401);

    const isValid = await verifyPassword(password, user.password);
    if (!isValid) return errorResponse("Invalid email or password", 401);

    const token = generateToken({ userId: user.id, email: user.email, username: user.username });

    return successResponse({
      token,
      user: { id: user.id, username: user.username, email: user.email },
    });
  } catch (error) {
    console.error("Login error:", error);
    return errorResponse("Internal server error", 500);
  }
}
