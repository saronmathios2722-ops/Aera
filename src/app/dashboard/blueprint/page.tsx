"use client";

import { motion } from "framer-motion";
import { useState, useEffect } from "react";
import { Palette, Layers, Scissors, ShieldCheck, Zap, Info } from "lucide-react";
import GlassCard from "@/components/ui/GlassCard";
import Image from "next/image";

export default function BlueprintPage() {
  const [data, setData] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchBlueprint();
  }, []);

  const fetchBlueprint = async () => {
    try {
      const response = await fetch("/api/dashboard");
      const result = await response.json();
      setData(result);
    } catch (error) {
      console.error("Failed to fetch blueprint", error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-[60vh] flex items-center justify-center">
        <motion.div 
          animate={{ rotate: 360 }}
          transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
          className="h-12 w-12 border-t-2 border-aureve-accent rounded-full"
        />
      </div>
    );
  }

  const palette = data?.style_blueprint?.palette || ["#F9F7F2", "#A89F91", "#1A1A1A", "#C5A059"];
  
  const DNAComponents = [
    { label: "Aesthetic Identity", value: data?.style_aesthetic || "Architectural Minimalist", icon: Palette },
    { label: "Core Silhouette", value: "Structured & Fluid", icon: Scissors },
    { label: "Material Preference", value: "Cashmere, Silk, Heavy Wool", icon: Layers },
    { label: "Intentionality Index", value: `${data?.spending_intentionality || 85}%`, icon: ShieldCheck },
  ];

  return (
    <div className="space-y-24">
      {/* Header Section */}
      <section className="relative overflow-hidden">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 items-end">
          <div className="lg:col-span-8 space-y-8">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
            >
              <h2 className="text-[10px] uppercase tracking-[1em] text-aureve-accent font-black mb-6">Identity Mapping</h2>
              <h1 className="text-7xl md:text-8xl lg:text-9xl font-serif text-aureve-charcoal leading-[0.85] tracking-tighter italic font-light">
                Style <br />
                <span className="not-italic">Blueprint.</span>
              </h1>
            </motion.div>
            
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.6, duration: 1 }}
              className="text-xl text-aureve-muted font-light max-w-2xl leading-relaxed"
            >
              The encoded essence of your wardrobe. This DNA serves as the <span className="text-aureve-charcoal font-medium italic">mathematical foundation</span> for every curation and acquisition decision made within Aera.
            </motion.p>
          </div>

          <div className="lg:col-span-4 flex justify-end">
             <motion.div 
               animate={{ rotate: 360 }}
               transition={{ duration: 60, repeat: Infinity, ease: "linear" }}
               className="h-64 w-64 rounded-full border border-dashed border-aureve-accent/20 flex items-center justify-center relative"
             >
                <div className="absolute inset-0 bg-gradient-to-tr from-aureve-accent/5 to-transparent rounded-full" />
                <Palette className="h-12 w-12 text-aureve-accent opacity-30" strokeWidth={1} />
             </motion.div>
          </div>
        </div>
      </section>

      {/* DNA Cards */}
      <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
        {DNAComponents.map((comp, i) => (
          <GlassCard key={comp.label} className="p-10 space-y-6" delay={i * 0.1}>
            <div className="h-12 w-12 rounded-2xl bg-aureve-accent/10 flex items-center justify-center text-aureve-accent">
               <comp.icon size={20} strokeWidth={1.5} />
            </div>
            <div>
               <p className="text-[9px] uppercase tracking-widest text-aureve-muted font-bold mb-2">{comp.label}</p>
               <h4 className="text-xl font-serif text-aureve-charcoal italic">{comp.value}</h4>
            </div>
          </GlassCard>
        ))}
      </section>

      {/* Color Sanctuary Section */}
      <section className="grid grid-cols-1 lg:grid-cols-12 gap-16 items-start">
        <div className="lg:col-span-5 space-y-12">
          <div className="space-y-4 px-2">
            <h2 className="text-[10px] uppercase tracking-[1em] text-aureve-accent font-black">Harmonics</h2>
            <h3 className="text-5xl font-serif text-aureve-charcoal italic font-light">Color Palette</h3>
          </div>
          <p className="text-lg text-aureve-muted font-light leading-relaxed">
            Your sanctuary is anchored by these tones. They are designed to create <span className="text-aureve-charcoal italic">frictionless versatility</span>, allowing every artifact to coexist in effortless harmony.
          </p>
          <div className="flex gap-4">
             <div className="h-4 w-4 rounded-full bg-aureve-accent animate-pulse" />
             <span className="text-[10px] uppercase tracking-widest text-aureve-muted font-bold">Currently Optimized</span>
          </div>
        </div>

        <div className="lg:col-span-7">
           <div className="flex h-[400px] w-full rounded-[4rem] overflow-hidden shadow-2xl border border-white/40">
              {palette.map((color: string, i: number) => (
                <motion.div
                  key={color}
                  initial={{ flex: 0 }}
                  animate={{ flex: 1 }}
                  transition={{ delay: 0.5 + (i * 0.1), duration: 1.5, ease: [0.16, 1, 0.3, 1] }}
                  className="relative group cursor-pointer"
                  style={{ backgroundColor: color }}
                >
                  <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                     <span className="text-white font-mono text-xs uppercase tracking-widest">{color}</span>
                  </div>
                </motion.div>
              ))}
           </div>
        </div>
      </section>

      {/* Silhouette & Architecture */}
      <section className="space-y-12">
        <div className="space-y-4 px-2">
          <h2 className="text-[10px] uppercase tracking-[1em] text-aureve-accent font-black">Form</h2>
          <h3 className="text-5xl font-serif text-aureve-charcoal italic font-light">Silhouette Manifesto</h3>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
           <GlassCard className="p-0 overflow-hidden group">
              <div className="grid grid-cols-2">
                 <div className="relative aspect-square">
                    <Image src="https://images.unsplash.com/photo-1594932224010-74f43a183503?q=80&w=600&auto=format&fit=crop" alt="Structured" fill className="object-cover group-hover:scale-105 transition-transform duration-1000" />
                 </div>
                 <div className="p-10 flex flex-col justify-center space-y-6">
                    <h4 className="text-2xl font-serif italic">Structured Armor</h4>
                    <p className="text-sm text-aureve-muted font-light leading-relaxed">
                      Blazers and trousers with sharp lines that project authority and internal order.
                    </p>
                    <div className="flex gap-2">
                       <span className="text-[8px] uppercase tracking-widest font-black text-aureve-accent">Primary</span>
                    </div>
                 </div>
              </div>
           </GlassCard>

           <GlassCard className="p-0 overflow-hidden group">
              <div className="grid grid-cols-2">
                 <div className="relative aspect-square">
                    <Image src="https://images.unsplash.com/photo-1434389677669-e08b4cac3105?q=80&w=600&auto=format&fit=crop" alt="Fluid" fill className="object-cover group-hover:scale-105 transition-transform duration-1000" />
                 </div>
                 <div className="p-10 flex flex-col justify-center space-y-6">
                    <h4 className="text-2xl font-serif italic">Fluid Grace</h4>
                    <p className="text-sm text-aureve-muted font-light leading-relaxed">
                      Soft knits and silks that move with the body, expressing ease and vulnerability.
                    </p>
                    <div className="flex gap-2">
                       <span className="text-[8px] uppercase tracking-widest font-black text-aureve-accent">Secondary</span>
                    </div>
                 </div>
              </div>
           </GlassCard>
        </div>
      </section>

      {/* AI Intelligence Callout */}
      <section className="bg-aureve-charcoal rounded-[5rem] p-20 md:p-32 relative overflow-hidden">
         <div className="absolute top-0 right-0 h-[600px] w-[600px] bg-aureve-accent/10 blur-[120px]" />
         <div className="relative z-10 max-w-2xl space-y-12">
            <div className="space-y-4">
              <h2 className="text-[10px] uppercase tracking-[1em] text-aureve-accent font-black">Style Intelligence</h2>
              <h3 className="text-6xl font-serif text-white italic font-light leading-tight">DNA Evolution.</h3>
            </div>
            
            <p className="text-xl text-white/50 font-light leading-relaxed">
              Your Blueprint is not static. It learns from your <span className="text-white italic">Confidence Logs</span> and wardrobe utilization patterns to evolve with your personal growth.
            </p>
            
            <div className="flex items-center gap-6 text-aureve-accent">
               <Zap size={24} />
               <span className="text-[10px] uppercase tracking-[0.4em] font-black">Syncing with current wardrobe...</span>
            </div>
         </div>
      </section>
    </div>
  );
}
