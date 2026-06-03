import { NextResponse } from "next/server";
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/lib/auth";
import { db } from "@/lib/db";
import { generateStyleBlueprint } from "@/services/ai";

export async function POST() {
  const session = await getServerSession(authOptions);

  if (!session || !session.user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const userId = (session.user as any).id;
    const profile = db.profiles.getById(userId);

    if (!profile || !profile.onboarding_data) {
      return NextResponse.json({ error: "Profile not found" }, { status: 404 });
    }

    const onboardingData = JSON.parse(profile.onboarding_data);
    const blueprint = await generateStyleBlueprint(onboardingData);

    db.profiles.update(userId, {
      style_blueprint: JSON.stringify(blueprint),
    });

    return NextResponse.json(blueprint);
  } catch (error) {
    console.error("Blueprint API Error:", error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}
