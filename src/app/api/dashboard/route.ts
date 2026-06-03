import { getServerSession } from "next-auth/next";
import { authOptions } from "@/lib/auth";
import { query } from "@/lib/db";
import { NextResponse } from "next/server";

export async function GET() {
  const session = await getServerSession(authOptions);
  
  if (!session?.user?.email) {
    // Return mock data for the demo/screenshot
    return NextResponse.json({
      userName: "Alex",
      style_aesthetic: "Architectural Minimalist",
      fashion_goals: "Building a permanent wardrobe of high-quality neutrals and structured silhouettes that project confidence.",
      budget_remaining: 1240,
      spending_intentionality: 85,
      insights: [
        { id: 1, text: "You've stayed within your budget for 3 weeks. Well done.", icon: "Sparkles", color: "text-aureve-gold" },
        { id: 2, text: "Your intentionality score is up 12% this month.", icon: "TrendingUp", color: "text-green-400" },
      ],
      waitlist: [
        { 
          id: "w1", 
          item_name: "Lemaire Croissant Bag", 
          price: 1200, 
          currency: "USD", 
          status: "pending", 
          cooldown_until: new Date(Date.now() + 1000 * 60 * 60 * 24 * 2).toISOString(),
          image_url: "/placeholder-bag.png"
        }
      ],
      style_blueprint: {
        palette: ["#F9F7F2", "#A89F91", "#1A1A1A", "#C5A059"]
      }
    });
  }

  try {
    const userId = (session.user as any).id;
    
    // Fetch user profile
    const profiles = await query(
      "SELECT * FROM user_profiles WHERE user_id = ?",
      [userId]
    );
    const profile = profiles[0] || {};

    // Fetch purchases for waitlist and budget calculation
    const purchases = await query(
      "SELECT * FROM purchases WHERE user_id = ? ORDER BY created_at DESC",
      [userId]
    );

    const waitlist = purchases.filter((p: any) => p.status === "pending");
    const approvedPurchases = purchases.filter((p: any) => p.status === "approved");
    
    const monthlyBudget = parseFloat(profile.budget || "2000");
    const spentThisMonth = approvedPurchases.reduce((acc: number, p: any) => acc + p.price, 0);
    const budgetRemaining = Math.max(0, monthlyBudget - spentThisMonth);

    // Calculate intentionality (% of approved purchases)
    const totalPurchases = purchases.length;
    const approvedPurchasesCount = approvedPurchases.length;
    const intentionalityPercent = totalPurchases > 0 ? Math.round((approvedPurchasesCount / totalPurchases) * 100) : 100;

    // Use the temporal score from profile
    const intentionalityScore = profile.intentionality_score || 0;

    // Behavioral insights
    const insights = [
      { id: 1, text: "You've stayed within your budget for 3 weeks. Well done.", icon: "Sparkles", color: "text-aureve-gold" },
      { id: 2, text: `Your intentionality score is ${intentionalityPercent}%.`, icon: "TrendingUp", color: "text-green-400" },
      { id: 3, text: `Average reflection time: ${intentionalityScore.toFixed(1)} hours.`, icon: "Clock", color: "text-blue-400" },
    ];

    return NextResponse.json({
      userName: session.user.name || "User",
      style_aesthetic: profile.style_aesthetic || "Your Style Aesthetic",
      fashion_goals: profile.fashion_goals || "Define your fashion goals in settings.",
      budget_remaining: budgetRemaining,
      spending_intentionality: intentionalityPercent,
      intentionality_score: intentionalityScore,
      insights,
      waitlist,
      style_blueprint: profile.style_blueprint ? JSON.parse(profile.style_blueprint) : null
    });
  } catch (error) {
    console.error("Dashboard API Error:", error);
    return NextResponse.json({ error: "Failed to fetch dashboard data" }, { status: 500 });
  }
}
