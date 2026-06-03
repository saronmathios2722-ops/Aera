"use client";

import { motion } from "framer-motion";
import { 
  ArrowLeft,
  Heart,
  Calendar,
  Sparkles,
  Search,
  Filter
} from "lucide-react";
import DashboardLayout from "@/components/layout/DashboardLayout";
import GlassCard from "@/components/ui/GlassCard";
import Link from "next/link";
import { useState } from "react";

const rituals = [
  {
    id: "1",
    title: "The Architectural Silhouette",
    description: "A study in structure and form, featuring the oversized wool blazer and tapered trousers from your archive.",
    image: "https://images.unsplash.com/photo-1539109136881-3be0616acf4b?q=80&w=800&auto=format&fit=crop",
    tags: ["Structured", "Minimal", "Monochrome"],
    confidence: 94,
    date: "May 24, 2026"
  },
  {
    id: "2",
    title: "Soft Industrialism",
    description: "Balancing raw textures with refined finishes. The silk slip dress meets the heavy leather jacket.",
    image: "https://images.unsplash.com/photo-1490481651871-ab68de25d43d?q=80&w=800&auto=format&fit=crop",
    tags: ["Refined", "Industrial", "Versatile"],
    confidence: 89,
    date: "May 23, 2026"
  },
  {
    id: "3",
    title: "Midnight Minimalist",
    description: "Deep blacks and charcoal layers, optimized for late-night inspiration and urban exploration.",
    image: "https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?q=80&w=800&auto=format&fit=crop",
    tags: ["Noir", "Urban", "Minimal"],
    confidence: 91,
    date: "May 22, 2026"
  },
  {
    id: "4",
    title: "Ethereal Layering",
    description: "Sheer fabrics combined with soft knits to create a sense of fluid movement and transparency.",
    image: "https://images.unsplash.com/photo-1483985988355-763728e1935b?q=80&w=800&auto=format&fit=crop",
    tags: ["Fluid", "Soft", "Ethereal"],
    confidence: 87,
    date: "May 21, 2026"
  },
  {
    id: "5",
    title: "Modern Classicism",
    description: "Reimagined heritage pieces. The trench coat paired with avant-garde sneakers.",
    image: "https://images.unsplash.com/photo-1445205170230-053b83016050?q=80&w=800&auto=format&fit=crop",
    tags: ["Heritage", "Modern", "Classic"],
    confidence: 92,
    date: "May 20, 2026"
  },
  {
    id: "6",
    title: "The Sculptural Knit",
    description: "Focus on texture and three-dimensional form. A statement sweater as the centerpiece of the ritual.",
    image: "https://images.unsplash.com/photo-1434389677669-e08b493021fe?q=80&w=800&auto=format&fit=crop",
    tags: ["Texture", "Sculptural", "Warmth"],
    confidence: 95,
    date: "May 19, 2026"
  }
];

