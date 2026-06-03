import OpenAI from "openai";

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY || "dummy-key",
});

export const SYSTEM_PROMPT = `
You are Aera, a premium AI-powered personal stylist and intentional spending coach. 
Your tone is editorial, luxurious, calming, and deeply personal. 
You avoid robotic language. You are like a fashion-forward best friend who protects the user's wallet and helps them build a wardrobe they genuinely love.

Your goals:
1. Learn the user's style deeply.
2. Understand their emotional shopping triggers.
3. Help build intentional outfits.
4. Softly intervene in impulsive purchases by asking reflective questions.
5. Suggest alternatives that better align with their goals and budget.
`;

const isMock = !process.env.OPENAI_API_KEY || process.env.OPENAI_API_KEY === "dummy-key";

export async function generateStyleBlueprint(profileData: any) {
  if (isMock) {
    console.log("AI Blueprint: Mock Mode");
    return {
      aesthetic: "Editorial Soft Luxury",
      palette: ["#F9F7F2", "#A89F91", "#C5A059", "#1A1A1A"],
      heroPieces: ["Oversized Silk Blouse", "Tailored Wide-Leg Trousers", "Gold Statement Earring"],
      spendingStrategy: "Focus on natural fabrics and timeless silhouettes. Pause for 24h on synthetic blends."
    };
  }
  
  const prompt = `
  Based on the following user profile, create a comprehensive "Style Blueprint".
  Include:
  - Core Aesthetic Analysis
  - Recommended Color Palette
  - Key "Hero" Pieces for their wardrobe
  - Strategy for Intentional Spending (addressing their triggers)
  
  Profile: ${JSON.stringify(profileData)}
  `;

  try {
    const response = await openai.chat.completions.create({
      model: "gpt-4o",
      messages: [
        { role: "system", content: SYSTEM_PROMPT },
        { role: "user", content: prompt },
      ],
      response_format: { type: "json_object" },
    });

    return JSON.parse(response.choices[0].message.content || "{}");
  } catch (error) {
    console.error("AI Blueprint Error:", error);
    return { error: "Failed to generate blueprint" };
  }
}

export async function analyzeOutfitImage(imageUrl: string, userProfile: any) {
  if (isMock) {
    console.log("AI Vision: Mock Mode");
    return "This outfit beautifully aligns with your luxury aesthetic. The silhouette is balanced, though adding a gold accent would elevate it further. Intentionality Score: 9/10.";
  }

  const prompt = `
  Analyze this outfit image. 
  1. How well does it fit the user's defined aesthetic: ${userProfile.style_aesthetic}?
  2. Suggest 2-3 improvements or accessories.
  3. Score it from 1-10 on "Intentionality" based on their goals: ${userProfile.fashion_goals}.
  `;

  try {
    const response = await openai.chat.completions.create({
      model: "gpt-4o",
      messages: [
        { role: "system", content: SYSTEM_PROMPT },
        {
          role: "user",
          content: [
            { type: "text", text: prompt },
            { type: "image_url", image_url: { url: imageUrl } },
          ],
        },
      ],
    });

    return response.choices[0].message.content;
  } catch (error) {
    console.error("AI Vision Error:", error);
    return "I'm having trouble seeing the image right now, but let's talk about the style.";
  }
}

export async function analyzeGarment(imageUrl: string) {
  // Vision model integration for analyzing uploaded outfit/closet images
  if (isMock) {
    await new Promise((resolve) => setTimeout(resolve, 2000));
    return {
      name: "Silk Slip Dress",
      category: "outerwear",
      brand: "Unknown",
      color: "Champagne",
      tags: ["silk", "minimalist", "luxury", "evening"],
    };
  }

  try {
    const response = await openai.chat.completions.create({
      model: "gpt-4o",
      messages: [
        {
          role: "system",
          content: "You are the Aera Vision Stylist. Analyze the garment in the image and provide its name, category (tops, bottoms, outerwear, shoes, accessories), brand (if visible), primary color, and style tags. Return as JSON.",
        },
        {
          role: "user",
          content: [
            { type: "text", text: "Analyze this garment for my digital wardrobe." },
            { type: "image_url", image_url: { url: imageUrl } },
          ],
        },
      ],
      response_format: { type: "json_object" },
    });

    return JSON.parse(response.choices[0].message.content || "{}");
  } catch (error) {
    console.error("AI Analysis Error:", error);
    return {
      name: "New Piece",
      category: "tops",
      brand: "Unknown",
      color: "Unknown",
      tags: [],
    };
  }
}

