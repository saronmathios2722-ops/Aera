"use client";

import { motion } from "framer-motion";
import { Info, AlertCircle, CheckCircle2, TrendingUp } from "lucide-react";
import GlassCard from "@/components/ui/GlassCard";

const gapData = [
  { 
    category: "Structured Blazers", 
    inspiration: 85, 
    wardrobe: 20, 
    status: "Significant Gap", 
    recommendation: "Invest in 1-2 high-quality wool blazers in neutral tones.",
    color: "bg-red-400"
  },
  { 
    category: "Silk Blouses", 
    inspiration: 70, 
    wardrobe: 65, 
    status: "Aligned", 
    recommendation: "You have a solid base. Consider focusing on variety in textures.",
    color: "bg-green-400"
  },
  { 
    category: "Linen Bottoms", 
    inspiration: 60, 
    wardrobe: 10, 
    status: "Emerging Need", 
    recommendation: "As summer approaches, look for sustainably sourced linen trousers.",
    color: "bg-orange-400"
  },
  { 
    category: "Minimalist Footwear", 
    inspiration: 90, 
    wardrobe: 85, 
    status: "Sanctuary Complete", 
    recommendation: "Wardrobe exceeds or matches aesthetic goals. Maintenance mode.",
    color: "bg-blue-400"
  },
];

export default function GapAnalysis() {
  return (
    <div className="space-y-6">
      <div className="flex items-center gap-2">
        <TrendingUp className="h-5 w-5 text-aureve-gold" />
        <h2 className="text-xs uppercase tracking-[0.2em] font-semibold text-aureve-taupe">Style Gap Analysis</h2>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <GlassCard className="p-8 !rounded-[2.5rem]">
          <h3 className="font-serif text-2xl text-aureve-charcoal mb-8">Wardrobe vs. Aesthetic</h3>
          <div className="space-y-8">
            {gapData.map((item, idx) => (
              <div key={item.category} className="space-y-3">
                <div className="flex justify-between items-center">
                  <span className="text-xs font-bold text-aureve-charcoal uppercase tracking-widest">{item.category}</span>
                  <span className={`text-[10px] font-bold uppercase tracking-widest px-2 py-1 rounded-full ${
                    item.status === 'Aligned' || item.status === 'Sanctuary Complete' ? 'text-green-600 bg-green-500/10' : 'text-orange-600 bg-orange-500/10'
                  }`}>
                    {item.status}
                  </span>
                </div>
                <div className="relative h-2 w-full bg-aureve-gray/20 rounded-full overflow-hidden">
                   {/* Wardrobe Level */}
                   <motion.div 
                     initial={{ width: 0 }}
                     animate={{ width: `${item.wardrobe}%` }}
                     transition={{ duration: 1, delay: idx * 0.1 }}
                     className={`absolute h-full ${item.color} z-10 rounded-full`}
                   />
                   {/* Inspiration Target */}
                   <div 
                     className="absolute h-full border-r-2 border-aureve-charcoal/30 z-20 border-dashed"
                     style={{ left: `${item.inspiration}%` }}
                   />
                </div>
                <div className="flex justify-between text-[9px] uppercase tracking-tighter text-aureve-taupe font-medium">
                   <span>Wardrobe: {item.wardrobe}%</span>
                   <span>Target: {item.inspiration}%</span>
                </div>
              </div>
            ))}
          </div>
        </GlassCard>

        <div className="space-y-6">
          <GlassCard className="p-8 !rounded-[2.5rem] bg-aureve-charcoal text-white relative overflow-hidden">
             <div className="relative z-10">
               <h3 className="font-serif text-2xl mb-4">AI Recommendations</h3>
               <div className="space-y-4">
                 {gapData.filter(i => i.status !== 'Aligned' && i.status !== 'Sanctuary Complete').map((item, idx) => (
                   <div key={idx} className="flex gap-4 items-start p-4 bg-white/5 rounded-2xl border border-white/10">
                     <AlertCircle className="h-5 w-5 text-aureve-gold shrink-0 mt-1" />
                     <p className="text-sm text-aureve-cream/80 leading-relaxed">
                       <span className="text-white font-semibold">{item.category}:</span> {item.recommendation}
                     </p>
                   </div>
                 ))}
                 <div className="flex gap-4 items-start p-4 bg-white/5 rounded-2xl border border-white/10">
                    <CheckCircle2 className="h-5 w-5 text-green-400 shrink-0 mt-1" />
                    <p className="text-sm text-aureve-cream/80 leading-relaxed">
                      Your <span className="text-white font-semibold">Silk & Monochrome</span> collection is perfectly curated for your current lifestyle goals.
                    </p>
                 </div>
               </div>
             </div>
             {/* Abstract glow */}
             <div className="absolute -bottom-12 -right-12 h-64 w-64 bg-aureve-gold/20 blur-[100px] rounded-full" />
          </GlassCard>

          <GlassCard className="p-6 !rounded-2xl flex items-center gap-4 border-dashed border-2 bg-transparent shadow-none">
             <div className="bg-aureve-cream p-3 rounded-xl">
                <Info className="h-5 w-5 text-aureve-gold" />
             </div>
             <p className="text-xs text-aureve-taupe leading-relaxed">
               Gap analysis is updated every time you link new inspiration or add items to your wardrobe sanctuary.
             </p>
          </GlassCard>
        </div>
      </div>
    </div>
  );
}
