"use client";

import { motion, AnimatePresence } from "framer-motion";
import { 
  Heart, 
  Share2, 
  ArrowUpRight, 
  Sparkles, 
  Zap, 
  Maximize2 
} from "lucide-react";
import Image from "next/image";
import { useState } from "react";
import GlassCard from "@/components/ui/GlassCard";
import { useDiscovery } from "@/hooks/useDiscovery";

const inspirationOutfits = [
  {
    id: 1,
    name: "Midnight Silk",
    vibe: "Minimalist Evening",
    top: "Silk Slip Top",
    bottom: "Tailored Wool Trousers",
    shoes: "Leather Slingbacks",
    acc: "Gold Chain Necklace",
    why: "Monochrome textures create a heightening effect for evening transitions.",
    budget: "$840",
    stores: ["Cuyana", "The Row"],
    image: "https://images.unsplash.com/photo-1539109132314-347556050300?q=80&w=800"
  },
  {
    id: 2,
    name: "Architectural Linen",
    vibe: "Creative Professional",
    top: "Sculptural Blazer",
    bottom: "Wide-Leg Linen Pant",
    shoes: "Minimalist Loafers",
    acc: "Geometric Earrings",
    why: "Linen's natural structure provides a professional yet relaxed silhouette for daylight work.",
    budget: "$620",
    stores: ["Arket", "Arje"],
    image: "https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?q=80&w=800"
  },
  {
    id: 3,
    name: "The Soft Layer",
    vibe: "Luxurious Lounge",
    top: "Cashmere Turtleneck",
    bottom: "Silk Knit Leggings",
    shoes: "Shearling Mules",
    acc: "Silk Scarf",
    why: "Cashmere-on-silk layering optimizes thermal comfort without sacrificing aesthetic weight.",
    budget: "$1,100",
    stores: ["Loro Piana", "Falconeri"],
    image: "https://images.unsplash.com/photo-1434389677669-e08b4cac3105?q=80&w=800"
  }
];

