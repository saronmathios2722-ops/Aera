import { db } from "./db";

export async function updateIntentionalityScore(userId: string) {
  try {
    // Join purchases with discoveries to find time difference
    // Only count approved purchases that have a discovery linked
    const stats = db.query(`
      SELECT 
        AVG(julianday(p.created_at) - julianday(d.created_at)) * 24 as avg_hours
      FROM purchases p
      JOIN discoveries d ON p.discovery_id = d.id
      WHERE p.user_id = ? AND p.status = 'approved'
    `, [userId]);

    const avgHours = stats[0]?.avg_hours || 0;

    // Update user profile with the latest score
    db.profiles.update(userId, {
      intentionality_score: avgHours
    });

    return avgHours;
  } catch (error) {
    console.error("Error updating intentionality score:", error);
    return 0;
  }
}
