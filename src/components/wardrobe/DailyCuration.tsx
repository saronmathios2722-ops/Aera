"use client";

import { motion } from "framer-motion";
import { 
  Shirt, 
  ArrowRight, 
  Loader2, 
  Sparkles,
  Calendar
} from "lucide-react";
import { useEffect, useState } from "react";
import GlassCard from "@/components/ui/GlassCard";
import Image from "next/image";

export default function DailyCuration() {
  const [curation, setCuration] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchCuration() {
      try {
        const response = await fetch("/api/outfits/curation");
        const data = await response.json();
        if (Array.isArray(data)) {
          setCuration(data);
        }
      } catch (error) {
        console.error("Failed to fetch curation", error);
      } finally {
        setLoading(false);
      }
    }
    fetchCuration();
  }, []);

  if (loading) {
    return (
      <div className="space-y-10">
        <div className="flex items-center gap-4">
           <div className="h-1px flex-1 bg-aureve-base/20" />
           <p className="text-[10px] uppercase tracking-[0.4em] text-aureve-muted font-bold">Assembling your ritual</p>
           <div className="h-1px flex-1 bg-aureve-base/20" />
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
           {[1, 2, 3].map(i => (
             <div key={i} className="aspect-[4/5] rounded-[3rem] bg-white/20 animate-pulse border border-white/40" />
           ))}
        </div>
      </div>
    );
  }

  if (curation.length === 0) return null;

  return (
    <div className="space-y-16">
      <div className="flex items-center justify-between border-b border-aureve-base/20 pb-8">
        <div className="flex items-center gap-6">
          <div className="h-12 w-12 bg-aureve-accent/10 rounded-2xl flex items-center justify-center text-aureve-accent">
            <Calendar className="h-6 w-6 stroke-[1.5]" />
          </div>
          <div>
            <h2 className="text-[10px] uppercase tracking-[0.5em] font-bold text-aureve-charcoal">The Morning Ritual</h2>
            <p className="text-sm text-aureve-muted/60 font-light italic mt-1 font-serif">Daily intent through texture and form</p>
          </div>
        </div>
        <button className="text-[9px] uppercase tracking-[0.4em] font-bold text-aureve-muted/60 hover:text-aureve-charcoal transition-colors">Past Rituals</button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
        {curation.map((outfit, idx) => (
          <motion.div
            key={outfit.id}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: idx * 0.2, duration: 1, ease: [0.16, 1, 0.3, 1] }}
          >
            <GlassCard className="group p-0 overflow-hidden !rounded-[3rem] h-full flex flex-col border-none shadow-soft hover:shadow-floating transition-all duration-700 bg-white/40" hover>
               <div className="relative aspect-[4/5] bg-aureve-cream overflow-hidden">
                  <div className="absolute inset-0 grid grid-cols-2 grid-rows-2 gap-2 p-4">
                     {outfit.items.slice(0, 4).map((item: any, i: number) => (
                       <div key={item.id} className="relative rounded-[1.75rem] overflow-hidden bg-white/50 shadow-sm border border-white/20">
                         <Image
                            src={item.image_url || `https://images.unsplash.com/photo-1490481651871-ab68de25d43d?auto=format&fit=crop&q=80&w=200`}
                            alt={item.name}
                            fill
                            className="object-cover opacity-95 group-hover:scale-110 transition-transform duration-[3000ms] ease-out"
                         />
                       </div>
                     ))}
                  </div>
                  <div className="absolute inset-0 bg-gradient-to-t from-aureve-charcoal/90 via-aureve-charcoal/20 to-transparent" />
                  <div className="absolute bottom-10 left-10 right-10">
                     <p className="text-[10px] uppercase tracking-[0.4em] text-aureve-accent/60 font-bold mb-3 italic">Ritual 0{idx + 1}</p>
                     <h3 className="font-serif text-4xl text-white leading-tight font-light italic">{outfit.name}</h3>
                  </div>
               </div>
               <div className="p-10 flex-1 flex flex-col justify-between">
                  <p className="text-base text-aureve-muted leading-relaxed line-clamp-3 font-light italic font-serif">
                     "{outfit.occasion}"
                  </p>
                  <div className="mt-10 pt-8 border-t border-aureve-base/20 flex items-center justify-between">
                    <div className="flex -space-x-3">
                       {outfit.items.slice(0, 3).map((item: any) => (
                         <div key={item.id} className="h-12 w-12 rounded-full border-[3px] border-white overflow-hidden bg-aureve-cream shadow-soft">
                            <Image src={item.image_url} alt={item.name} width={48} height={48} className="object-cover h-full w-full" />
                         </div>
                       ))}
                       {outfit.items.length > 3 && (
                         <div className="h-12 w-12 rounded-full border-[3px] border-white bg-aureve-charcoal flex items-center justify-center text-[10px] text-white font-bold shadow-soft">
                            +{outfit.items.length - 3}
                         </div>
                       )}
                    </div>
                    <button className="flex items-center gap-3 text-[10px] font-bold uppercase tracking-[0.4em] text-aureve-charcoal hover:text-aureve-accent transition-all group/btn">
                       Select <ArrowRight className="h-4 w-4 group-hover/btn:translate-x-2 transition-transform stroke-[1.5]" />
                    </button>
                  </div>
               </div>
            </GlassCard>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
