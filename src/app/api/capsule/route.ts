import { getServerSession } from "next-auth/next";
import { authOptions } from "@/lib/auth";
import { query } from "@/lib/db";
import { generateCapsule } from "@/services/ai";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  const session = await getServerSession(authOptions);
  if (!session?.user?.email) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const { theme } = await req.json();
    
    // Fetch user's wardrobe
    const wardrobe = await query(
      "SELECT * FROM wardrobe_items WHERE user_id = ?",
      [session.user.email]
    );

    if (wardrobe.length === 0) {
      return NextResponse.json({ error: "No items in wardrobe to build a capsule" }, { status: 400 });
    }

    // AI Capsule Generation
    const capsule = await generateCapsule(wardrobe, theme || "minimalist");

    return NextResponse.json({ capsule });
  } catch (error) {
    console.error("Capsule Generation Error:", error);
    return NextResponse.json({ error: "Failed to generate capsule" }, { status: 500 });
  }
}
