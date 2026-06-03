import { NextResponse } from "next/server";
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/lib/auth";
import { db } from "@/lib/db";
import { updateIntentionalityScore } from "@/lib/analytics";

export async function POST(req: Request) {
  const session = await getServerSession(authOptions);

  if (!session || !session.user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const { purchaseId, reflectiveAnswer, action } = await req.json();
    // action could be 'approve', 'cancel', or 'reflect'

    const purchase = db.purchases.getById(purchaseId);
    if (!purchase) {
      return NextResponse.json({ error: "Purchase not found" }, { status: 404 });
    }

    if (purchase.user_id !== (session.user as any).id) {
       return NextResponse.json({ error: "Unauthorized" }, { status: 403 });
    }

    let status = purchase.status;
    if (action === 'cancel') {
      status = 'cancelled';
    } else if (action === 'approve') {
       status = 'approved';
    }

    db.purchases.updateStatus(purchaseId, status, reflectiveAnswer);

    // Update intentionality score
    await updateIntentionalityScore((session.user as any).id);

    return NextResponse.json({
      success: true,
      status
    });
  } catch (error) {
    console.error("Purchase response error:", error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}
