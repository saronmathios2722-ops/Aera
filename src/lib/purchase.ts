import { db } from "./db";

export interface PurchaseInterceptResult {
  shouldIntercept: boolean;
  cooldownUntil: Date | null;
  reflectiveQuestions: string[];
  styleScore: number;
}

export function evaluatePurchase(
  price: number,
  itemName: string,
  userProfile: any
): PurchaseInterceptResult {
  const budget = parseFloat(userProfile.budget?.replace(/[^0-9.]/g, "") || "500");
  const aesthetic = userProfile.style_aesthetic?.toLowerCase() || "";
  
  let shouldIntercept = false;
  let cooldownHours = 0;
  const reflectiveQuestions = [];

  // Logic 1: Price vs Budget (Trigger at 15% of monthly budget)
  if (price > budget * 0.15) {
    shouldIntercept = true;
    cooldownHours = 24;
    reflectiveQuestions.push(`This piece costs ${Math.round((price/budget)*100)}% of your monthly budget. Is it a foundation piece or a fleeting desire?`);
  }

  // Logic 2: Aesthetic Context
  if (aesthetic && !itemName.toLowerCase().split(' ').some(word => aesthetic.includes(word))) {
    shouldIntercept = true;
    reflectiveQuestions.push(`Does this truly align with your ${userProfile.style_aesthetic} aesthetic, or is it an outlier?`);
  }

  // Logic 3: Emotional Check
  const triggers = userProfile.emotional_triggers || "";
  if (triggers.includes("stressed") || triggers.includes("scrolling")) {
    reflectiveQuestions.push("Pause for a moment. Are you choosing this piece with a clear mind, or as an emotional escape?");
  }
  
  // Logic 4: Practicality
  reflectiveQuestions.push("Can you list 3 outfits you can create with this item using what you already own?");

  // Logic 5: Fashion Goals
  const goals = userProfile.fashion_goals?.toLowerCase() || "";
  if (goals.includes("capsule") && price < 50) {
    reflectiveQuestions.push("You're building a capsule wardrobe. Is this a high-quality essential, or just another 'filler' piece?");
  }

  const styleScore = Math.floor(Math.random() * 4) + 6; // Mock score between 6-10

  const cooldownUntil = shouldIntercept ? new Date(Date.now() + cooldownHours * 60 * 60 * 1000) : null;

  return {
    shouldIntercept,
    cooldownUntil,
    reflectiveQuestions,
    styleScore
  };
}
