"use client";

import { motion } from "framer-motion";
import { PiggyBank, ArrowDownRight, ShieldCheck, Sparkles } from "lucide-react";
import GlassCard from "@/components/ui/GlassCard";

const avoidedPurchases = [
  { name: "Fast-Fashion Coat", price: 120, date: "3 days ago", reason: "Material quality gap" },
  { name: "Impulse Mesh Top", price: 45, date: "1 week ago", reason: "Doesn't match capsule goals" },
  { name: "Trendy Leather Boots", price: 280, date: "2 weeks ago", reason: "Already own similar digital twin" },
];

export default function SavingsImpact() {
  const totalSaved = avoidedPurchases.reduce((acc, curr) => acc + curr.price, 0);

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-2">
        <PiggyBank className="h-5 w-5 text-aureve-gold" />
        <h2 className="text-xs uppercase tracking-[0.2em] font-semibold text-aureve-taupe">Financial Sanctuary</h2>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <GlassCard className="p-8 !rounded-[2.5rem] bg-aureve-charcoal text-white flex flex-col justify-between overflow-hidden relative">
          <div className="relative z-10 space-y-2">
            <p className="text-[10px] uppercase tracking-[0.3em] text-aureve-gold font-bold">Avoided Spending</p>
            <h3 className="font-serif text-5xl font-medium">${totalSaved}</h3>
            <div className="flex items-center gap-2 text-green-400 text-xs font-bold uppercase tracking-widest pt-2">
               <ShieldCheck className="h-4 w-4" />
               <span>Reinvested in Quality</span>
            </div>
          </div>

          <div className="relative z-10 pt-12">
             <p className="text-sm text-aureve-cream/60 leading-relaxed italic">
               "By pausing these 3 purchases, you've saved enough for a lifetime investment piece from your 'Dream Wardrobe' wishlist."
             </p>
          </div>

          {/* Abstract glow */}
          <div className="absolute top-0 right-0 -mr-16 -mt-16 h-48 w-48 bg-aureve-gold/20 blur-[80px] rounded-full" />
        </GlassCard>

        <div className="lg:col-span-2 space-y-4">
           {avoidedPurchases.map((item, idx) => (
             <motion.div
               key={idx}
               initial={{ opacity: 0, x: 20 }}
               animate={{ opacity: 1, x: 0 }}
               transition={{ delay: idx * 0.1 }}
             >
               <GlassCard className="p-6 !rounded-2xl flex items-center justify-between group hover:border-aureve-gold/50 transition-colors">
                 <div className="flex items-center gap-4">
                   <div className="h-12 w-12 rounded-full bg-aureve-cream flex items-center justify-center text-aureve-gold group-hover:scale-110 transition-transform">
                      <ArrowDownRight className="h-5 w-5" />
                   </div>
                   <div>
                     <h4 className="text-sm font-semibold text-aureve-charcoal">{item.name}</h4>
                     <div className="flex items-center gap-2 text-[10px] uppercase tracking-widest text-aureve-taupe font-bold">
                        <span>{item.date}</span>
                        <span>•</span>
                        <span className="text-aureve-gold">{item.reason}</span>
                     </div>
                   </div>
                 </div>
                 <div className="text-right">
                   <p className="text-sm font-bold text-aureve-charcoal">${item.price}</p>
                   <p className="text-[10px] uppercase tracking-widest text-green-600 font-bold">Saved</p>
                 </div>
               </GlassCard>
             </motion.div>
           ))}

           <div className="pt-4 flex justify-center">
             <button className="flex items-center gap-2 text-[10px] uppercase tracking-[0.2em] font-bold text-aureve-taupe hover:text-aureve-charcoal transition-colors">
                <Sparkles className="h-4 w-4" />
                Analyze New Consideration
             </button>
           </div>
        </div>
      </div>
    </div>
  );
}
