import bcrypt from "bcryptjs";
import { NextResponse } from "next/server";
import { COOKIE_NAME, createSessionToken, isAdminRole, sessionCookieOptions } from "@/lib/auth";
import { getDb } from "@/lib/db";
import type { UserDocument } from "@/lib/types";
import { loginSchema } from "@/lib/validation";

export async function POST(request: Request) {
  try {
    const parsed = loginSchema.safeParse(await request.json());
    if (!parsed.success) {
      return NextResponse.json({ error: "Enter a valid email and password" }, { status: 400 });
    }

    const db = await getDb();
    const user = await db.collection<UserDocument>("users").findOne({ email: parsed.data.email });
    if (!user || user.status !== "ACTIVE" || !user.passwordHash) {
      return NextResponse.json({ error: "Invalid email or password" }, { status: 401 });
    }
    if (!(await bcrypt.compare(parsed.data.password, user.passwordHash))) {
      return NextResponse.json({ error: "Invalid email or password" }, { status: 401 });
    }

    const response = NextResponse.json({
      redirectTo: isAdminRole(user.role) ? "/admin" : "/dashboard"
    });
    response.cookies.set(COOKIE_NAME, await createSessionToken(user), sessionCookieOptions());
    return response;
  } catch (error) {
    console.error("[auth/login]", error);
    const message = error instanceof Error ? error.message : "Unable to sign in";
    const isConfig =
      /MONGODB|AUTH_SECRET|ADMIN_PASSWORD|ECONNREFUSED|querySrv|MongoServerError|MongoNetworkError/i.test(
        message
      );
    return NextResponse.json(
      {
        error: isConfig
          ? "Server configuration error. Check MongoDB connection and AUTH_SECRET on the host."
          : "Unable to sign in"
      },
      { status: 500 }
    );
  }
}
