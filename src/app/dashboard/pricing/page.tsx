"use client";

import DashboardLayout from "@/components/layout/DashboardLayout";
import GlassCard from "@/components/ui/GlassCard";
import { Check, Shirt, Zap, ShieldCheck, Sparkles, ArrowRight } from "lucide-react";
import { motion } from "framer-motion";
import Link from "next/link";

const PLANS = [
  {
    id: "ritual",
    name: "The Ritual",
    desc: "A taste of intentionality for the casual curator.",
    price: "Free",
    features: [
      "Basic Wardrobe Digital Twin",
      "3 AI Outfit Curations per week",
      "Monthly Intentionality Score",
      "Manual Spending Entry"
    ],
    icon: Shirt,
    color: "text-aureve-muted",
    bg: "bg-white/40",
    btnText: "Stay with Ritual",
    current: true
  },
  {
    id: "sanctuary",
    name: "The Sanctuary",
    desc: "Deep immersion for those dedicated to their style soul.",
    price: "$9.99",
    sub: "per month",
    features: [
      "Unlimited AI Curations",
      "Smart Purchase Cooldown Sanctuary",
      "Fast Mode / Quick Curation access",
      "Behavioral Aroma Analytics",
      "Influencer Feed Sync (Pinterest/TikTok)",
      "Priority AI Styling support"
    ],
    icon: Sparkles,
    color: "text-aureve-accent",
    bg: "bg-aureve-black text-white",
    btnText: "Enter the Sanctuary",
    current: false,
    highlight: true
  }
];

export default function PricingPage() {
  return (
    <DashboardLayout>
      <div className="max-w-5xl mx-auto space-y-16 py-10">
        <div className="text-center space-y-4">
           <span className="text-[10px] font-black uppercase tracking-[0.5em] text-aureve-accent">Support the Ritual</span>
           <h1 className="font-serif text-5xl text-aureve-black italic font-light">Choose Your Curation</h1>
           <p className="text-aureve-muted/60 max-w-xl mx-auto font-light leading-relaxed">
             Select the level of care your wardrobe deserves. From simple daily rituals to deep AI-guided sanctuary support.
           </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
           {PLANS.map((plan, idx) => (
             <motion.div
               key={plan.id}
               initial={{ opacity: 0, y: 30 }}
               animate={{ opacity: 1, y: 0 }}
               transition={{ delay: idx * 0.2 }}
             >
                <GlassCard className={`relative h-full flex flex-col p-10 !rounded-[3rem] border-none shadow-floating ${plan.bg}`}>
                   {plan.highlight && (
                     <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-aureve-accent text-[#F9F7F2] px-6 py-2 rounded-full text-[10px] font-black uppercase tracking-[0.2em] shadow-soft">
                        Most Immersive
                     </div>
                   )}

                   <div className="mb-10">
                      <div className={`h-16 w-16 rounded-2xl bg-white/10 flex items-center justify-center mb-6 shadow-sm`}>
                         <plan.icon className={`h-8 w-8 ${plan.color}`} />
                      </div>
                      <h2 className="font-serif text-3xl italic mb-2">{plan.name}</h2>
                      <p className={`text-sm font-light ${plan.id === 'ritual' ? 'text-aureve-muted/60' : 'text-white/60'}`}>{plan.desc}</p>
                   </div>

                   <div className="mb-10 flex items-baseline gap-2">
                      <span className="text-5xl font-serif font-light">{plan.price}</span>
                      {plan.sub && <span className="text-[10px] font-black uppercase tracking-widest opacity-40">{plan.sub}</span>}
                   </div>

                   <div className="flex-1 space-y-6 mb-12">
                      {plan.features.map(feature => (
                        <div key={feature} className="flex items-start gap-4">
                           <div className={`mt-1 h-5 w-5 rounded-full flex items-center justify-center border ${plan.id === 'ritual' ? 'border-aureve-muted/20' : 'border-white/20'}`}>
                              <Check className={`h-3 w-3 ${plan.id === 'ritual' ? 'text-aureve-muted' : 'text-aureve-accent'}`} />
                           </div>
                           <span className="text-sm font-light italic opacity-80">{feature}</span>
                        </div>
                      ))}
                   </div>

                   <button className={`w-full py-6 rounded-full text-[10px] font-black uppercase tracking-[0.3em] transition-all flex items-center justify-center gap-3 ${plan.id === 'ritual' ? 'bg-aureve-muted/5 text-aureve-muted hover:bg-aureve-muted/10' : 'bg-aureve-accent text-white hover:scale-[1.02] shadow-soft'}`}>
                      {plan.btnText} <ArrowRight className="h-4 w-4" />
                   </button>
                </GlassCard>
             </motion.div>
           ))}
        </div>

        <div className="pt-10 border-t border-aureve-muted/10 text-center space-y-6">
           <div className="flex items-center justify-center gap-10">
              <div className="flex items-center gap-3">
                 <ShieldCheck className="h-5 w-5 text-aureve-accent" />
                 <span className="text-[9px] font-black uppercase tracking-widest text-aureve-muted/40">Secure Payments</span>
              </div>
              <div className="flex items-center gap-3">
                 <Zap className="h-5 w-5 text-aureve-accent" />
                 <span className="text-[9px] font-black uppercase tracking-widest text-aureve-muted/40">Instant Activation</span>
              </div>
           </div>
           <p className="text-[9px] text-aureve-muted/20 uppercase tracking-[0.5em]">Taxes may apply based on your sanctuary location.</p>
        </div>
      </div>
    </DashboardLayout>
  );
}
