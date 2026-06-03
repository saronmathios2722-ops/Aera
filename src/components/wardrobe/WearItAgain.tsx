"use client";

import { useEffect, useState } from "react";
import GlassCard from "../ui/GlassCard";
import { RefreshCw, ArrowRight, Sparkles } from "lucide-react";
import Image from "next/image";
import { motion } from "framer-motion";

export default function WearItAgain() {
  const [suggestion, setSuggestion] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchSuggestion() {
      try {
        const response = await fetch("/api/outfits/suggestions");
        const data = await response.json();
        if (data.item) {
          setSuggestion(data);
        }
      } catch (error) {
        console.error("Failed to fetch suggestion", error);
      } finally {
        setLoading(false);
      }
    }
    fetchSuggestion();
  }, []);

  if (loading || !suggestion) return null;

  return (
    <div className="space-y-10">
      <div className="flex items-center justify-between border-b border-aureve-base/20 pb-8">
        <div className="flex items-center gap-6">
          <div className="h-12 w-12 bg-aureve-accent/10 rounded-2xl flex items-center justify-center text-aureve-accent">
            <RefreshCw className="h-6 w-6 stroke-[1.5]" />
          </div>
          <div>
            <h2 className="text-[10px] uppercase tracking-[0.5em] font-bold text-aureve-charcoal">Forgotten Essence</h2>
            <p className="text-sm text-aureve-muted/60 font-light italic mt-1 font-serif">Reviving underutilized artifacts</p>
          </div>
        </div>
      </div>

      <GlassCard className="p-0 !rounded-[3rem] overflow-hidden flex flex-col md:flex-row border-none bg-white/40 group" hover>
        <div className="relative w-full md:w-[40%] aspect-[4/5] md:aspect-auto bg-aureve-cream overflow-hidden">
          <Image
            src={suggestion.item.image_url || "https://images.unsplash.com/photo-1591047139829-d91aecb6caea?auto=format&fit=crop&q=80&w=800"}
            alt={suggestion.item.name}
            fill
            className="object-cover opacity-95 transition-transform duration-[3000ms] group-hover:scale-110"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-transparent to-aureve-charcoal/10 hidden md:block" />
        </div>
        
        <div className="p-12 md:p-16 flex-1 flex flex-col justify-center space-y-10 relative">
          <div className="space-y-4">
             <p className="text-[10px] uppercase tracking-[0.4em] text-aureve-accent font-bold flex items-center gap-3">
               <Sparkles className="h-3 w-3" /> Artifact Revival
             </p>
             <h3 className="font-serif text-5xl text-aureve-charcoal italic font-light leading-tight">
               Your {suggestion.item.brand} <br />
               <span className="text-aureve-muted">{suggestion.item.name}</span>
             </h3>
          </div>

          <div className="relative">
            <div className="absolute -left-6 top-0 bottom-0 w-[1px] bg-aureve-accent/20" />
            <p className="text-xl text-aureve-charcoal/70 leading-relaxed italic font-serif pl-4">
              "{suggestion.suggestion}"
            </p>
          </div>

          <div className="pt-6">
            <button className="bg-aureve-charcoal text-white px-12 py-5 rounded-full text-[10px] uppercase tracking-[0.4em] font-bold shadow-soft hover:bg-aureve-accent transition-all duration-500 flex items-center gap-4 group/btn">
               Architect Look <ArrowRight className="h-4 w-4 group-hover/btn:translate-x-2 transition-transform stroke-[1.5]" />
            </button>
          </div>

          {/* Glow */}
          <div className="absolute bottom-0 right-0 -mr-12 -mt-12 h-40 w-40 bg-aureve-accent/5 blur-[60px] rounded-full" />
        </div>
      </GlassCard>
    </div>
  );
}
