"use client";

import DashboardLayout from "@/components/layout/DashboardLayout";
import GlassCard from "@/components/ui/GlassCard";
import { useEffect, useState } from "react";
import { Sparkles, Heart, Clock, ArrowRight, Plus, Loader2 } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";

export default function OutfitsPage() {
  const [outfits, setOutfits] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchOutfits() {
      try {
        const response = await fetch("/api/outfits");
        const data = await response.json();
        setOutfits(data);
      } catch (error) {
        console.error("Failed to fetch outfits", error);
      } finally {
        setLoading(false);
      }
    }
    fetchOutfits();
  }, []);

  return (
    <DashboardLayout userName="Alex">
      <div className="space-y-12">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-8">
          <div className="space-y-2">
            <h2 className="font-serif text-5xl text-aureve-charcoal">Your Looks</h2>
            <p className="text-sm text-aureve-taupe uppercase tracking-[0.3em] font-medium">Curated Ensembles & Daily Suggestions</p>
          </div>
          
          <Link href="/dashboard/outfits/new">
            <button className="bg-aureve-charcoal text-white px-10 py-5 rounded-full text-[10px] uppercase tracking-widest font-bold shadow-soft hover:bg-aureve-gold hover:shadow-floating transition-all flex items-center gap-3">
               <Plus className="h-4 w-4" /> Create New Look
            </button>
          </Link>
        </div>

        {loading ? (
          <div className="flex flex-col items-center justify-center py-20">
             <Loader2 className="h-10 w-10 text-aureve-gold animate-spin" />
             <p className="mt-4 text-aureve-taupe font-serif italic text-lg">Revealing your collections...</p>
          </div>
        ) : outfits.length === 0 ? (
          <div className="py-20 text-center space-y-8">
             <div className="h-24 w-24 rounded-full bg-aureve-white flex items-center justify-center mx-auto shadow-soft text-aureve-gray/30">
                <Sparkles className="h-10 w-10" />
             </div>
             <div className="space-y-2">
                <h3 className="font-serif text-3xl text-aureve-charcoal">No looks curated yet</h3>
                <p className="text-aureve-taupe max-w-md mx-auto leading-relaxed">Start building your digital wardrobe sanctuary by creating your first ensemble.</p>
             </div>
             <Link href="/dashboard/outfits/new" className="inline-block">
                <button className="bg-aureve-charcoal text-white px-12 py-4 rounded-full text-[10px] uppercase tracking-widest font-bold">Begin Curating</button>
             </Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-10">
            {outfits.map((outfit, idx) => (
              <motion.div
                key={outfit.id}
                initial={{ opacity: 0, scale: 0.95, y: 20 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                transition={{ delay: idx * 0.05, duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
              >
                <GlassCard className="group p-0 overflow-hidden !rounded-[3rem] h-full flex flex-col border-none shadow-soft hover:shadow-floating transition-all duration-700 bg-white/40 backdrop-blur-sm">
                   <div className="relative aspect-[3/4] bg-aureve-cream overflow-hidden">
                      <Image 
                        src={`https://images.unsplash.com/photo-1490481651871-ab68de25d43d?auto=format&fit=crop&q=80&w=600`} 
                        alt={outfit.name} 
                        fill 
                        className="object-cover opacity-90 group-hover:scale-110 transition-transform duration-1000"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-aureve-charcoal/70 via-transparent to-transparent opacity-60 group-hover:opacity-80 transition-opacity" />
                      
                      {outfit.is_daily_curation === 1 && (
                        <div className="absolute top-8 left-8 bg-aureve-gold/90 text-white px-4 py-1.5 rounded-full text-[8px] uppercase tracking-[0.2em] font-bold backdrop-blur-md shadow-soft">
                           Daily Suggestion
                        </div>
                      )}

                      <div className="absolute bottom-8 left-8 right-8">
                         <h3 className="font-serif text-3xl text-white leading-tight">{outfit.name}</h3>
                      </div>
                   </div>
                   <div className="p-8 flex-1 flex flex-col justify-between">
                      <div className="space-y-6">
                        <p className="text-sm text-aureve-charcoal/70 leading-relaxed line-clamp-2 italic font-medium">
                           "{outfit.occasion || "A thoughtfully curated combination."}"
                        </p>
                        <div className="flex items-center justify-between">
                           <div className="flex items-center gap-2">
                             <div className="h-10 w-10 rounded-2xl bg-aureve-cream flex items-center justify-center text-[10px] text-aureve-gold font-bold shadow-sm border border-aureve-gold/10">
                                {outfit.items.length}
                             </div>
                             <span className="text-[10px] text-aureve-taupe uppercase tracking-[0.2em] font-bold">Pieces</span>
                           </div>
                           <div className="flex items-center gap-3">
                              <button className="p-2.5 rounded-xl bg-white/50 text-aureve-taupe hover:text-red-400 hover:bg-red-50 transition-all duration-300">
                                 <Heart className={`h-4 w-4 ${outfit.is_favorite ? 'fill-red-400 text-red-400' : ''}`} />
                              </button>
                           </div>
                        </div>
                      </div>
                      
                      <div className="mt-10 pt-8 border-t border-aureve-gray/20 flex items-center justify-between">
                         <div className="flex items-center gap-2 text-aureve-taupe">
                            <Clock className="h-3.5 w-3.5" />
                            <span className="text-[8px] uppercase tracking-widest font-bold">Saved {new Date(outfit.created_at).toLocaleDateString()}</span>
                         </div>
                         <button className="flex items-center gap-2 text-[10px] uppercase tracking-widest font-bold text-aureve-charcoal hover:text-aureve-gold transition-colors group/btn">
                            View Look <ArrowRight className="h-3.5 w-3.5 group-hover/btn:translate-x-1 transition-transform" />
                         </button>
                      </div>
                   </div>
                </GlassCard>
              </motion.div>
            ))}

            {/* Empty state / CTA */}
            <Link href="/dashboard/outfits/new" className="h-full">
              <motion.div 
                whileHover={{ scale: 1.02 }}
                className="h-full min-h-[500px] border-2 border-dashed border-aureve-gray/20 rounded-[3rem] flex flex-col items-center justify-center p-12 space-y-8 group hover:border-aureve-gold hover:bg-aureve-gold/5 transition-all duration-500 cursor-pointer"
              >
                 <div className="h-20 w-20 rounded-full bg-white flex items-center justify-center text-aureve-taupe group-hover:text-aureve-gold group-hover:scale-110 shadow-soft transition-all duration-500">
                    <Plus className="h-10 w-10" />
                 </div>
                 <div className="text-center space-y-2">
                    <p className="text-aureve-charcoal font-serif text-2xl group-hover:text-aureve-gold transition-colors">Curate Ensemble</p>
                    <p className="text-[10px] text-aureve-taupe uppercase tracking-[0.2em] font-bold opacity-60">Design a new look</p>
                 </div>
              </motion.div>
            </Link>
          </div>
        )}
      </div>
    </DashboardLayout>
  );
}
