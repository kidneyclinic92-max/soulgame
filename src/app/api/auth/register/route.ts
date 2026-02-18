import { NextRequest } from "next/server";
import { queryOne, execute, newId } from "@/lib/db";
import { hashPassword, generateToken } from "@/lib/auth";
import { successResponse, errorResponse, validateFields, isValidEmail } from "@/lib/api-utils";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();

    const validationError = validateFields(body, ["username", "email", "password"]);
    if (validationError) return errorResponse(validationError);

    const { username, email, password } = body;

    if (!isValidEmail(email)) return errorResponse("Invalid email format");
    if (password.length < 8) return errorResponse("Password must be at least 8 characters");
    if (username.length < 3 || username.length > 20) return errorResponse("Username must be between 3 and 20 characters");

    const existingUser = await queryOne<{ id: string }>(
      `SELECT id FROM users WHERE email = @email OR username = @username`,
      { email: email.toLowerCase(), username }
    );

    if (existingUser) {
      return errorResponse("Email or username already in use");
    }

    const hashedPassword = await hashPassword(password);
    const id = newId();

    await execute(
      `INSERT INTO users (id, username, email, password, role, totalPoints, totalEarnings, createdAt, updatedAt)
       VALUES (@id, @username, @email, @password, 'user', 0, 0, GETUTCDATE(), GETUTCDATE())`,
      { id, username, email: email.toLowerCase(), password: hashedPassword }
    );

    const token = generateToken({ userId: id, email: email.toLowerCase(), username });

    return successResponse(
      { token, user: { id, username, email: email.toLowerCase() } },
      201
    );
  } catch (error) {
    console.error("Registration error:", error);
    return errorResponse("Internal server error", 500);
  }
}
