import { getServerSession } from "next-auth/next";
import { authOptions } from "@/lib/auth";
import { query } from "@/lib/db";
import { NextResponse } from "next/server";

export async function GET() {
  const session = await getServerSession(authOptions);
  if (!session?.user?.email) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const outfits = await query(
      "SELECT * FROM outfits WHERE user_id = ? ORDER BY created_at DESC",
      [session.user.email]
    );
    return NextResponse.json(outfits.map((o: any) => ({ ...o, items: JSON.parse(o.items) })));
  } catch (error) {
    console.error("Fetch Outfits Error:", error);
    return NextResponse.json({ error: "Failed to fetch outfits" }, { status: 500 });
  }
}

export async function POST(req: Request) {
  const session = await getServerSession(authOptions);
  if (!session?.user?.email) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const { name, items, occasion, weather, is_favorite } = await req.json();
    if (!items || !Array.isArray(items)) {
      return NextResponse.json({ error: "Items array is required" }, { status: 400 });
    }

    const result = await query(
      "INSERT INTO outfits (user_id, name, items, occasion, weather, is_favorite) VALUES (?, ?, ?, ?, ?, ?)",
      [
        session.user.email,
        name || "New Outfit",
        JSON.stringify(items),
        occasion || null,
        weather || null,
        is_favorite ? 1 : 0
      ]
    );

    return NextResponse.json({ message: "Outfit saved successfully", id: result.lastInsertRowid });
  } catch (error) {
    console.error("Save Outfit Error:", error);
    return NextResponse.json({ error: "Failed to save outfit" }, { status: 500 });
  }
}
