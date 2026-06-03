"use client";

import { motion } from "framer-motion";
import { 
  Sparkles, 
  ArrowUpRight, 
  Clock, 
  Wind, 
  TrendingUp, 
  Heart, 
  ShieldCheck,
  Calendar,
  CloudSun,
  Droplets,
  Star,
  Plus,
  ShoppingBag
} from "lucide-react";
import GlassCard from "@/components/ui/GlassCard";
import DashboardLayout from "@/components/layout/DashboardLayout";
import Link from "next/link";
import { useState, useEffect } from "react";

const rituals = [
  {
    title: "The Architectural Silhouette",
    description: "A study in structure and form, featuring the oversized wool blazer and tapered trousers from your archive.",
    image: "https://images.unsplash.com/photo-1539109136881-3be0616acf4b?q=80&w=800&auto=format&fit=crop",
    tags: ["Structured", "Minimal", "Monochrome"],
    confidence: 94
  },
  {
    title: "Soft Industrialism",
    description: "Balancing raw textures with refined finishes. The silk slip dress meets the heavy leather jacket.",
    image: "https://images.unsplash.com/photo-1490481651871-ab68de25d43d?q=80&w=800&auto=format&fit=crop",
    tags: ["Refined", "Industrial", "Versatile"],
    confidence: 89
  }
];

