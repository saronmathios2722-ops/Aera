import { NextResponse } from "next/server";
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/lib/auth";
import { query } from "@/lib/db";
import { generateStyleBlueprint } from "@/services/ai";

export async function POST(req: Request) {
  const session = await getServerSession(authOptions);

  if (!session || !session.user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const data = await req.json();
    const userId = (session.user as any).id;

    // Generate AI Style DNA
    const blueprint = await generateStyleBlueprint(data);

    // Map new question IDs to profile fields
    const styleAesthetic = Array.isArray(data.soul_aesthetics) 
      ? data.soul_aesthetics.join(", ") 
      : (data.soul_aesthetics || data.atmosphere || "");
      
    const fashionGoals = data.dream_wardrobe_words || data.purpose || "";
    const bodyShape = data.body_shape || "";
    const budget = data.spending_threshold || "";
    const emotionalTriggers = Array.isArray(data.impulse_vulnerability)
      ? data.impulse_vulnerability.join(", ")
      : (data.impulse_vulnerability || "");

    // Save profile data
    await query(
      `UPDATE user_profiles SET 
        onboarding_completed = 1,
        onboarding_data = ?,
        style_aesthetic = ?,
        fashion_goals = ?,
        style_blueprint = ?,
        body_shape = ?,
        budget = ?,
        emotional_triggers = ?,
        updated_at = CURRENT_TIMESTAMP
      WHERE user_id = ?`,
      [
        JSON.stringify(data),
        styleAesthetic,
        fashionGoals,
        JSON.stringify(blueprint),
        bodyShape,
        budget,
        emotionalTriggers,
        userId
      ]
    );

    return NextResponse.json({ success: true, blueprint });
  } catch (error) {
    console.error("Onboarding error:", error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}
