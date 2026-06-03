"use client";

import DashboardLayout from "@/components/layout/DashboardLayout";
import GlassCard from "@/components/ui/GlassCard";
import WardrobeUpload from "@/components/wardrobe/WardrobeUpload";
import CapsuleGenerator from "@/components/wardrobe/CapsuleGenerator";
import ItemDetailModal from "@/components/wardrobe/ItemDetailModal";
import { Plus, Search, Shirt, Scissors, Footprints, Watch, LayoutGrid, Filter, ArrowRight, Sparkles } from "lucide-react";
import Image from "next/image";
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

const categories = [
  { id: "all", label: "All Items", icon: LayoutGrid },
  { id: "tops", label: "Tops", icon: Shirt },
  { id: "bottoms", label: "Bottoms", icon: Scissors },
  { id: "outerwear", label: "Outerwear", icon: Shirt },
  { id: "shoes", label: "Shoes", icon: Footprints },
  { id: "accessories", label: "Accessories", icon: Watch },
];

export default function WardrobePage() {
  const [activeCategory, setActiveCategory] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [isUploadOpen, setIsUploadOpen] = useState(false);
  const [isCapsuleOpen, setIsCapsuleOpen] = useState(false);
  const [selectedItem, setSelectedItem] = useState<any>(null);
  const [items, setItems] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchItems();
  }, []);

  const fetchItems = async () => {
    try {
      const response = await fetch("/api/wardrobe");
      const data = await response.json();
      setItems(data);
    } catch (error) {
      console.error("Failed to fetch items", error);
    } finally {
      setLoading(false);
    }
  };

  const filteredItems = items.filter(item => 
    (activeCategory === "all" || item.category === activeCategory) &&
    (item.name.toLowerCase().includes(searchQuery.toLowerCase()) || (item.brand && item.brand.toLowerCase().includes(searchQuery.toLowerCase())))
  );

  return (
    <div className="space-y-24">
      {/* Header Section */}
      <section className="flex flex-col lg:flex-row lg:items-end justify-between gap-12">
        <div className="space-y-6">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
          >
            <h2 className="text-[10px] uppercase tracking-[1em] text-aureve-accent font-black mb-6">Archive</h2>
            <h1 className="text-7xl md:text-8xl font-serif text-aureve-charcoal leading-none tracking-tighter italic font-light">
              Wardrobe <br />
              <span className="not-italic">Sanctuary.</span>
            </h1>
          </motion.div>
        </div>

        <div className="flex flex-wrap items-center gap-6">
          <div className="relative group">
            <Search className="absolute left-6 top-1/2 -translate-y-1/2 h-4 w-4 text-aureve-muted group-focus-within:text-aureve-accent transition-colors" />
            <input 
              type="text" 
              placeholder="Search essence..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-16 pr-10 py-6 bg-white/40 border border-aureve-base/10 rounded-full text-[11px] uppercase tracking-widest outline-none focus:ring-1 focus:ring-aureve-accent/30 transition-all w-full md:w-80 backdrop-blur-md"
            />
          </div>
          <button 
            onClick={() => setIsUploadOpen(true)}
            className="h-20 w-20 bg-aureve-charcoal text-white rounded-full flex items-center justify-center hover:bg-aureve-accent transition-all duration-700 shadow-floating group"
          >
            <Plus className="h-8 w-8 group-hover:rotate-90 transition-transform duration-700" />
          </button>
        </div>
      </section>

      {/* Stats - Refined */}
      <section className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {[
          { label: "Total Pieces", value: items.length, icon: Shirt },
          { label: "Versatility", value: "84%", icon: Sparkles },
          { label: "Daily Avg", value: "$4.20", icon: Watch },
        ].map((stat, i) => (
          <GlassCard key={stat.label} className="flex items-center justify-between py-10 px-12" delay={i * 0.1}>
            <div>
              <p className="text-[9px] uppercase tracking-[0.4em] text-aureve-muted font-bold mb-2">{stat.label}</p>
              <h3 className="text-4xl font-serif text-aureve-charcoal">{stat.value}</h3>
            </div>
            <div className="h-14 w-14 rounded-2xl bg-aureve-accent/10 flex items-center justify-center text-aureve-accent">
              <stat.icon className="h-6 w-6 stroke-[1]" />
            </div>
          </GlassCard>
        ))}
      </section>

      {/* Filter Ribbon */}
      <section className="flex items-center gap-4 overflow-x-auto pb-4 no-scrollbar border-b border-aureve-base/10">
        <Filter className="h-4 w-4 text-aureve-accent mr-4 shrink-0" />
        {categories.map((cat) => (
          <button
            key={cat.id}
            onClick={() => setActiveCategory(cat.id)}
            className={`flex items-center gap-4 px-8 py-4 rounded-full whitespace-nowrap transition-all duration-700 text-[10px] uppercase tracking-[0.3em] font-black ${
              activeCategory === cat.id 
              ? "bg-aureve-charcoal text-white shadow-soft" 
              : "text-aureve-muted hover:text-aureve-charcoal hover:bg-aureve-base/5"
            }`}
          >
            {cat.label}
          </button>
        ))}
      </section>

      {/* Inventory Grid - Cinematic */}
      <section>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-12">
          <AnimatePresence mode="popLayout">
            {filteredItems.map((item, i) => (
              <motion.div
                key={item.id}
                layout
                initial={{ opacity: 0, y: 40 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.8, delay: i * 0.05, ease: [0.16, 1, 0.3, 1] }}
                className="group cursor-pointer"
                onClick={() => setSelectedItem(item)}
              >
                <div className="relative aspect-[3/4] w-full bg-white rounded-[2.5rem] overflow-hidden shadow-soft transition-all duration-700 group-hover:shadow-floating group-hover:-translate-y-4">
                  <Image 
                    src={item.image_url || item.image} 
                    alt={item.name} 
                    fill 
                    className="object-cover transition-transform duration-[2s] group-hover:scale-110 opacity-95 group-hover:opacity-100"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-aureve-charcoal/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-all duration-700" />
                  
                  <div className="absolute inset-x-0 bottom-0 p-8 translate-y-4 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-700">
                    <button className="w-full py-4 bg-white/20 backdrop-blur-xl border border-white/30 rounded-full text-[9px] uppercase tracking-widest text-white font-bold hover:bg-white hover:text-aureve-charcoal transition-all">
                      View Details
                    </button>
                  </div>
                </div>
                <div className="mt-8 space-y-2 px-2">
                  <div className="flex justify-between items-start">
                    <div>
                      <p className="text-[9px] uppercase tracking-widest text-aureve-accent font-bold mb-1">{item.brand}</p>
                      <h4 className="text-lg font-serif text-aureve-charcoal italic">{item.name}</h4>
                    </div>
                    <div className="h-4 w-4 rounded-full border border-aureve-base/30 mt-1" style={{ backgroundColor: item.color === 'Cream' ? '#F9F7F2' : item.color === 'Charcoal' ? '#1A1A1A' : '#A89F91' }} />
                  </div>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>

          <motion.button
            whileHover={{ y: -4 }}
            onClick={() => setIsUploadOpen(true)}
            className="flex flex-col items-center justify-center border border-dashed border-aureve-base/30 rounded-[2.5rem] aspect-[3/4] p-12 hover:border-aureve-accent transition-all duration-700 group bg-white/10"
          >
            <div className="h-20 w-20 rounded-full bg-white flex items-center justify-center text-aureve-muted group-hover:text-aureve-accent transition-all duration-700 shadow-soft">
              <Plus className="h-10 w-10 stroke-[1]" />
            </div>
            <p className="mt-8 text-[10px] uppercase tracking-[0.4em] font-black text-aureve-muted group-hover:text-aureve-charcoal transition-colors">Add Artifact</p>
          </motion.button>
        </div>
      </section>

      {/* Capsule Banner - Editorial Callout */}
      <section>
        <div className="bg-aureve-charcoal rounded-[5rem] overflow-hidden relative min-h-[500px] flex items-center p-20 md:p-32">
          <div className="absolute inset-0 opacity-40">
             <Image 
               src="https://images.unsplash.com/photo-1490481651871-ab68de25d43d?q=80&w=1600&auto=format&fit=crop"
               alt="Capsule"
               fill
               className="object-cover"
             />
             <div className="absolute inset-0 bg-gradient-to-r from-aureve-charcoal via-aureve-charcoal/80 to-transparent" />
          </div>
          
          <div className="relative z-10 max-w-2xl space-y-12">
            <div className="space-y-4">
              <h2 className="text-[10px] uppercase tracking-[1em] text-aureve-accent font-black">AI Curation</h2>
              <h3 className="text-6xl md:text-7xl font-serif text-white italic font-light leading-tight">The Capsule <br /> Architect.</h3>
            </div>
            
            <p className="text-xl text-white/50 font-light leading-relaxed">
              Manifest a perfectly balanced collection of <span className="text-white italic">12 essential pieces</span> tailored to your upcoming travels or seasonal evolution.
            </p>
            
            <button 
              onClick={() => setIsCapsuleOpen(true)}
              className="group flex items-center gap-10 px-16 py-8 rounded-full bg-aureve-accent text-aureve-charcoal font-bold text-[11px] uppercase tracking-[0.5em] hover:bg-white transition-all duration-700"
            >
              Generate Blueprint
              <ArrowRight size={20} className="group-hover:translate-x-4 transition-transform duration-700" />
            </button>
          </div>
        </div>
      </section>

      <AnimatePresence>
        {isUploadOpen && (
          <WardrobeUpload 
            onClose={() => {
              setIsUploadOpen(false);
              fetchItems();
            }} 
          />
        )}
        {isCapsuleOpen && (
          <CapsuleGenerator onClose={() => setIsCapsuleOpen(false)} />
        )}
        {selectedItem && (
          <ItemDetailModal item={selectedItem} onClose={() => setSelectedItem(null)} />
        )}
      </AnimatePresence>
    </div>
  );
}
