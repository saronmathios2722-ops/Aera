"use client";

import { motion } from "framer-motion";
import { Smile, TrendingUp, Info } from "lucide-react";
import GlassCard from "@/components/ui/GlassCard";

const confidencePoints = [
  { x: 0, y: 40 },
  { x: 10, y: 45 },
  { x: 20, y: 35 },
  { x: 30, y: 60 },
  { x: 40, y: 55 },
  { x: 50, y: 75 },
  { x: 60, y: 70 },
  { x: 70, y: 85 },
  { x: 80, y: 80 },
  { x: 90, y: 95 },
  { x: 100, y: 90 },
];

export default function ConfidenceTracker() {
  const pathData = confidencePoints
    .map((p, i) => `${i === 0 ? "M" : "L"} ${p.x}% ${100 - p.y}%`)
    .join(" ");

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-2">
        <Smile className="h-5 w-5 text-aureve-gold" />
        <h2 className="text-xs uppercase tracking-[0.2em] font-semibold text-aureve-taupe">Confidence Sanctuary</h2>
      </div>

      <GlassCard className="p-10 !rounded-[2.5rem] bg-white relative overflow-hidden">
        <div className="relative z-10 grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          <div className="space-y-6">
            <div className="space-y-2">
              <h3 className="font-serif text-4xl text-aureve-charcoal">Style Confidence</h3>
              <p className="text-sm text-aureve-taupe uppercase tracking-widest">30-Day Aesthetic Trend</p>
            </div>
            
            <div className="flex items-end gap-4">
              <span className="text-6xl font-serif text-aureve-gold font-medium">92%</span>
              <div className="mb-2 flex items-center gap-1 text-green-500 font-bold text-xs uppercase tracking-widest">
                <TrendingUp className="h-4 w-4" />
                <span>+14% this month</span>
              </div>
            </div>

            <p className="text-sm text-aureve-taupe leading-relaxed max-w-sm">
              Your confidence correlates strongly with wearing <span className="text-aureve-charcoal font-bold">Structured Silhouettes</span> and <span className="text-aureve-charcoal font-bold">Natural Fibers</span>.
            </p>

            <div className="flex gap-4">
              <div className="flex items-center gap-2">
                 <div className="h-3 w-3 rounded-full bg-aureve-gold" />
                 <span className="text-[10px] uppercase tracking-widest text-aureve-taupe font-bold">Confidence</span>
              </div>
            </div>
          </div>

          <div className="h-64 w-full relative pt-10">
            <svg className="w-full h-full overflow-visible" preserveAspectRatio="none">
              {/* Grid Lines */}
              {[0, 25, 50, 75, 100].map((line) => (
                <line
                  key={line}
                  x1="0"
                  y1={`${line}%`}
                  x2="100%"
                  y2={`${line}%`}
                  stroke="#E5E5E5"
                  strokeWidth="1"
                  strokeDasharray="4 4"
                />
              ))}
              
              {/* Area under the line */}
              <motion.path
                initial={{ pathLength: 0, opacity: 0 }}
                animate={{ pathLength: 1, opacity: 0.1 }}
                transition={{ duration: 2, ease: "easeInOut" }}
                d={`${pathData} L 100% 100% L 0% 100% Z`}
                fill="url(#gradient-gold)"
              />

              {/* The Line */}
              <motion.path
                initial={{ pathLength: 0 }}
                animate={{ pathLength: 1 }}
                transition={{ duration: 2, ease: "easeInOut" }}
                d={pathData}
                fill="none"
                stroke="#C5A059"
                strokeWidth="3"
                strokeLinecap="round"
                strokeLinejoin="round"
              />

              <defs>
                <linearGradient id="gradient-gold" x1="0%" y1="0%" x2="0%" y2="100%">
                  <stop offset="0%" stopColor="#C5A059" stopOpacity="1" />
                  <stop offset="100%" stopColor="#C5A059" stopOpacity="0" />
                </linearGradient>
              </defs>
            </svg>
            
            <div className="flex justify-between mt-4">
               <span className="text-[9px] uppercase tracking-widest text-aureve-taupe font-bold">Day 1</span>
               <span className="text-[9px] uppercase tracking-widest text-aureve-taupe font-bold">Day 30</span>
            </div>
          </div>
        </div>

        {/* Abstract Blur */}
        <div className="absolute top-0 right-0 -mr-20 -mt-20 h-64 w-64 bg-aureve-gold/5 blur-[100px] rounded-full" />
      </GlassCard>
    </div>
  );
}
