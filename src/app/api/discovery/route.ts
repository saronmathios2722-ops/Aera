import { NextResponse } from "next/server";
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/lib/auth";
import { db } from "@/lib/db";

export async function POST(req: Request) {
  const session = await getServerSession(authOptions);

  if (!session || !session.user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const { itemName, url, imageUrl } = await req.json();
    const userId = (session.user as any).id;
    const discoveryId = Math.random().toString(36).substring(2, 15);

    db.query(
      "INSERT INTO discoveries (id, user_id, item_name, url, image_url) VALUES (?, ?, ?, ?, ?)",
      [discoveryId, userId, itemName, url || '', imageUrl || '']
    );

    return NextResponse.json({
      success: true,
      discoveryId
    });
  } catch (error) {
    console.error("Discovery log error:", error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}
