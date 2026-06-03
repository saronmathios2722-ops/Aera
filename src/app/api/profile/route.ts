import { NextResponse } from "next/server";
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/lib/auth";
import { db } from "@/lib/db";

export async function GET() {
  const session = await getServerSession(authOptions);

  if (!session || !session.user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const userId = (session.user as any).id;
    let profile = await db.profiles.getById(userId);

    if (!profile) {
      // Create if doesn't exist (should have been created on sign in, but just in case)
      await db.profiles.create(userId);
      profile = await db.profiles.getById(userId);
    }

    return NextResponse.json(profile);
  } catch (error) {
    console.error("Profile fetch error:", error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}