export default function VisualFeed({ fastMode = false }: { fastMode?: boolean }) {
  const displayOutfits = fastMode ? inspirationOutfits.slice(0, 3) : inspirationOutfits;
  const { logDiscovery } = useDiscovery();

  const handleDiscovery = async (outfit: any) => {
    await logDiscovery({
      itemName: outfit.name,
      imageUrl: outfit.image
    });
  };

  return (
    <div className="space-y-16">
      <div className="flex items-center justify-between border-b border-aureve-base/20 pb-8">
        <div className="flex items-center gap-6">
          <div className="h-12 w-12 bg-aureve-accent/10 rounded-2xl flex items-center justify-center text-aureve-accent">
            <Sparkles className="h-6 w-6 stroke-[1.5]" />
          </div>
          <div>
            <h2 className="text-[10px] uppercase tracking-[0.5em] font-bold text-aureve-charcoal">Aesthetic Evolution</h2>
            <p className="text-sm text-aureve-muted/60 font-light italic mt-1 font-serif">Curated for your current vibration</p>
          </div>
        </div>
        <button className="text-[9px] uppercase tracking-[0.4em] font-bold text-aureve-muted/60 hover:text-aureve-charcoal transition-colors">Expand Feed</button>
      </div>

      {fastMode && (
        <motion.div 
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-aureve-accent/5 p-6 rounded-3xl border border-aureve-accent/10 flex items-center gap-4"
        >
          <div className="bg-aureve-accent p-2 rounded-lg">
            <Zap className="h-4 w-4 text-white" />
          </div>
          <div className="flex-1">
             <span className="text-[9px] font-bold uppercase tracking-[0.3em] text-aureve-accent block mb-1">Instant Ritual</span>
             <p className="text-aureve-charcoal text-sm italic font-serif leading-relaxed">
               "A fast curation for a high-velocity day. Focus on these three anchor looks."
             </p>
          </div>
        </motion.div>
      )}

      <div className={`grid grid-cols-1 ${fastMode ? 'md:grid-cols-2' : 'md:grid-cols-2 lg:grid-cols-3'} gap-12`}>
        {displayOutfits.map((outfit, idx) => (
          <motion.div
            key={outfit.id}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: idx * 0.1, duration: 1, ease: [0.16, 1, 0.3, 1] }}
          >
            <GlassCard className="group p-0 overflow-hidden !rounded-[3rem] border-none shadow-soft hover:shadow-floating transition-all duration-700 bg-white/60 flex flex-col h-full" hover>
              <div className="relative aspect-[4/5] overflow-hidden">
                <Image
                  src={outfit.image}
                  alt={outfit.name}
                  fill
                  className="object-cover transition-transform duration-[4000ms] group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-aureve-charcoal/80 via-transparent to-transparent opacity-40 group-hover:opacity-100 transition-opacity duration-700" />
                
                <div className="absolute top-8 right-8 flex flex-col gap-4 translate-x-16 opacity-0 group-hover:translate-x-0 group-hover:opacity-100 transition-all duration-700 delay-100">
                   <button className="h-12 w-12 rounded-full bg-white/95 backdrop-blur-md flex items-center justify-center text-aureve-charcoal hover:bg-aureve-accent hover:text-white transition-all shadow-soft group/icon">
                     <Heart className="h-5 w-5 stroke-[1.5]" />
                   </button>
                   <button className="h-12 w-12 rounded-full bg-white/95 backdrop-blur-md flex items-center justify-center text-aureve-charcoal hover:bg-aureve-accent hover:text-white transition-all shadow-soft group/icon">
                     <Share2 className="h-5 w-5 stroke-[1.5]" />
                   </button>
                </div>

                <div className="absolute bottom-8 left-10 right-10 translate-y-6 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-700 delay-200">
                   <p className="text-[10px] font-bold uppercase tracking-[0.4em] text-aureve-accent/80 mb-2">{outfit.vibe}</p>
                   <h3 className="font-serif text-4xl text-white italic leading-tight">{outfit.name}</h3>
                </div>
              </div>

              <div className="p-10 flex-1 flex flex-col justify-between">
                <div className="space-y-8">
                  <div className="grid grid-cols-2 gap-x-8 gap-y-6">
                    <div className="space-y-1.5">
                      <p className="text-[9px] font-bold uppercase tracking-widest text-aureve-muted/40">Upper</p>
                      <p className="text-sm text-aureve-charcoal font-medium font-serif italic truncate">{outfit.top}</p>
                    </div>
                    <div className="space-y-1.5">
                      <p className="text-[9px] font-bold uppercase tracking-widest text-aureve-muted/40">Lower</p>
                      <p className="text-sm text-aureve-charcoal font-medium font-serif italic truncate">{outfit.bottom}</p>
                    </div>
                    <div className="space-y-1.5">
                      <p className="text-[9px] font-bold uppercase tracking-widest text-aureve-muted/40">Sole</p>
                      <p className="text-sm text-aureve-charcoal font-medium font-serif italic truncate">{outfit.shoes}</p>
                    </div>
                    <div className="space-y-1.5">
                      <p className="text-[9px] font-bold uppercase tracking-widest text-aureve-muted/40">Accent</p>
                      <p className="text-sm text-aureve-charcoal font-medium font-serif italic truncate">{outfit.acc}</p>
                    </div>
                  </div>

                  <div className="p-6 rounded-[2rem] bg-aureve-cream/40 border border-aureve-base/10 relative overflow-hidden group/insight">
                     <p className="text-[9px] font-bold uppercase tracking-[0.3em] text-aureve-accent mb-3 flex items-center gap-3">
                       <Sparkles className="h-3 w-3" /> Aera Insight
                     </p>
                     <p className="text-sm text-aureve-muted leading-relaxed italic font-serif">
                       "{outfit.why}"
                     </p>
                     <div className="absolute top-0 right-0 -mr-4 -mt-4 h-16 w-16 bg-aureve-accent/5 blur-2xl rounded-full" />
                  </div>
                </div>

                <div className="mt-10 pt-8 border-t border-aureve-base/20 flex items-center justify-between">
                   <div className="space-y-1">
                      <p className="text-[9px] font-bold uppercase tracking-widest text-aureve-muted/30">Curation Value</p>
                      <div className="flex items-center gap-3">
                        <span className="text-2xl font-serif text-aureve-charcoal font-light italic">{outfit.budget}</span>
                        <div className="flex gap-1.5">
                          {outfit.stores.slice(0, 2).map(s => (
                            <span key={s} className="text-[8px] px-2 py-0.5 rounded-full bg-aureve-charcoal/5 text-aureve-muted/60 border border-aureve-base/20 font-bold uppercase tracking-tighter">{s}</span>
                          ))}
                        </div>
                      </div>
                   </div>
                   <button 
                     onClick={() => handleDiscovery(outfit)}
                     className="h-14 w-14 rounded-full bg-aureve-charcoal text-white flex items-center justify-center hover:bg-aureve-accent transition-all shadow-soft group/btn"
                   >
                      <ArrowUpRight className="h-6 w-6 group-hover/btn:translate-x-0.5 group-hover/btn:-translate-y-0.5 transition-transform stroke-[1.5]" />
                   </button>
                </div>
              </div>
            </GlassCard>
          </motion.div>
        ))}
      </div>

      {!fastMode && (
        <div className="flex justify-center py-12">
           <button className="px-16 py-6 rounded-full border border-aureve-base/30 text-[10px] font-bold uppercase tracking-[0.4em] text-aureve-muted hover:border-aureve-accent hover:text-aureve-accent transition-all duration-500">
             Explore Aesthetic Depths
           </button>
        </div>
      )}
    </div>
  );
}
