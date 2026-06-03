import { getServerSession } from "next-auth/next";
import { authOptions } from "@/lib/auth";
import { query } from "@/lib/db";
import { analyzeGarment } from "@/services/ai";
import { NextResponse } from "next/server";

export async function GET() {
  const session = await getServerSession(authOptions);
  if (!session?.user?.email) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const items = await query(
      "SELECT * FROM wardrobe_items WHERE user_id = ? ORDER BY created_at DESC",
      [session.user.email]
    );
    return NextResponse.json(items);
  } catch (error) {
    console.error("Fetch Wardrobe Error:", error);
    return NextResponse.json({ error: "Failed to fetch wardrobe" }, { status: 500 });
  }
}

export async function POST(req: Request) {
  const session = await getServerSession(authOptions);
  if (!session?.user?.email) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const { imageUrl } = await req.json();
    if (!imageUrl) {
      return NextResponse.json({ error: "Image URL is required" }, { status: 400 });
    }

    // AI Analysis
    const analysis = await analyzeGarment(imageUrl);

    // Save to database
    await query(
      "INSERT INTO wardrobe_items (user_id, name, category, brand, color, image_url, tags) VALUES (?, ?, ?, ?, ?, ?, ?)",
      [
        session.user.email,
        analysis.name,
        analysis.category,
        analysis.brand,
        analysis.color,
        imageUrl,
        JSON.stringify(analysis.tags),
      ]
    );

    return NextResponse.json({ message: "Item added successfully", item: analysis });
  } catch (error) {
    console.error("Add Wardrobe Item Error:", error);
    return NextResponse.json({ error: "Failed to add item" }, { status: 500 });
  }
}
