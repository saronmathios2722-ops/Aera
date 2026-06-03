"use client";

import DashboardLayout from "@/components/layout/DashboardLayout";
import GlassCard from "@/components/ui/GlassCard";
import { motion } from "framer-motion";
import { ShoppingBag, ArrowUpRight, ShieldCheck, Sparkles, Clock } from "lucide-react";
import Image from "next/image";
import { useState } from "react";
import { useDiscovery } from "@/hooks/useDiscovery";
import { usePurchaseIntercept } from "@/hooks/usePurchaseIntercept";

const shopItems = [
  {
    id: "s1",
    name: "Lemaire Croissant Bag",
    price: 1200,
    vibe: "Iconic Minimalist",
    image: "https://images.unsplash.com/photo-1548036328-c9fa89d128fa?q=80&w=800",
    description: "A sculptural masterpiece that balances utility with architectural elegance."
  },
  {
    id: "s2",
    name: "The Row Oversized Coat",
    price: 3400,
    vibe: "Quiet Luxury",
    image: "https://images.unsplash.com/photo-1591047139829-d91aecb6caea?q=80&w=800",
    description: "Double-faced cashmere that defines the silhouette of modern power."
  },
  {
    id: "s3",
    name: "Toteme Silk Scarf",
    price: 250,
    vibe: "Subtle Accent",
    image: "https://images.unsplash.com/photo-1601924994987-69e26d50dc26?q=80&w=800",
    description: "Geometric patterns printed on the finest silk twill."
  },
  {
    id: "s4",
    name: "Jil Sander Leather Loafers",
    price: 790,
    vibe: "Structured Sole",
    image: "https://images.unsplash.com/photo-1595950653106-6c9ebd614d3a?q=80&w=800",
    description: "Blunt-toed loafers that ground a minimalist wardrobe with conviction."
  }
];

