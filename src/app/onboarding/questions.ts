export interface Question {
  id: string;
  question: string;
  type: "text" | "choice" | "multiple" | "scale" | "upload";
  options?: string[];
  placeholder?: string;
  section: string;
  imageGrid?: string[];
}

export const onboardingQuestions: Question[] = [
  // SECTION 1: THE INVITATION (Identity)
  {
    id: "name",
    question: "Welcome to the Sanctuary. What shall we call you?",
    type: "text",
    placeholder: "Your name...",
    section: "The Invitation",
  },
  {
    id: "purpose",
    question: "What brings you to Aera today?",
    type: "choice",
    options: [
      "Mastering intentionality",
      "Defining a new identity",
      "Healing my relationship with shopping",
      "Curating a permanent capsule"
    ],
    section: "The Invitation",
  },
  {
    id: "style_poem",
    question: "If your style was a poem, what would its first line be?",
    type: "text",
    placeholder: "e.g., 'Soft light on a cold morning...'",
    section: "The Invitation",
  },
  {
    id: "morning_feeling",
    question: "How does your current wardrobe make you feel each morning?",
    type: "choice",
    options: ["Inspired", "Overwhelmed", "Indifferent", "Defeated"],
    section: "The Invitation",
  },
  {
    id: "destiny_belief",
    question: "Do you believe clothes can change your destiny?",
    type: "choice",
    options: ["Absolutely", "I'm skeptical", "I want to believe", "It's just fabric"],
    section: "The Invitation",
  },
  {
    id: "fashion_age",
    question: "What is your 'fashion age'? (How old do you feel when you dress your best?)",
    type: "text",
    placeholder: "e.g., 25, 40, ageless...",
    section: "The Invitation",
  },

  // SECTION 2: THE SILHOUETTE (Presence & Body)
  {
    id: "silent_impression",
    question: "When you enter a room, what is the 'silent' impression you want to leave?",
    type: "choice",
    options: ["Authority", "Ethereal grace", "Quiet luxury", "Avant-garde edge"],
    section: "The Silhouette",
  },
  {
    id: "body_home",
    question: "What part of your body do you feel most 'at home' in?",
    type: "choice",
    options: ["My shoulders", "My legs", "My waist", "My hands", "Everything"],
    section: "The Silhouette",
  },
  {
    id: "curator_silhouette",
    question: "Which silhouette makes you feel most like a 'curator'?",
    type: "choice",
    options: ["Oversized & architectural", "Sharp & tailored", "Flowing & romantic", "Minimal & sleek"],
    section: "The Silhouette",
  },
  {
    id: "armor_vs_freedom",
    question: "Do you prefer the armor of structure or the freedom of flow?",
    type: "choice",
    options: ["Armor", "Freedom", "A delicate balance"],
    section: "The Silhouette",
  },
  {
    id: "body_shape",
    question: "How would you describe your current body shape?",
    type: "choice",
    options: ["Hourglass", "Pear", "Apple", "Rectangle", "Inverted Triangle"],
    section: "The Silhouette",
  },
  {
    id: "second_skin",
    question: "If you could have any 'second skin', what texture would it be?",
    type: "choice",
    options: ["Silk", "Linen", "Heavy wool", "Supple leather"],
    section: "The Silhouette",
  },
  {
    id: "space_taken",
    question: "How much space do you like your clothes to take up in the world?",
    type: "scale",
    section: "The Silhouette",
  },
  {
    id: "hug_item",
    question: "What is the one item you wear that feels like a 'hug'?",
    type: "text",
    placeholder: "e.g., An oversized cashmere sweater...",
    section: "The Silhouette",
  },

  // SECTION 3: THE PALETTE (Aesthetics & Essence)
  {
    id: "power_colors",
    question: "Which colors make you feel powerful?",
    type: "multiple",
    options: ["Stark black", "Natural creams", "Earthy clays", "Jewel tones", "Pastel clouds"],
    section: "The Palette",
  },
  {
    id: "atmosphere",
    question: "What 'atmosphere' do you want your life to evoke?",
    type: "choice",
    options: ["Mist on a mountain", "Late night in a library", "Sunlight in a gallery", "Rain on a city street"],
    section: "The Palette",
  },
  {
    id: "soul_aesthetics",
    question: "Select the aesthetics that resonate with your soul.",
    type: "multiple",
    options: ["Quiet Luxury", "90s Editorial", "Dark Academia", "Organic Minimalist", "Cyber Silhouette"],
    section: "The Palette",
  },
  {
    id: "fashion_era",
    question: "Which fashion era do you wish you could have curated?",
    type: "choice",
    options: ["90s Minimalism", "70s Bohemia", "50s Structure", "The Future"],
    section: "The Palette",
  },
  {
    id: "foundation_vs_statement",
    question: "Do you prefer 'the statement' or 'the foundation'?",
    type: "choice",
    options: ["The Statement", "The Foundation", "The interplay of both"],
    section: "The Palette",
  },
  {
    id: "dream_fabric",
    question: "What is your 'dream' fabric?",
    type: "text",
    placeholder: "e.g., Vintage washed silk...",
    section: "The Palette",
  },
  {
    id: "signature_accessory",
    question: "Which accessory feels like your 'signature'?",
    type: "choice",
    options: ["A structured bag", "Timeless jewelry", "A bold scarf", "A unique pair of shoes"],
    section: "The Palette",
  },
  {
    id: "new_vs_permanent",
    question: "How often do you seek 'the new' over 'the permanent'?",
    type: "scale",
    section: "The Palette",
  },

  // SECTION 4: THE PSYCHOLOGY (Triggers & Habits)
  {
    id: "impulse_vulnerability",
    question: "When are you most vulnerable to an impulse purchase?",
    type: "choice",
    options: ["3 AM doomscrolling", "After a stressful day", "When I see a 'sale' tag", "Social comparison"],
    section: "The Psychology",
  },
  {
    id: "expensive_outfits",
    question: "What outfits make you feel 'expensive'?",
    type: "text",
    placeholder: "e.g., A perfectly tailored blazer...",
    section: "The Psychology",
  },
  {
    id: "sad_wear",
    question: "What do you wear when you feel sad?",
    type: "choice",
    options: ["Loungewear", "My 'safe' outfit", "Something bright", "I don't change"],
    section: "The Psychology",
  },
  {
    id: "tags_attached",
    question: "What was the last item you acquired that still has its tags attached?",
    type: "text",
    placeholder: "Be honest...",
    section: "The Psychology",
  },
  {
    id: "why_bought",
    question: "Why did you buy it?",
    type: "choice",
    options: ["It was a trend", "It was on sale", "I thought it would change me", "I forgot I had it"],
    section: "The Psychology",
  },
  {
    id: "wardrobe_utilization",
    question: "How much of your current wardrobe do you actually wear?",
    type: "scale",
    section: "The Psychology",
  },
  {
    id: "dopamine_loop",
    question: "What is your 'shopping dopamine' loop like?",
    type: "text",
    placeholder: "e.g., Adding to cart but never buying...",
    section: "The Psychology",
  },
  {
    id: "buy_for_who",
    question: "Do you buy for the person you are, or the person you 'wish' to be?",
    type: "choice",
    options: ["Who I am", "Who I wish to be", "A bit of both"],
    section: "The Psychology",
  },

  // SECTION 5: THE VISION (Goals & Dreams)
  {
    id: "dream_wardrobe_words",
    question: "Describe your 'Dream Wardrobe' in three words.",
    type: "text",
    placeholder: "e.g., Timeless, Fluid, Sharp...",
    section: "The Vision",
  },
  {
    id: "closet_raid",
    question: "Which influencer or celebrity's closet would you raid tonight?",
    type: "text",
    placeholder: "Name or handle...",
    section: "The Vision",
  },
  {
    id: "five_items",
    question: "If you could only keep 5 items from your closet, what would they be?",
    type: "text",
    placeholder: "e.g., My mother's watch, my denim...",
    section: "The Vision",
  },
  {
    id: "north_star",
    question: "What is your fashion 'North Star'?",
    type: "choice",
    options: ["Versatility", "Uniqueness", "Comfort", "Prestige"],
    section: "The Vision",
  },
  {
    id: "ritual_time",
    question: "How much time do you want to spend on your outfit ritual each day?",
    type: "choice",
    options: ["5 minutes", "30 minutes", "I want a deep ritual", "As little as possible"],
    section: "The Vision",
  },
  {
    id: "holy_grail",
    question: "What is the one 'holy grail' item you've been searching for?",
    type: "text",
    placeholder: "e.g., The perfect trench coat...",
    section: "The Vision",
  },
  {
    id: "ethical_soul",
    question: "How important is the 'ethical soul' of your clothes?",
    type: "scale",
    section: "The Vision",
  },
  {
    id: "clothes_statement",
    question: "What do you want your clothes to say when you're not speaking?",
    type: "text",
    placeholder: "e.g., 'I am grounded and capable.'",
    section: "The Vision",
  },

  // SECTION 6: THE SANCTUARY (Logistics & Budget)
  {
    id: "spending_threshold",
    question: "What is your monthly 'Intentional Spending' threshold?",
    type: "choice",
    options: ["< $100", "$100 - $300", "$300 - $1000", "Unrestricted"],
    section: "The Sanctuary",
  },
  {
    id: "artifact_sources",
    question: "Where do you currently find your 'artifacts'?",
    type: "multiple",
    options: ["Thrifting", "Luxury boutiques", "High-street", "Sustainable brands"],
    section: "The Sanctuary",
  },
  {
    id: "intervention_intensity",
    question: "How much 'intervention' do you want from Aera?",
    type: "choice",
    options: ["Gentle nudges", "Strict budget shield", "Style-first coaching", "Deep analysis"],
    section: "The Sanctuary",
  },
  {
    id: "climate_context",
    question: "Which city's 'atmosphere' matches your style goals?",
    type: "text",
    placeholder: "e.g., Tokyo, Paris, New York...",
    section: "The Sanctuary",
  },
  {
    id: "cost_per_wear",
    question: "What is the ideal 'cost per wear' you aim for?",
    type: "text",
    placeholder: "e.g., $1.00...",
    section: "The Sanctuary",
  },
  {
    id: "ready_ritual",
    question: "Are you ready to begin the ritual of an intentional life?",
    type: "choice",
    options: ["I am ready", "Begin the curation"],
    section: "The Sanctuary",
  },
];
