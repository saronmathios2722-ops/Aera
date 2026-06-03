"use client";

import DashboardLayout from "@/components/layout/DashboardLayout";
import Moodboard from "@/components/inspiration/Moodboard";
import GapAnalysis from "@/components/inspiration/GapAnalysis";
import PinterestLink from "@/components/inspiration/PinterestLink";
import { motion } from "framer-motion";

export default function InspirationPage() {
  return (
    <div className="space-y-24">
      {/* Header Section - Editorial Style */}
      <section className="relative overflow-hidden">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 items-end">
          <div className="lg:col-span-8 space-y-8">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
            >
              <h2 className="text-[10px] uppercase tracking-[1em] text-aureve-accent font-black mb-6">Aesthetic Evolution</h2>
              <h1 className="text-7xl md:text-8xl lg:text-9xl font-serif text-aureve-charcoal leading-[0.85] tracking-tighter italic font-light">
                Inspiration <br />
                <span className="not-italic">Manifest.</span>
              </h1>
            </motion.div>
            
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.6, duration: 1 }}
              className="text-xl text-aureve-muted font-light max-w-2xl leading-relaxed"
            >
              A cinematic space to bridge the gap between your current essence and your <span className="text-aureve-charcoal font-medium">future silhouette</span>. 
              Connect your visual inspirations to reveal the architecture of your intentional wardrobe.
            </motion.p>
          </div>
          
          <div className="lg:col-span-4 flex justify-end">
             <motion.div 
               initial={{ opacity: 0, scale: 0.8 }}
               animate={{ opacity: 1, scale: 1 }}
               transition={{ delay: 0.8, duration: 1 }}
               className="h-48 w-48 rounded-full border border-aureve-accent/20 flex items-center justify-center p-4 relative group"
             >
                <div className="absolute inset-0 border border-aureve-accent/10 rounded-full animate-spin-slow" />
                <p className="text-[9px] uppercase tracking-[0.4em] text-aureve-accent font-black text-center">
                  Visual <br /> Synthesizer
                </p>
             </motion.div>
          </div>
        </div>
      </section>

      {/* Connection Layer */}
      <section className="grid grid-cols-1 xl:grid-cols-12 gap-16">
        <div className="xl:col-span-5">
          <PinterestLink />
        </div>
        <div className="xl:col-span-7">
           <div className="h-full bg-white/40 backdrop-blur-md border border-aureve-base/10 rounded-[3rem] p-12 flex flex-col justify-center">
              <h4 className="text-[10px] uppercase tracking-[0.5em] text-aureve-accent font-black mb-8">AI Synthesis Status</h4>
              <div className="space-y-8">
                 {[
                   { label: "Aesthetic Learning", progress: 92 },
                   { label: "Silhouette Detection", progress: 78 },
                   { label: "Color Palette Mapping", progress: 85 }
                 ].map((item, i) => (
                   <div key={item.label} className="space-y-4">
                      <div className="flex justify-between text-[10px] uppercase tracking-widest">
                         <span className="text-aureve-muted font-bold">{item.label}</span>
                         <span className="text-aureve-charcoal font-black">{item.progress}%</span>
                      </div>
                      <div className="h-[2px] w-full bg-aureve-base/10 rounded-full overflow-hidden">
                         <motion.div 
                           initial={{ width: 0 }}
                           animate={{ width: `${item.progress}%` }}
                           transition={{ delay: 1 + (i * 0.2), duration: 2, ease: [0.16, 1, 0.3, 1] }}
                           className="h-full bg-aureve-accent"
                         />
                      </div>
                   </div>
                 ))}
              </div>
           </div>
        </div>
      </section>

      {/* Gap Analysis Section */}
      <section>
        <div className="flex items-end justify-between px-2 mb-12">
          <div className="space-y-4">
            <h2 className="text-[10px] uppercase tracking-[1em] text-aureve-accent font-black">Style Variance</h2>
            <h3 className="text-5xl font-serif text-aureve-charcoal italic font-light">Gap Analysis</h3>
          </div>
        </div>
        <GapAnalysis />
      </section>

      {/* Visual Moodboard Section */}
      <section className="space-y-12">
        <div className="flex items-end justify-between px-2">
          <div className="space-y-4">
            <h2 className="text-[10px] uppercase tracking-[1em] text-aureve-accent font-black">Curated Imagery</h2>
            <h3 className="text-5xl font-serif text-aureve-charcoal italic font-light">Visual Sanctuary</h3>
          </div>
        </div>
        <Moodboard />
      </section>
      
      {/* Editorial Quote */}
      <section className="py-32 border-y border-aureve-base/10 flex justify-center">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.5 }}
          className="max-w-3xl text-center space-y-12"
        >
          <p className="font-serif text-5xl text-aureve-charcoal/80 italic font-light leading-snug">
            "Your style is the bridge between <br />
            the <span className="not-italic font-medium">inner self</span> and the <span className="not-italic font-medium">outer world</span>."
          </p>
          <div className="h-[1px] w-24 bg-aureve-accent/40 mx-auto" />
          <p className="text-[10px] uppercase tracking-[0.6em] text-aureve-muted font-bold">The Aera Philosophy</p>
        </motion.div>
      </section>
    </div>
  );
}