export default function ShopPage() {
  const { logDiscovery } = useDiscovery();
  const { intercept, isIntercepting, interceptResult, reset } = usePurchaseIntercept();
  const [activeItem, setActiveItem] = useState<any>(null);

  const handleDiscovery = async (item: any) => {
    const discoveryId = await logDiscovery({
      itemName: item.name,
      imageUrl: item.image
    });
    return discoveryId;
  };

  const handlePurchaseAttempt = async (item: any) => {
    setActiveItem(item);
    const discoveryId = await handleDiscovery(item);
    await intercept({
      itemName: item.name,
      price: item.price,
      imageUrl: item.image,
      discoveryId: discoveryId
    });
  };

  return (
    <div className="space-y-24">
      <section className="relative overflow-hidden">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 items-end">
          <div className="lg:col-span-8 space-y-8">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
            >
              <h2 className="text-[10px] uppercase tracking-[1em] text-aureve-accent font-black mb-6">Curated Commerce</h2>
              <h1 className="text-7xl md:text-8xl lg:text-9xl font-serif text-aureve-charcoal leading-[0.85] tracking-tighter italic font-light">
                Intentional <br />
                <span className="not-italic">Selection.</span>
              </h1>
            </motion.div>
            
            <p className="text-xl text-aureve-muted font-light max-w-2xl leading-relaxed">
              Every acquisition should be a conscious dialogue between your needs and your aspirations. 
              Our <span className="text-aureve-charcoal font-medium">Smart Intercept</span> system ensures each piece aligns with your Style DNA.
            </p>
          </div>
        </div>
      </section>

      <section className="grid grid-cols-1 md:grid-cols-2 gap-12">
        {shopItems.map((item, idx) => (
          <motion.div
            key={item.id}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: idx * 0.1, duration: 1 }}
          >
            <GlassCard className="group p-0 overflow-hidden !rounded-[3rem] border-none shadow-soft hover:shadow-floating transition-all duration-700 bg-white/60 flex flex-col h-full" hover>
              <div className="relative aspect-[16/10] overflow-hidden">
                <img
                  src={item.image}
                  alt={item.name}
                  className="h-full w-full object-cover transition-transform duration-[4000ms] group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-aureve-charcoal/60 via-transparent to-transparent opacity-40 group-hover:opacity-100 transition-opacity duration-700" />
                
                <div className="absolute top-8 right-8 translate-x-16 opacity-0 group-hover:translate-x-0 group-hover:opacity-100 transition-all duration-700 delay-100">
                   <div className="h-12 w-12 rounded-full bg-white/95 backdrop-blur-md flex items-center justify-center text-aureve-charcoal shadow-soft">
                     <ShieldCheck className="h-5 w-5 stroke-[1.5]" />
                   </div>
                </div>

                <div className="absolute bottom-8 left-10 right-10 translate-y-6 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-700 delay-200">
                   <p className="text-[10px] font-bold uppercase tracking-[0.4em] text-aureve-accent/80 mb-2">{item.vibe}</p>
                   <h3 className="font-serif text-3xl text-white italic leading-tight">{item.name}</h3>
                </div>
              </div>

              <div className="p-10 flex-1 flex flex-col justify-between">
                <p className="text-sm text-aureve-muted leading-relaxed font-light italic mb-10">
                  "{item.description}"
                </p>

                <div className="flex items-center justify-between pt-8 border-t border-aureve-base/20">
                   <div className="space-y-1">
                      <p className="text-[9px] font-bold uppercase tracking-widest text-aureve-muted/30">Investment</p>
                      <span className="text-2xl font-serif text-aureve-charcoal font-light italic">${item.price}</span>
                   </div>
                   <button 
                     onClick={() => handlePurchaseAttempt(item)}
                     disabled={isIntercepting && activeItem?.id === item.id}
                     className="h-14 px-8 rounded-full bg-aureve-charcoal text-white flex items-center justify-center gap-4 hover:bg-aureve-accent transition-all shadow-soft group/btn disabled:opacity-50"
                   >
                      <span className="text-[10px] uppercase tracking-[0.3em] font-bold">
                        {isIntercepting && activeItem?.id === item.id ? "Analyzing..." : "Acquire"}
                      </span>
                      <ArrowUpRight className="h-5 w-5 group-hover/btn:translate-x-0.5 group-hover/btn:-translate-y-0.5 transition-transform stroke-[1.5]" />
                   </button>
                </div>
              </div>
            </GlassCard>
          </motion.div>
        ))}
      </section>

      {/* Interception Modal/Overlay */}
      {interceptResult && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-6">
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="absolute inset-0 bg-aureve-charcoal/40 backdrop-blur-md"
            onClick={reset}
          />
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            className="relative bg-white rounded-[4rem] shadow-2xl max-w-2xl w-full overflow-hidden"
          >
            <div className="p-12 md:p-16 space-y-10">
              <div className="flex items-center gap-6">
                <div className={`h-16 w-16 rounded-2xl flex items-center justify-center ${interceptResult.shouldIntercept ? 'bg-aureve-gold/10 text-aureve-gold' : 'bg-green-500/10 text-green-500'}`}>
                  {interceptResult.shouldIntercept ? <Clock size={32} strokeWidth={1.5} /> : <ShieldCheck size={32} strokeWidth={1.5} />}
                </div>
                <div>
                  <h2 className="text-[10px] uppercase tracking-[0.5em] text-aureve-accent font-black mb-1">Ritual Analysis</h2>
                  <p className="text-3xl font-serif italic text-aureve-charcoal">
                    {interceptResult.shouldIntercept ? "A moment of reflection." : "Selection Approved."}
                  </p>
                </div>
              </div>

              <div className="p-8 rounded-[2.5rem] bg-aureve-cream/50 border border-aureve-base/10 space-y-6">
                <p className="text-aureve-charcoal font-light italic leading-relaxed">
                  "{interceptResult.message}"
                </p>
                {interceptResult.reasoning && (
                   <ul className="space-y-3">
                     {interceptResult.reasoning.map((r: string, i: number) => (
                       <li key={i} className="flex items-start gap-4 text-xs text-aureve-muted font-light">
                         <div className="h-1 w-1 rounded-full bg-aureve-accent mt-1.5 shrink-0" />
                         {r}
                       </li>
                     ))}
                   </ul>
                )}
              </div>

              <div className="flex flex-col sm:flex-row gap-6 pt-4">
                {interceptResult.shouldIntercept ? (
                  <>
                    <button 
                      onClick={reset}
                      className="flex-1 py-6 rounded-full bg-aureve-charcoal text-white text-[11px] uppercase tracking-[0.4em] font-bold hover:bg-aureve-accent transition-all"
                    >
                      Enter Cooldown Sanctuary
                    </button>
                    <button 
                      onClick={reset}
                      className="flex-1 py-6 rounded-full border border-aureve-base/30 text-aureve-muted text-[11px] uppercase tracking-[0.4em] font-bold hover:bg-aureve-base/10 transition-all"
                    >
                      Release Choice
                    </button>
                  </>
                ) : (
                  <button 
                    onClick={reset}
                    className="w-full py-6 rounded-full bg-aureve-charcoal text-white text-[11px] uppercase tracking-[0.4em] font-bold hover:bg-aureve-accent transition-all"
                  >
                    Proceed to Acquisition
                  </button>
                )}
              </div>
            </div>
            
            <div className="bg-aureve-charcoal p-8 flex items-center justify-center gap-4">
              <Sparkles className="h-4 w-4 text-aureve-accent" />
              <p className="text-[9px] uppercase tracking-[0.4em] text-white/40 font-bold">Aera Intentional Intelligence active</p>
            </div>
          </motion.div>
        </div>
      )}
    </div>
  );
}
