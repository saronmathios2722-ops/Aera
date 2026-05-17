export interface Question {
  id: string;
  question: string;
  type: "text" | "choice" | "multiple" | "scale" | "upload";
  options?: string[];
  placeholder?: string;
  section: string;
}

export const onboardingQuestions: Question[] = [
  // SECTION 1: Basics
  {
    id: "name",
    question: "Welcome to Auréve. What shall we call you?",
    type: "text",
    placeholder: "Your name...",
    section: "Basics",
  },
  {
    id: "style_level",
    question: "How would you describe your current relationship with your wardrobe?",
    type: "choice",
    options: ["I love it, but need more direction", "I'm lost and need a total refresh", "I have pieces I love, but don't know how to style them", "It's purely functional for me right now"],
    section: "Basics",
  },

  // SECTION 2: Aesthetic
  {
    id: "aesthetic_vibe",
    question: "Which of these words resonate most with your dream style?",
    type: "multiple",
    options: ["Minimalist", "Bohemian", "Classic", "Avant-Garde", "Streetwear", "Luxury Noir", "Quiet Luxury", "Eclectic"],
    section: "Aesthetic",
  },
  {
    id: "color_mood",
    question: "What colors make you feel most powerful?",
    type: "multiple",
    options: ["Monochrome (Black/White)", "Earthy Tones", "Jewel Tones", "Pastels", "Bold Primaries", "Neutrals & Creams"],
    section: "Aesthetic",
  },
  {
    id: "fabric_preference",
    question: "Do you have a preference for certain fabrics?",
    type: "multiple",
    options: ["Silk", "Linen", "Organic Cotton", "Wool & Cashmere", "Leather", "Technical/Synthetic"],
    section: "Aesthetic",
  },

  // SECTION 3: Emotional Connection
  {
    id: "shopping_trigger",
    question: "When are you most likely to buy something on impulse?",
    type: "choice",
    options: ["When I'm stressed", "When I'm feeling happy/celebratory", "Late at night while scrolling", "When I see a 'sale' tag"],
    section: "Emotional",
  },
  {
    id: "fashion_confidence",
    question: "How much does your outfit affect your confidence today?",
    type: "scale",
    section: "Emotional",
  },
  {
    id: "regret_purchase",
    question: "What do you usually regret buying the most?",
    type: "text",
    placeholder: "e.g., fast fashion trends, uncomfortable shoes...",
    section: "Emotional",
  },

  // SECTION 4: Wardrobe
  {
    id: "wardrobe_size",
    question: "Roughly, how many items are in your current wardrobe?",
    type: "choice",
    options: ["Less than 30 (Capsule)", "30 - 100", "100 - 300", "More than I can count"],
    section: "Wardrobe",
  },
  {
    id: "favorite_piece",
    question: "Describe your single favorite piece of clothing.",
    type: "text",
    placeholder: "Why do you love it?",
    section: "Wardrobe",
  },

  // SECTION 5: Budget & Goals
  {
    id: "monthly_budget",
    question: "What is your typical monthly fashion budget?",
    type: "choice",
    options: ["Under $100", "$100 - $500", "$500 - $2,000", "$2,000+"],
    section: "Budget",
  },
  {
    id: "main_goal",
    question: "What is your primary goal with Auréve?",
    type: "choice",
    options: ["Stop impulsive spending", "Define my personal style", "Build a capsule wardrobe", "Find high-quality alternatives to luxury"],
    section: "Budget",
  },
  
  // More questions would be added here to reach 40+
];
