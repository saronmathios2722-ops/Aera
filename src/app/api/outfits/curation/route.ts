import { getServerSession } from "next-auth/next";
import { authOptions } from "@/lib/auth";
import { query } from "@/lib/db";
import { generateDailyOutfits } from "@/services/ai";
import { NextResponse } from "next/server";

export async function GET() {
  const session = await getServerSession(authOptions);
  if (!session?.user?.email) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const userEmail = session.user.email;

    // Check if we already have curation for today
    const today = new Date().toISOString().split("T")[0];
    const existingCuration = await query(
      "SELECT * FROM outfits WHERE user_id = ? AND is_daily_curation = 1 AND date(created_at) = ?",
      [userEmail, today]
    );

    if (existingCuration.length > 0) {
      return NextResponse.json(existingCuration.map((o: any) => ({ ...o, items: JSON.parse(o.items) })));
    }

    // Generate new curation
    // 1. Fetch wardrobe
    const wardrobe = await query(
      "SELECT * FROM wardrobe_items WHERE user_id = ?",
      [userEmail]
    );

    if (wardrobe.length === 0) {
      return NextResponse.json({ error: "No items in wardrobe" }, { status: 400 });
    }

    // 2. Fetch user profile
    const profiles = await query(
      "SELECT * FROM user_profiles WHERE user_id = ?",
      [userEmail]
    );
    const profile = profiles[0] || {};

    // 3. AI Generation (mocking weather and schedule for now as requested)
    const suggestions = await generateDailyOutfits(
      wardrobe,
      profile,
      "Cool and overcast, 15°C",
      "Morning meetings followed by an evening gallery opening"
    );

    // 4. Save to database
    for (const outfit of suggestions) {
      await query(
        "INSERT INTO outfits (user_id, name, items, occasion, is_daily_curation) VALUES (?, ?, ?, ?, 1)",
        [userEmail, outfit.name, JSON.stringify(outfit.items), outfit.description]
      );
    }

    // 5. Fetch saved ones with full item details
    const newCuration = await query(
      "SELECT * FROM outfits WHERE user_id = ? AND is_daily_curation = 1 AND date(created_at) = ?",
      [userEmail, today]
    );

    const wardrobeMap = wardrobe.reduce((acc: any, item: any) => {
      acc[item.id] = item;
      return acc;
    }, {});

    const enrichedCuration = newCuration.map((o: any) => {
      const itemIds = JSON.parse(o.items);
      return {
        ...o,
        items: itemIds.map((id: any) => wardrobeMap[id]).filter(Boolean),
      };
    });

    return NextResponse.json(enrichedCuration);
  } catch (error) {
    console.error("Curation API Error:", error);
    return NextResponse.json({ error: "Failed to generate curation" }, { status: 500 });
  }
}