export default function RitualsGalleryPage() {
  const [searchTerm, setSearchTerm] = useState("");

  const filteredRituals = rituals.filter(r => 
    r.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    r.tags.some(t => t.toLowerCase().includes(searchTerm.toLowerCase()))
  );

  return (
    <DashboardLayout>
      <div className="space-y-16">
        {/* Editorial Header */}
        <header className="space-y-8">
          <Link href="/dashboard" className="group flex items-center gap-2 text-[10px] uppercase tracking-[0.3em] text-aureve-muted hover:text-aureve-charcoal transition-colors">
            <ArrowLeft size={14} className="group-hover:-translate-x-1 transition-transform" />
            Back to Sanctuary
          </Link>
          
          <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-8">
            <div className="space-y-4">
              <h2 className="text-[10px] uppercase tracking-[1em] text-aureve-accent font-black">Archive of Manifestations</h2>
              <h1 className="text-6xl md:text-7xl font-serif text-aureve-charcoal leading-tight">
                Daily <span className="italic font-light opacity-80">Rituals</span>
              </h1>
            </div>
            
            <div className="flex items-center gap-4">
              <div className="relative group">
                <Search size={16} className="absolute left-6 top-1/2 -translate-y-1/2 text-aureve-muted group-focus-within:text-aureve-accent transition-colors" />
                <input 
                  type="text" 
                  placeholder="Search Manifestations..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="bg-white/50 backdrop-blur-xl border border-aureve-base/20 rounded-full py-4 pl-14 pr-8 text-xs tracking-widest focus:outline-none focus:border-aureve-accent/40 w-full lg:w-[300px] transition-all"
                />
              </div>
              <button className="h-12 w-12 rounded-full bg-white/50 backdrop-blur-xl border border-aureve-base/20 flex items-center justify-center text-aureve-muted hover:text-aureve-charcoal transition-all">
                <Filter size={18} />
              </button>
            </div>
          </div>
        </header>

        {/* Gallery Grid */}
        <section className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-12">
          {filteredRituals.map((ritual, i) => (
            <motion.div
              key={ritual.id}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1, duration: 1, ease: [0.16, 1, 0.3, 1] }}
            >
              <GlassCard className="group flex flex-col h-full !rounded-[3rem] overflow-hidden border-none shadow-soft hover:shadow-floating transition-all duration-700 bg-white/40" hover>
                <div className="relative aspect-[4/5] overflow-hidden">
                  <img 
                    src={ritual.image} 
                    alt={ritual.title}
                    className="absolute inset-0 h-full w-full object-cover transition-transform duration-[3s] group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-aureve-charcoal/80 via-transparent to-transparent opacity-60 group-hover:opacity-90 transition-opacity duration-700" />
                  
                  <div className="absolute top-8 left-8">
                    <div className="px-4 py-2 rounded-full bg-white/10 backdrop-blur-md border border-white/20 text-[8px] uppercase tracking-widest text-white font-bold">
                      {ritual.date}
                    </div>
                  </div>
                  
                  <div className="absolute bottom-8 left-8 right-8 space-y-4">
                    <div className="flex gap-2">
                      {ritual.tags.map(tag => (
                        <span key={tag} className="text-[8px] uppercase tracking-widest text-aureve-accent font-bold px-2 py-1 bg-aureve-accent/10 backdrop-blur-md rounded-md border border-aureve-accent/20">
                          {tag}
                        </span>
                      ))}
                    </div>
                    <h3 className="text-3xl font-serif text-white leading-tight">
                      {ritual.title}
                    </h3>
                  </div>
                </div>
                
                <div className="p-10 space-y-8 flex-1 flex flex-col justify-between">
                  <p className="text-sm text-aureve-muted font-light leading-relaxed italic line-clamp-3">
                    "{ritual.description}"
                  </p>
                  
                  <div className="flex items-center justify-between pt-6 border-t border-aureve-base/10">
                    <div className="flex items-center gap-3">
                      <div className="h-10 px-4 rounded-full bg-aureve-accent/5 border border-aureve-accent/10 flex items-center gap-2">
                        <Sparkles size={12} className="text-aureve-accent" />
                        <span className="text-[9px] uppercase tracking-[0.2em] font-bold text-aureve-charcoal">
                          {ritual.confidence}%
                        </span>
                      </div>
                    </div>
                    
                    <button className="h-12 w-12 rounded-full bg-aureve-charcoal text-white flex items-center justify-center hover:scale-110 transition-transform shadow-xl">
                      <Heart size={18} />
                    </button>
                  </div>
                </div>
              </GlassCard>
            </motion.div>
          ))}
        </section>

        {/* Empty State */}
        {filteredRituals.length === 0 && (
          <section className="py-32 text-center space-y-8">
            <div className="flex justify-center">
              <div className="h-24 w-24 rounded-full bg-aureve-accent/5 flex items-center justify-center text-aureve-accent/30">
                <Calendar size={40} strokeWidth={1} />
              </div>
            </div>
            <div className="space-y-4">
              <h3 className="text-3xl font-serif text-aureve-charcoal italic">No Manifestations Found</h3>
              <p className="text-aureve-muted font-light max-w-md mx-auto">
                The archives are silent for this search. Try refining your aesthetic terms or explore the full history.
              </p>
            </div>
            <button 
              onClick={() => setSearchTerm("")}
              className="px-10 py-4 rounded-full bg-aureve-charcoal text-white text-[10px] uppercase tracking-[0.4em] font-bold hover:bg-aureve-accent transition-colors"
            >
              Clear Search
            </button>
          </section>
        )}

        {/* Footer Editorial Quote */}
        <footer className="py-24 border-t border-aureve-base/20 text-center space-y-8">
          <p className="text-[10px] uppercase tracking-[1em] text-aureve-accent font-black">Style Evolution</p>
          <h2 className="text-4xl md:text-5xl font-serif text-aureve-charcoal leading-tight max-w-3xl mx-auto italic font-light opacity-80">
            "Your wardrobe is not a collection of objects, but a series of intentions woven through time."
          </h2>
        </footer>
      </div>
    </DashboardLayout>
  );
}
