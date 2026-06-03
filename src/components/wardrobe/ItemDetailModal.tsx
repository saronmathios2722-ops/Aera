"use client";

import { motion, AnimatePresence } from "framer-motion";
import { X, Heart, Share2, Ruler, Info, Sparkles, TrendingUp, ShieldCheck } from "lucide-react";
import Image from "next/image";
import GlassCard from "@/components/ui/GlassCard";

interface ItemDetailModalProps {
  item: any;
  onClose: () => void;
}

export default function ItemDetailModal({ item, onClose }: ItemDetailModalProps) {
  if (!item) return null;

  // Mock insights for the "Aera Insights" feature
  const insights = [
    { 
      label: "Style DNA Fit", 
      value: "94%", 
      description: "Matches your preference for structured silhouettes and neutral tones.",
      icon: Sparkles
    },
    { 
      label: "Versatility Index", 
      value: "High", 
      description: "Compatible with 12 existing pieces in your sanctuary.",
      icon: TrendingUp
    },
    { 
      label: "Intentionality", 
      value: "Verified", 
      description: "Aligned with your Q3 'Quiet Luxury' wardrobe evolution goal.",
      icon: ShieldCheck
    }
  ];

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-[100] flex items-center justify-center p-6 md:p-12 lg:p-24"
    >
      <div className="absolute inset-0 bg-aureve-charcoal/40 backdrop-blur-md" onClick={onClose} />
      
      <motion.div
        initial={{ y: 100, opacity: 0, scale: 0.95 }}
        animate={{ y: 0, opacity: 1, scale: 1 }}
        exit={{ y: 100, opacity: 0, scale: 0.95 }}
        transition={{ type: "spring", damping: 30, stiffness: 300 }}
        className="relative w-full max-w-7xl h-full max-h-[900px] bg-aureve-cream rounded-[4rem] overflow-hidden shadow-2xl flex flex-col lg:flex-row"
      >
        {/* Close Button */}
        <button 
          onClick={onClose}
          className="absolute top-10 right-10 z-50 h-14 w-14 rounded-full bg-white/20 backdrop-blur-md flex items-center justify-center text-aureve-charcoal hover:bg-white transition-all"
        >
          <X className="h-6 w-6" />
        </button>

        {/* Left: Image Sanctuary */}
        <div className="relative w-full lg:w-1/2 h-1/2 lg:h-full bg-white group">
          <Image
            src={item.image_url || item.image}
            alt={item.name}
            fill
            className="object-cover transition-transform duration-[3s] group-hover:scale-110"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-aureve-charcoal/20 to-transparent" />
          
          <div className="absolute bottom-12 left-12 flex gap-4">
             <button className="h-16 w-16 rounded-full bg-white/20 backdrop-blur-xl border border-white/30 flex items-center justify-center text-white hover:bg-white hover:text-aureve-charcoal transition-all">
                <Heart className="h-6 w-6" />
             </button>
             <button className="h-16 w-16 rounded-full bg-white/20 backdrop-blur-xl border border-white/30 flex items-center justify-center text-white hover:bg-white hover:text-aureve-charcoal transition-all">
                <Share2 className="h-6 w-6" />
             </button>
          </div>
        </div>

        {/* Right: Insights & Details */}
        <div className="w-full lg:w-1/2 h-1/2 lg:h-full overflow-y-auto no-scrollbar p-12 md:p-20 space-y-16 bg-aureve-cream/50 backdrop-blur-3xl">
          {/* Header */}
          <div className="space-y-4">
            <p className="text-[10px] uppercase tracking-[0.8em] text-aureve-accent font-black">{item.brand}</p>
            <h2 className="text-6xl font-serif text-aureve-charcoal italic leading-none">{item.name}</h2>
            <div className="flex items-center gap-6 pt-4">
               <div className="flex items-center gap-2">
                  <div className="h-3 w-3 rounded-full" style={{ backgroundColor: item.color === 'Cream' ? '#F9F7F2' : item.color === 'Charcoal' ? '#1A1A1A' : '#A89F91' }} />
                  <span className="text-[10px] uppercase tracking-widest text-aureve-muted font-bold">{item.color}</span>
               </div>
               <div className="h-1 w-1 rounded-full bg-aureve-base" />
               <span className="text-[10px] uppercase tracking-widest text-aureve-muted font-bold">{item.category}</span>
            </div>
          </div>

          {/* Aera Insights Section */}
          <section className="space-y-8">
            <div className="flex items-center gap-4">
               <div className="h-[1px] w-8 bg-aureve-accent" />
               <h3 className="text-[10px] uppercase tracking-[0.4em] text-aureve-accent font-black">Aera Insights</h3>
            </div>
            
            <div className="grid grid-cols-1 gap-6">
              {insights.map((insight, i) => (
                <motion.div
                  key={insight.label}
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.3 + (i * 0.1) }}
                  className="bg-white/40 border border-white p-8 rounded-[2rem] flex items-start gap-6 group hover:bg-white transition-all duration-700"
                >
                  <div className="h-12 w-12 rounded-xl bg-aureve-cream flex items-center justify-center text-aureve-accent shrink-0">
                    <insight.icon size={20} strokeWidth={1.5} />
                  </div>
                  <div className="space-y-2">
                    <div className="flex justify-between items-center">
                      <p className="text-[9px] uppercase tracking-widest text-aureve-muted font-bold">{insight.label}</p>
                      <span className="text-lg font-serif text-aureve-charcoal italic">{insight.value}</span>
                    </div>
                    <p className="text-sm text-aureve-muted font-light leading-relaxed">
                      {insight.description}
                    </p>
                  </div>
                </motion.div>
              ))}
            </div>
          </section>

          {/* Composition & Care */}
          <section className="space-y-8">
            <div className="flex items-center gap-4">
               <div className="h-[1px] w-8 bg-aureve-accent" />
               <h3 className="text-[10px] uppercase tracking-[0.4em] text-aureve-accent font-black">Artifact Composition</h3>
            </div>
            
            <div className="grid grid-cols-2 gap-8">
               <div className="space-y-2">
                  <p className="text-[8px] uppercase tracking-widest text-aureve-muted font-black opacity-50">Material</p>
                  <p className="text-lg font-serif text-aureve-charcoal">100% Italian Silk</p>
               </div>
               <div className="space-y-2">
                  <p className="text-[8px] uppercase tracking-widest text-aureve-muted font-black opacity-50">Source</p>
                  <p className="text-lg font-serif text-aureve-charcoal">Milan, Italy</p>
               </div>
               <div className="space-y-2">
                  <p className="text-[8px] uppercase tracking-widest text-aureve-muted font-black opacity-50">Care</p>
                  <p className="text-lg font-serif text-aureve-charcoal italic">Dry Clean Only</p>
               </div>
               <div className="space-y-2">
                  <p className="text-[8px] uppercase tracking-widest text-aureve-muted font-black opacity-50">Condition</p>
                  <div className="flex items-center gap-2">
                     <div className="h-1.5 w-1.5 rounded-full bg-green-500" />
                     <p className="text-lg font-serif text-aureve-charcoal">Pristine</p>
                  </div>
               </div>
            </div>
          </section>

          {/* Cost Per Wear Analytics */}
          <GlassCard className="p-10 bg-aureve-charcoal border-none relative overflow-hidden group">
             <div className="relative z-10 space-y-6">
                <div className="flex justify-between items-center">
                   <p className="text-[9px] uppercase tracking-[0.4em] text-aureve-accent font-black">Investment Analytics</p>
                   <TrendingUp className="text-aureve-accent h-5 w-5" />
                </div>
                <div className="flex items-baseline gap-2">
                   <span className="text-5xl font-serif text-white italic">$8.40</span>
                   <span className="text-[10px] uppercase tracking-widest text-white/40">Cost Per Wear</span>
                </div>
                <div className="h-[1px] w-full bg-white/10" />
                <div className="flex justify-between text-[10px] uppercase tracking-widest">
                   <span className="text-white/60">Purchase Price</span>
                   <span className="text-white">$420</span>
                </div>
                <div className="flex justify-between text-[10px] uppercase tracking-widest">
                   <span className="text-white/60">Total Wears</span>
                   <span className="text-white">50</span>
                </div>
             </div>
             <div className="absolute -bottom-10 -right-10 h-32 w-32 bg-aureve-accent/10 rounded-full blur-3xl group-hover:bg-aureve-accent/20 transition-all duration-1000" />
          </GlassCard>

          {/* Action Buttons */}
          <div className="flex gap-6 pt-10">
             <button className="flex-1 py-8 rounded-full bg-aureve-charcoal text-white text-[11px] uppercase tracking-[0.4em] font-black hover:bg-aureve-accent hover:text-aureve-charcoal transition-all duration-700">
                Log New Wear
             </button>
             <button className="px-12 py-8 rounded-full border border-aureve-charcoal/10 text-aureve-charcoal text-[11px] uppercase tracking-[0.4em] font-black hover:bg-aureve-base/10 transition-all">
                Edit Artifact
             </button>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
}