export default function DashboardPage() {
  const [greeting, setGreeting] = useState("Good morning");

  const [data, setData] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const hour = new Date().getHours();
    if (hour >= 12 && hour < 17) setGreeting("Good afternoon");
    else if (hour >= 17) setGreeting("Good evening");

    async function fetchDashboard() {
      try {
        const res = await fetch('/api/dashboard');
        if (res.ok) {
          const d = await res.json();
          setData(d);
        }
      } catch (err) {
        console.error("Failed to fetch dashboard", err);
      } finally {
        setLoading(false);
      }
    }
    fetchDashboard();
  }, []);

  const stats = [
    { label: "Intentionality", value: data ? `${data.spending_intentionality || 0}%` : "0%", change: "+4%", icon: ShieldCheck },
    { label: "Reflection", value: data ? `${(data.intentionality_score || 0).toFixed(1)}h` : "0h", change: "Avg Time", icon: Clock },
    { label: "Impulse Shield", value: data ? data.waitlist?.length || "0" : "0", change: "On Cooldown", icon: Star },
  ];

  return (
    <DashboardLayout>
      <div className="space-y-24">
        {/* Hero Section - Editorial Header */}
        <section className="relative">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 items-end">
          <div className="lg:col-span-8 space-y-8">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
            >
              <h2 className="text-[10px] uppercase tracking-[1em] text-aureve-accent font-black mb-6">Current Atmosphere</h2>
              <h1 className="text-7xl md:text-8xl lg:text-9xl font-serif text-aureve-charcoal leading-[0.85] tracking-tighter">
                {greeting}, <br />
                <span className="italic font-light opacity-80">{data?.userName || "Curator"}.</span>
              </h1>
            </motion.div>
            
            <motion.p 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5, duration: 1 }}
              className="text-xl text-aureve-muted font-light max-w-xl leading-relaxed"
            >
              Today's aesthetic is informed by <span className="text-aureve-charcoal font-medium">calm overcast skies</span> and your goal of <span className="text-aureve-charcoal font-medium italic underline decoration-aureve-accent/30 underline-offset-8">refined versatility</span>.
            </motion.p>
          </div>
          
          <div className="lg:col-span-4 flex justify-end">
            <GlassCard className="p-8 w-full max-w-[280px]" hover>
              <div className="flex items-center gap-4 mb-6">
                <div className="h-12 w-12 rounded-2xl bg-aureve-accent/10 flex items-center justify-center text-aureve-accent">
                  <CloudSun size={24} strokeWidth={1} />
                </div>
                <div>
                  <p className="text-[9px] uppercase tracking-widest text-aureve-muted font-bold">Climate</p>
                  <p className="text-lg font-serif italic">64°F / London</p>
                </div>
              </div>
              <div className="space-y-3">
                <div className="flex justify-between items-center text-[10px] uppercase tracking-widest text-aureve-muted">
                  <span>Humidity</span>
                  <span className="text-aureve-charcoal">42%</span>
                </div>
                <div className="h-[1px] w-full bg-aureve-base/20" />
                <div className="flex justify-between items-center text-[10px] uppercase tracking-widest text-aureve-muted">
                  <span>Wind</span>
                  <span className="text-aureve-charcoal">8mph NW</span>
                </div>
              </div>
            </GlassCard>
          </div>
        </div>
      </section>

      {/* Stats Ribbon - High End Data */}
      <section>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {stats.map((stat, i) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.8 + (i * 0.1), duration: 0.8 }}
              className="group relative overflow-hidden bg-white/40 border border-aureve-base/10 rounded-[2.5rem] p-10 hover:bg-aureve-charcoal transition-all duration-700"
            >
              <div className="relative z-10 flex flex-col h-full justify-between">
                <div className="flex justify-between items-start mb-8">
                  <div className="h-12 w-12 rounded-2xl bg-aureve-cream flex items-center justify-center text-aureve-accent group-hover:bg-white/10 transition-colors">
                    <stat.icon size={20} strokeWidth={1.5} />
                  </div>
                  <span className="text-[10px] uppercase tracking-widest font-bold text-aureve-accent">
                    {stat.change}
                  </span>
                </div>
                <div>
                  <p className="text-[10px] uppercase tracking-[0.4em] text-aureve-muted group-hover:text-white/50 transition-colors mb-2">{stat.label}</p>
                  <p className="text-5xl font-serif text-aureve-charcoal group-hover:text-white transition-colors">{stat.value}</p>
                </div>
              </div>
              <div className="absolute -bottom-10 -right-10 h-32 w-32 bg-aureve-accent/5 rounded-full blur-3xl group-hover:bg-aureve-accent/20 transition-all duration-700" />
            </motion.div>
          ))}
        </div>
      </section>

      {/* The Morning Ritual - Large Scale Presentation */}
      <section className="space-y-12">
        <div className="flex items-end justify-between px-2">
          <div className="space-y-4">
            <h2 className="text-[10px] uppercase tracking-[1em] text-aureve-accent font-black">Reflective Curation</h2>
            <h3 className="text-5xl font-serif text-aureve-charcoal italic font-light">The Morning Ritual</h3>
          </div>
          <Link href="/dashboard/rituals" className="group flex items-center gap-4 text-[10px] uppercase tracking-[0.4em] font-bold text-aureve-muted hover:text-aureve-charcoal transition-all">
            Explore All Manifestations
            <ArrowUpRight size={16} className="group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
          </Link>
        </div>

        <div className="grid grid-cols-1 xl:grid-cols-2 gap-12">
          {rituals.map((ritual, i) => (
            <motion.div
              key={ritual.title}
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
              className="group relative h-[600px] rounded-[4rem] overflow-hidden shadow-2xl"
            >
              <img 
                src={ritual.image} 
                alt={ritual.title}
                className="absolute inset-0 h-full w-full object-cover transition-transform duration-[2s] group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-aureve-charcoal via-aureve-charcoal/20 to-transparent opacity-90" />
              
              <div className="absolute inset-0 p-16 flex flex-col justify-end">
                <div className="flex gap-4 mb-8">
                  {ritual.tags.map(tag => (
                    <span key={tag} className="px-5 py-2 rounded-full border border-white/20 backdrop-blur-md text-[9px] uppercase tracking-widest text-white/80 font-bold">
                      {tag}
                    </span>
                  ))}
                </div>
                
                <h4 className="text-5xl font-serif text-white mb-6 leading-tight">
                  {ritual.title}
                </h4>
                
                <p className="text-lg text-white/70 font-light max-w-md mb-10 leading-relaxed">
                  {ritual.description}
                </p>
                
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-6">
                    <button className="h-16 w-16 rounded-full bg-white text-aureve-charcoal flex items-center justify-center hover:scale-110 transition-transform shadow-xl">
                      <Heart size={24} />
                    </button>
                    <div className="h-16 px-10 rounded-full bg-white/10 backdrop-blur-xl border border-white/10 flex items-center gap-4 text-white">
                      <div className="h-2 w-2 rounded-full bg-aureve-accent animate-pulse" />
                      <span className="text-[10px] uppercase tracking-[0.3em] font-bold">confidence index: {ritual.confidence}%</span>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Forgotten Essence - Subtle Grid */}
      <section className="bg-aureve-charcoal rounded-[5rem] p-20 md:p-32 overflow-hidden relative">
        <div className="absolute top-0 right-0 w-[800px] h-[800px] bg-aureve-accent/5 blur-[150px] -z-1" />
        
        <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-20 items-center">
          <div className="lg:col-span-5 space-y-10">
            <div className="space-y-4">
              <h2 className="text-[10px] uppercase tracking-[1em] text-aureve-accent font-black">Archive Revival</h2>
              <h3 className="text-6xl font-serif text-white italic font-light leading-tight">Forgotten <br /> Essence</h3>
            </div>
            
            <p className="text-xl text-white/50 font-light leading-relaxed">
              These items haven't been experienced in <span className="text-white italic">45 days</span>. Reintroducing them can reduce your impulse urge by <span className="text-aureve-accent font-medium">32%</span> this week.
            </p>
            
            <button className="group flex items-center gap-8 px-12 py-6 rounded-full bg-aureve-accent text-aureve-charcoal font-bold text-[11px] uppercase tracking-[0.4em] hover:bg-white transition-all duration-700">
              Revive Selection
              <ArrowUpRight size={18} className="group-hover:translate-x-2 group-hover:-translate-y-2 transition-transform" />
            </button>
          </div>
          
          <div className="lg:col-span-7 grid grid-cols-2 gap-8">
            <motion.div 
              whileHover={{ y: -20 }}
              className="aspect-[3/4] rounded-[3rem] overflow-hidden bg-white/5 border border-white/10 p-4"
            >
              <div className="h-full w-full rounded-[2.5rem] overflow-hidden relative group">
                <img 
                  src="https://images.unsplash.com/photo-1543076447-215ad9ba6923?q=80&w=800&auto=format&fit=crop" 
                  className="h-full w-full object-cover transition-transform duration-1000 group-hover:scale-110"
                />
                <div className="absolute inset-x-0 bottom-0 p-8 bg-gradient-to-t from-black/80 to-transparent">
                  <p className="text-white text-[10px] uppercase tracking-widest font-bold">Silk Slip Dress</p>
                  <p className="text-white/40 text-[9px] uppercase tracking-widest mt-1">Acne Studios</p>
                </div>
              </div>
            </motion.div>
            
            <motion.div 
              whileHover={{ y: -20 }}
              transition={{ delay: 0.1 }}
              className="aspect-[3/4] rounded-[3rem] overflow-hidden bg-white/5 border border-white/10 p-4 mt-16"
            >
              <div className="h-full w-full rounded-[2.5rem] overflow-hidden relative group">
                <img 
                  src="https://images.unsplash.com/photo-1591047139829-d91aecb6caea?q=80&w=800&auto=format&fit=crop" 
                  className="h-full w-full object-cover transition-transform duration-1000 group-hover:scale-110"
                />
                <div className="absolute inset-x-0 bottom-0 p-8 bg-gradient-to-t from-black/80 to-transparent">
                  <p className="text-white text-[10px] uppercase tracking-widest font-bold">Wool Overcoat</p>
                  <p className="text-white/40 text-[9px] uppercase tracking-widest mt-1">The Row</p>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Cooldown Waitlist - Intentional Spending */}
      {data?.waitlist?.length > 0 && (
        <section className="space-y-12">
          <div className="flex items-end justify-between px-2">
            <div className="space-y-4">
              <h2 className="text-[10px] uppercase tracking-[1em] text-aureve-accent font-black">Purchase Sanctuary</h2>
              <h3 className="text-5xl font-serif text-aureve-charcoal italic font-light">Cooldown Waitlist</h3>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {data.waitlist.map((item: any) => (
              <GlassCard key={item.id} className="p-8 flex flex-col gap-6" hover>
                <div className="relative aspect-square rounded-2xl overflow-hidden bg-aureve-cream">
                  {item.image_url ? (
                    <img src={item.image_url} alt={item.item_name} className="h-full w-full object-cover" />
                  ) : (
                    <div className="h-full w-full flex items-center justify-center text-aureve-muted/20">
                      <ShoppingBag size={48} strokeWidth={1} />
                    </div>
                  )}
                  <div className="absolute top-4 right-4 bg-white/90 backdrop-blur-md px-3 py-1 rounded-full text-[10px] font-bold text-aureve-accent uppercase tracking-widest border border-aureve-accent/10">
                    Cooldown
                  </div>
                </div>
                
                <div className="space-y-2">
                  <h4 className="font-serif text-2xl text-aureve-charcoal italic">{item.item_name}</h4>
                  <p className="text-lg font-light text-aureve-muted">${item.price}</p>
                </div>

                <div className="pt-4 border-t border-aureve-base/10 flex items-center justify-between">
                  <div className="flex items-center gap-2 text-aureve-muted">
                    <Clock size={14} />
                    <span className="text-[10px] uppercase tracking-widest font-bold">
                      {new Date(item.cooldown_until) > new Date() 
                        ? `${Math.ceil((new Date(item.cooldown_until).getTime() - new Date().getTime()) / (1000 * 60 * 60 * 24))}d remaining`
                        : 'Ready to review'}
                    </span>
                  </div>
                  <button className="h-10 w-10 rounded-full bg-aureve-charcoal text-white flex items-center justify-center hover:bg-aureve-accent transition-colors">
                    <ArrowUpRight size={18} />
                  </button>
                </div>
              </GlassCard>
            ))}
          </div>
        </section>
      )}

      {/* Style Manifest - Final CTA Area */}
      <section className="py-24 border-y border-aureve-base/20">
        <div className="max-w-4xl mx-auto text-center space-y-12">
          <div className="flex justify-center">
            <div className="h-20 w-20 rounded-full bg-aureve-accent/10 flex items-center justify-center text-aureve-accent">
              <Sparkles size={32} strokeWidth={1} />
            </div>
          </div>
          <h2 className="text-5xl md:text-7xl font-serif text-aureve-charcoal leading-tight">
            Your wardrobe is a <br />
            <span className="italic font-light">living sanctuary.</span>
          </h2>
          <p className="text-xl text-aureve-muted font-light leading-relaxed">
            Every choice today contributes to your long-term style DNA. <br />
            Stay intentional, stay curated.
          </p>
          <div className="flex flex-wrap justify-center gap-8 pt-8">
            <button className="px-16 py-8 rounded-full bg-aureve-charcoal text-white text-[11px] uppercase tracking-[0.5em] font-bold hover:bg-aureve-accent hover:text-aureve-charcoal transition-all duration-700 shadow-floating">
              Begin Daily Ritual
            </button>
            <button className="px-16 py-8 rounded-full border border-aureve-charcoal/20 text-aureve-charcoal text-[11px] uppercase tracking-[0.5em] font-bold hover:bg-aureve-base/10 transition-all duration-700">
              Audit Sanctuary
            </button>
          </div>
        </div>
      </section>
      </div>
      </DashboardLayout>
      );
      }
