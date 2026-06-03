"use client";

import { motion } from "framer-motion";
import { X, Sparkles, RefreshCw, Shirt, Scissors, Footprints } from "lucide-react";
import { useState } from "react";
import GlassCard from "@/components/ui/GlassCard";
import Image from "next/image";

interface CapsuleGeneratorProps {
  onClose: () => void;
}

export default function CapsuleGenerator({ onClose }: CapsuleGeneratorProps) {
  const [isGenerating, setIsGenerating] = useState(false);
  const [capsule, setCapsule] = useState<any[] | null>(null);

  const handleGenerate = async () => {
    setIsGenerating(true);
    setCapsule(null);
    try {
      const response = await fetch("/api/capsule", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ theme: "travel" }),
      });
      const data = await response.json();
      if (response.ok) {
        setCapsule(data.capsule);
      }
    } catch (error) {
      console.error("Capsule generation failed", error);
    } finally {
      setIsGenerating(false);
    }
  };

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-6 bg-aureve-charcoal/40 backdrop-blur-md">
      <motion.div
        initial={{ opacity: 0, scale: 0.9, y: 30 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        className="w-full max-w-4xl max-h-[90vh] overflow-hidden flex flex-col"
      >
        <GlassCard className="relative p-12 !rounded-[3rem] bg-white/90 border-none shadow-2xl flex-1 flex flex-col overflow-hidden">
          <button 
            onClick={onClose}
            className="absolute top-8 right-8 text-aureve-taupe hover:text-aureve-charcoal transition-colors z-20"
          >
            <X className="h-6 w-6" />
          </button>

          <div className="flex-1 flex flex-col items-center justify-center text-center space-y-12">
            {!capsule && !isGenerating && (
               <div className="max-w-md space-y-6">
                 <div className="h-20 w-20 rounded-full bg-aureve-cream flex items-center justify-center text-aureve-gold mx-auto">
                    <Sparkles className="h-10 w-10" />
                 </div>
                 <h3 className="font-serif text-4xl text-aureve-charcoal">AI Capsule Architect</h3>
                 <p className="text-aureve-taupe leading-relaxed">
                   We'll select 8-12 pieces from your wardrobe to create maximum versatility with minimum effort. 
                   Perfect for travel, work weeks, or seasonal shifts.
                 </p>
                 <button 
                   onClick={handleGenerate}
                   className="bg-aureve-charcoal text-white px-12 py-5 rounded-full font-medium tracking-wide shadow-floating hover:bg-aureve-gold transition-all"
                 >
                   Architect My Capsule
                 </button>
               </div>
            )}

            {isGenerating && (
               <div className="space-y-8">
                  <RefreshCw className="h-16 w-16 text-aureve-gold animate-spin mx-auto" />
                  <div className="space-y-2">
                    <p className="text-xl font-serif text-aureve-charcoal animate-pulse">Running permutation analysis...</p>
                    <p className="text-xs uppercase tracking-widest text-aureve-taupe">Matching silhouettes and color palettes</p>
                  </div>
               </div>
            )}

            {capsule && (
               <div className="w-full space-y-12 overflow-y-auto no-scrollbar pb-6">
                 <div className="space-y-2">
                   <h3 className="font-serif text-4xl text-aureve-charcoal">The "London Trip" Capsule</h3>
                   <p className="text-sm text-aureve-taupe uppercase tracking-widest">48 possible combinations identified</p>
                 </div>

                 <div className="grid grid-cols-2 md:grid-cols-4 gap-6 px-4">
                    {capsule.map((item, idx) => (
                      <motion.div 
                        key={item.id}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: idx * 0.1 }}
                        className="space-y-3"
                      >
                        <div className="relative aspect-square rounded-2xl overflow-hidden bg-aureve-cream border border-aureve-gray/30 shadow-soft">
                           <Image src={item.image_url || item.image} alt={item.name} fill className="object-cover" />
                        </div>
                        <p className="text-[10px] font-bold uppercase tracking-widest text-aureve-charcoal">{item.name}</p>
                      </motion.div>
                    ))}
                 </div>

                 <div className="flex gap-4 justify-center">
                    <button className="text-xs uppercase tracking-widest font-bold text-aureve-taupe hover:text-aureve-charcoal px-8 py-4">Save to Moodboard</button>
                    <button className="bg-aureve-charcoal text-white px-10 py-4 rounded-full text-xs uppercase tracking-widest font-bold shadow-soft hover:bg-aureve-gold transition-all">Export Lookbook</button>
                 </div>
               </div>
            )}
          </div>
        </GlassCard>
      </motion.div>
    </div>
  );
}
