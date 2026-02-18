import { NextResponse } from "next/server";

/**
 * Standard API success response
 */
export function successResponse(data: unknown, status = 200) {
  return NextResponse.json({ success: true, data }, { status });
}

/**
 * Standard API error response
 */
export function errorResponse(error: string, status = 400) {
  return NextResponse.json({ success: false, error }, { status });
}

/**
 * Validate required fields in a request body
 */
export function validateFields(
  body: Record<string, unknown>,
  requiredFields: string[]
): string | null {
  for (const field of requiredFields) {
    if (!body[field] || (typeof body[field] === "string" && !(body[field] as string).trim())) {
      return `${field} is required`;
    }
  }
  return null;
}

/**
 * Validate email format
 */
export function isValidEmail(email: string): boolean {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
}