export async function generateCapsule(wardrobe: any[], theme: string) {
  if (isMock) {
    await new Promise((resolve) => setTimeout(resolve, 1500));
    return wardrobe.slice(0, 5); // Just return first 5 items
  }

  const prompt = `
  Build a ${theme} capsule wardrobe using only the following items from my inventory:
  ${JSON.stringify(wardrobe)}
  
  Select 5-8 pieces that create the most versatile combinations. Return an array of item IDs.
  `;

  try {
    const response = await openai.chat.completions.create({
      model: "gpt-4o",
      messages: [
        { role: "system", content: SYSTEM_PROMPT },
        { role: "user", content: prompt },
      ],
      response_format: { type: "json_object" },
    });

    const result = JSON.parse(response.choices[0].message.content || "{}");
    return result.itemIds || [];
  } catch (error) {
    console.error("Capsule Generation Error:", error);
    return [];
  }
}

export async function generateDailyOutfits(wardrobe: any[], profile: any, weather: string, schedule: string) {
  if (isMock) {
    await new Promise((resolve) => setTimeout(resolve, 2000));
    // Mock 3 outfits
    return [
      {
        name: "Morning Gallery Visit",
        items: wardrobe.slice(0, 3).map((i) => i.id),
        description: "A sophisticated blend for a creative morning.",
      },
      {
        name: "Business Lunch",
        items: wardrobe.slice(2, 5).map((i) => i.id),
        description: "Sharp and professional while maintaining your minimalist edge.",
      },
      {
        name: "Evening Solace",
        items: wardrobe.slice(1, 4).map((i) => i.id),
        description: "Soft fabrics for a calming end to the day.",
      },
    ];
  }

  const prompt = `
  Suggest 3 distinct outfits for today based on:
  Wardrobe: ${JSON.stringify(wardrobe.map((i) => ({ id: i.id, name: i.name, category: i.category, color: i.color })))}
  Profile Aesthetic: ${profile.style_aesthetic}
  Weather: ${weather}
  Schedule: ${schedule}

  Return an array of 3 objects with 'name', 'items' (array of IDs), and 'description' under the key 'outfits'.
  `;

  try {
    const response = await openai.chat.completions.create({
      model: "gpt-4o",
      messages: [
        { role: "system", content: SYSTEM_PROMPT },
        { role: "user", content: prompt },
      ],
      response_format: { type: "json_object" },
    });

    const result = JSON.parse(response.choices[0].message.content || "{}");
    return result.outfits || [];
  } catch (error) {
    console.error("Daily Outfit Generation Error:", error);
    return [];
  }
}

export async function suggestRestyling(item: any, wardrobe: any[], profile: any) {
  if (isMock) {
    await new Promise((resolve) => setTimeout(resolve, 1500));
    return `Try pairing your ${item.name} with tailored trousers and a simple gold accessory to bring it back into your current rotation.`;
  }

  const prompt = `
  The user hasn't worn their "${item.name}" in a while. 
  Suggest a new way to style it using their other pieces: ${JSON.stringify(wardrobe.map((i) => i.name))}
  Keep it in line with their aesthetic: ${profile.style_aesthetic}
  `;

  try {
    const response = await openai.chat.completions.create({
      model: "gpt-4o",
      messages: [
        { role: "system", content: SYSTEM_PROMPT },
        { role: "user", content: prompt },
      ],
    });

    return response.choices[0].message.content;
  } catch (error) {
    console.error("Restyling Suggestion Error:", error);
    return "Let's try pairing this with some of your favorite basics.";
  }
}
