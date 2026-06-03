import { getServerSession } from "next-auth/next";
import { authOptions } from "@/lib/auth";
import { query } from "@/lib/db";
import { suggestRestyling } from "@/services/ai";
import { NextResponse } from "next/server";

export async function GET() {
  const session = await getServerSession(authOptions);
  if (!session?.user?.email) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const userEmail = session.user.email;

    // 1. Fetch wardrobe
    const wardrobe = await query(
      "SELECT * FROM wardrobe_items WHERE user_id = ?",
      [userEmail]
    );

    if (wardrobe.length === 0) {
      return NextResponse.json({ suggestions: [] });
    }

    // 2. Fetch recent outfits to find underutilized items
    const recentOutfits = await query(
      "SELECT items FROM outfits WHERE user_id = ? ORDER BY created_at DESC LIMIT 20",
      [userEmail]
    );

    const wornItemIds = new Set();
    recentOutfits.forEach((o: any) => {
      const items = JSON.parse(o.items);
      items.forEach((id: any) => wornItemIds.add(id));
    });

    // 3. Find items NOT in recent outfits
    const underutilized = wardrobe.filter((i: any) => !wornItemIds.has(i.id));

    if (underutilized.length === 0) {
      return NextResponse.json({ suggestions: [] });
    }

    // 4. Pick a random underutilized item and suggest restyling
    const itemToStyle = underutilized[Math.floor(Math.random() * underutilized.length)];
    
    // 5. Fetch user profile
    const profiles = await query(
      "SELECT * FROM user_profiles WHERE user_id = ?",
      [userEmail]
    );
    const profile = profiles[0] || {};

    const restylingTip = await suggestRestyling(itemToStyle, wardrobe, profile);

    return NextResponse.json({
      item: itemToStyle,
      suggestion: restylingTip
    });
  } catch (error) {
    console.error("Suggestions API Error:", error);
    return NextResponse.json({ error: "Failed to generate suggestions" }, { status: 500 });
  }
}
