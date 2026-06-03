import { NextResponse } from "next/server";
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/lib/auth";
import { db } from "@/lib/db";
import { evaluatePurchase } from "@/lib/purchase";
import { updateIntentionalityScore } from "@/lib/analytics";

export async function POST(req: Request) {
  const session = await getServerSession(authOptions);

  if (!session || !session.user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const { itemName, price, imageUrl, url, discoveryId } = await req.json();
    const userId = (session.user as any).id;

    const profile = await db.profiles.getById(userId);
    if (!profile) {
      return NextResponse.json({ error: "Profile not found" }, { status: 404 });
    }

    const evaluation = evaluatePurchase(price, itemName, profile);

    const purchaseId = Math.random().toString(36).substring(2, 15);
    
    await db.purchases.create({
      id: purchaseId,
      user_id: userId,
      item_name: itemName,
      price: price,
      url: url,
      image_url: imageUrl,
      cooldown_until: evaluation.cooldownUntil?.toISOString(),
      style_fit_score: evaluation.styleScore,
      discovery_id: discoveryId,
    });

    if (evaluation.shouldIntercept) {
      await db.purchases.updateStatus(purchaseId, 'cooldown');
    } else {
      await db.purchases.updateStatus(purchaseId, 'approved');
      // Update score if approved immediately
      await updateIntentionalityScore(userId);
    }

    return NextResponse.json({
      success: true,
      purchaseId,
      ...evaluation
    });
  } catch (error) {
    console.error("Purchase intercept error:", error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}
