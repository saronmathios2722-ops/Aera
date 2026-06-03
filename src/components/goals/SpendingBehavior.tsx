"use client";

import { motion } from "framer-motion";
import { TrendingUp, Wallet, ArrowUpRight, Zap, Heart } from "lucide-react";
import GlassCard from "@/components/ui/GlassCard";

const data = [
  { day: "Mon", intentional: 80, emotional: 20 },
  { day: "Tue", intentional: 95, emotional: 5 },
  { day: "Wed", intentional: 60, emotional: 40 },
  { day: "Thu", intentional: 90, emotional: 10 },
  { day: "Fri", intentional: 40, emotional: 60 },
  { day: "Sat", intentional: 70, emotional: 30 },
  { day: "Sun", intentional: 85, emotional: 15 },
];

export default function SpendingBehavior() {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Wallet className="h-5 w-5 text-aureve-gold" />
          <h2 className="text-xs uppercase tracking-[0.2em] font-semibold text-aureve-taupe">Behavioral Spending</h2>
        </div>
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2">
            <div className="h-2 w-2 rounded-full bg-aureve-charcoal" />
            <span className="text-[10px] uppercase tracking-widest text-aureve-taupe font-bold">Intentional</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="h-2 w-2 rounded-full bg-aureve-gold" />
            <span className="text-[10px] uppercase tracking-widest text-aureve-taupe font-bold">Emotional</span>
          </div>
        </div>
      </div>

      <GlassCard className="p-10 !rounded-[2.5rem]">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          {/* Chart Section */}
          <div className="lg:col-span-2 space-y-8">
            <div className="h-64 w-full flex items-end justify-between gap-2 px-4">
              {data.map((item, idx) => (
                <div key={item.day} className="flex-1 flex flex-col items-center gap-3 group">
                  <div className="w-full relative flex flex-col justify-end gap-1 h-48">
                    {/* Emotional Bar */}
                    <motion.div 
                      initial={{ height: 0 }}
                      animate={{ height: `${item.emotional}%` }}
                      transition={{ duration: 1, delay: idx * 0.1 }}
                      className="w-full bg-aureve-gold/40 rounded-t-lg group-hover:bg-aureve-gold transition-colors"
                    />
                    {/* Intentional Bar */}
                    <motion.div 
                      initial={{ height: 0 }}
                      animate={{ height: `${item.intentional}%` }}
                      transition={{ duration: 1, delay: 0.2 + idx * 0.1 }}
                      className="w-full bg-aureve-charcoal rounded-t-lg group-hover:opacity-80 transition-opacity"
                    />
                  </div>
                  <span className="text-[10px] uppercase tracking-widest text-aureve-taupe font-bold">{item.day}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Insights Section */}
          <div className="space-y-6">
            <h3 className="font-serif text-2xl text-aureve-charcoal">Style Psychology</h3>
            <div className="space-y-4">
              <div className="p-4 bg-aureve-cream/50 rounded-2xl border border-aureve-gray/30 space-y-2">
                <div className="flex items-center gap-2 text-aureve-gold">
                   <Zap className="h-4 w-4" />
                   <span className="text-[10px] uppercase tracking-widest font-bold">Primary Trigger</span>
                </div>
                <p className="text-sm text-aureve-charcoal">
                  Emotional shopping peaks on <span className="font-bold">Fridays</span>, likely linked to end-of-week stress release.
                </p>
              </div>

              <div className="p-4 bg-aureve-charcoal text-white rounded-2xl space-y-2">
                <div className="flex items-center gap-2 text-aureve-gold">
                   <Heart className="h-4 w-4" />
                   <span className="text-[10px] uppercase tracking-widest font-bold">Aesthetic Alignment</span>
                </div>
                <p className="text-sm text-aureve-cream/80">
                  92% of intentional purchases this month perfectly match your <span className="text-white font-semibold">Minimalist Sanctuary</span> goal.
                </p>
              </div>
            </div>
            
            <button className="w-full py-4 border border-aureve-gray/30 rounded-full text-[10px] uppercase tracking-[0.2em] font-bold text-aureve-taupe hover:text-aureve-charcoal hover:border-aureve-charcoal transition-all">
               View Behavioral Deep-Dive
            </button>
          </div>
        </div>
      </GlassCard>
    </div>
  );
}
