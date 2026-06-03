"use client";

import { motion, AnimatePresence } from "framer-motion";
import { Plus, Maximize2, Tag, Sparkles } from "lucide-react";
import GlassCard from "@/components/ui/GlassCard";
import Image from "next/image";
import { useState } from "react";

const inspirationItems = [
  { id: 1, url: "https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?q=80&w=800", tags: ["Minimalist", "Neutral", "Structured"] },
  { id: 2, url: "https://images.unsplash.com/photo-1434389677669-e08b4cac3105?q=80&w=800", tags: ["Cozy", "Wool", "Oversized"] },
  { id: 3, url: "https://images.unsplash.com/photo-1539109132314-347556050300?q=80&w=800", tags: ["Editorial", "Monochrome", "Silk"] },
  { id: 4, url: "https://images.unsplash.com/photo-1490481651871-ab68de25d43d?q=80&w=800", tags: ["Summer", "Linen", "Soft Luxury"] },
  { id: 5, url: "https://images.unsplash.com/photo-1485230895905-ec40ba36b9bc?q=80&w=800", tags: ["Modern", "Black", "Leather"] },
  { id: 6, url: "https://images.unsplash.com/photo-1509631179647-0177331693ae?q=80&w=800", tags: ["Texture", "Classic", "Tailored"] },
];

export default function Moodboard() {
  const [hoveredId, setHoveredId] = useState<number | null>(null);

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Sparkles className="h-5 w-5 text-aureve-gold" />
          <h2 className="text-xs uppercase tracking-[0.2em] font-semibold text-aureve-taupe">Curated Inspiration</h2>
        </div>
        <button className="text-[10px] uppercase tracking-widest text-aureve-taupe hover:text-aureve-charcoal transition-colors">+ Add Inspiration</button>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {inspirationItems.map((item, idx) => (
          <motion.div
            key={item.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: idx * 0.1 }}
            onMouseEnter={() => setHoveredId(item.id)}
            onMouseLeave={() => setHoveredId(null)}
            className="relative group cursor-pointer"
          >
            <div className="relative aspect-[3/4] overflow-hidden rounded-[2rem] bg-aureve-cream">
              <Image 
                src={item.url} 
                alt={`Inspiration ${item.id}`} 
                fill 
                className="object-cover transition-transform duration-700 group-hover:scale-110"
              />
              
              <AnimatePresence>
                {hoveredId === item.id && (
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="absolute inset-0 bg-aureve-charcoal/40 backdrop-blur-[2px] flex flex-col justify-end p-6"
                  >
                    <div className="flex flex-wrap gap-2 mb-4">
                      {item.tags.map(tag => (
                        <span key={tag} className="text-[9px] uppercase tracking-widest bg-white/20 backdrop-blur-md text-white px-2 py-1 rounded-full border border-white/30">
                          {tag}
                        </span>
                      ))}
                    </div>
                    <div className="flex items-center justify-between">
                       <div className="bg-white/20 p-2 rounded-full backdrop-blur-md border border-white/30">
                         <Maximize2 className="h-3 w-3 text-white" />
                       </div>
                       <div className="bg-aureve-gold p-2 rounded-full shadow-lg">
                         <Tag className="h-3 w-3 text-white" />
                       </div>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </motion.div>
        ))}

        <motion.div 
          whileHover={{ scale: 1.02 }}
          className="aspect-[3/4] rounded-[2rem] border-2 border-dashed border-aureve-gray/30 flex flex-col items-center justify-center gap-4 hover:border-aureve-gold transition-colors cursor-pointer bg-white/20"
        >
          <div className="bg-aureve-cream p-4 rounded-full">
            <Plus className="h-6 w-6 text-aureve-taupe" />
          </div>
          <p className="text-[10px] uppercase tracking-widest text-aureve-taupe font-bold">Upload Aesthetic</p>
        </motion.div>
      </div>
    </div>
  );
}
