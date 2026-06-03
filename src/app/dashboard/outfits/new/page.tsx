"use client";

import DashboardLayout from "@/components/layout/DashboardLayout";
import GlassCard from "@/components/ui/GlassCard";
import { useState, useEffect } from "react";
import { Shirt, Scissors, Footprints, Watch, LayoutGrid, Plus, Save, Sparkles, X, ChevronRight, Loader2 } from "lucide-react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";

const categories = [
  { id: "tops", label: "Tops", icon: Shirt },
  { id: "bottoms", label: "Bottoms", icon: Scissors },
  { id: "outerwear", label: "Outerwear", icon: Shirt },
  { id: "shoes", label: "Shoes", icon: Footprints },
  { id: "accessories", label: "Accessories", icon: Watch },
];

export default function OutfitBuilderPage() {
  const [items, setItems] = useState<any[]>([]);
  const [selectedItems, setSelectedItems] = useState<any[]>([]);
  const [activeCategory, setActiveCategory] = useState("tops");
  const [loading, setLoading] = useState(true);
  const [outfitName, setOutfitName] = useState("");
  const [aiFeedback, setAiFeedback] = useState<string | null>(null);
  const [isSaving, setIsSaving] = useState(false);
  const [isAnalyzing, setIsAnalyzing] = useState(false);

  useEffect(() => {
    async function fetchItems() {
      try {
        const response = await fetch("/api/wardrobe");
        const data = await response.json();
        setItems(data);
      } catch (error) {
        console.error("Failed to fetch wardrobe", error);
      } finally {
        setLoading(false);
      }
    }
    fetchItems();
  }, []);

  const toggleItem = (item: any) => {
    if (selectedItems.find(i => i.id === item.id)) {
      setSelectedItems(selectedItems.filter(i => i.id !== item.id));
    } else {
      setSelectedItems([...selectedItems, item]);
    }
    setAiFeedback(null);
  };

  const handleSave = async () => {
    if (selectedItems.length === 0) return;
    setIsSaving(true);
    try {
      const response = await fetch("/api/outfits", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: outfitName || "Untitled Look",
          items: selectedItems.map(i => i.id),
        }),
      });
      if (response.ok) {
        window.location.href = "/dashboard";
      }
    } catch (error) {
      console.error("Failed to save outfit", error);
    } finally {
      setIsSaving(false);
    }
  };

  const getAiAdvice = async () => {
     setIsAnalyzing(true);
     // Simulate AI thinking
     await new Promise(r => setTimeout(r, 2000));
     setAiFeedback("This combination beautifully balances texture and silhouette. The structured nature of the outerwear complements the soft flow of the base layer, creating a sophisticated 'Quiet Luxury' ensemble. Consider adding a leather accessory to ground the look.");
     setIsAnalyzing(false);
  };

  return (
    <DashboardLayout userName="Alex">
      <div className="h-[calc(100vh-140px)] flex flex-col md:flex-row gap-8">
        {/* Sidebar: Wardrobe items */}
        <div className="w-full md:w-96 flex flex-col gap-6 bg-white/20 backdrop-blur-md rounded-[3rem] p-8 border border-white/30 shadow-soft">
          <div className="space-y-1">
             <h2 className="font-serif text-3xl text-aureve-charcoal">Wardrobe</h2>
             <p className="text-[10px] text-aureve-taupe uppercase tracking-widest font-bold">Pick your pieces</p>
          </div>
          
          <div className="flex gap-2 overflow-x-auto no-scrollbar pb-2">
             {categories.map(cat => (
               <button 
                 key={cat.id} 
                 onClick={() => setActiveCategory(cat.id)}
                 className={`p-4 rounded-2xl transition-all flex flex-col items-center gap-2 min-w-[70px] ${activeCategory === cat.id ? 'bg-aureve-charcoal text-white shadow-soft' : 'bg-white/50 text-aureve-taupe hover:text-aureve-charcoal'}`}
               >
                 <cat.icon className="h-5 w-5" />
                 <span className="text-[8px] uppercase font-bold tracking-tighter">{cat.label}</span>
               </button>
             ))}
          </div>

          <div className="flex-1 overflow-y-auto no-scrollbar pr-2">
             <div className="grid grid-cols-2 gap-4">
                {loading ? (
                  Array(6).fill(0).map((_, i) => (
                    <div key={i} className="aspect-[3/4] rounded-2xl bg-aureve-gray/10 animate-pulse" />
                  ))
                ) : (
                  items.filter(i => i.category === activeCategory).map(item => (
                    <motion.div 
                      key={item.id}
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      onClick={() => toggleItem(item)}
                      className={`relative aspect-[3/4] rounded-2xl overflow-hidden cursor-pointer border-2 transition-all duration-500 ${selectedItems.find(si => si.id === item.id) ? 'border-aureve-gold shadow-floating ring-4 ring-aureve-gold/10' : 'border-transparent shadow-soft opacity-80 hover:opacity-100'}`}
                    >
                       <Image src={item.image_url} alt={item.name} fill className="object-cover" />
                       {selectedItems.find(si => si.id === item.id) && (
                         <div className="absolute inset-0 bg-aureve-gold/20 backdrop-blur-[2px] flex items-center justify-center">
                            <div className="bg-white text-aureve-gold p-2 rounded-full shadow-soft">
                               <Plus className="h-4 w-4 rotate-45" />
                            </div>
                         </div>
                       )}
                    </motion.div>
                  ))
                )}
             </div>
          </div>
        </div>

        {/* Main: Builder Canvas */}
        <div className="flex-1 flex flex-col gap-8">
          <GlassCard className="flex-1 !rounded-[4rem] p-12 flex flex-col relative overflow-hidden bg-white/40 border-none shadow-soft">
             <div className="absolute top-12 left-12 right-12 flex flex-col md:flex-row justify-between items-start md:items-center gap-6 z-10">
                <div className="space-y-1 w-full md:w-auto">
                  <input 
                    type="text" 
                    placeholder="Name your look..." 
                    value={outfitName}
                    onChange={(e) => setOutfitName(e.target.value)}
                    className="bg-transparent font-serif text-4xl text-aureve-charcoal border-none outline-none placeholder:text-aureve-gray/30 w-full focus:ring-0"
                  />
                  <p className="text-[10px] text-aureve-taupe uppercase tracking-widest font-bold pl-1">{selectedItems.length} items selected</p>
                </div>
                <div className="flex gap-4 w-full md:w-auto">
                   <button 
                     onClick={getAiAdvice}
                     disabled={selectedItems.length < 2 || isAnalyzing}
                     className="flex-1 md:flex-none bg-aureve-gold/10 text-aureve-gold px-8 py-4 rounded-full text-[10px] uppercase tracking-widest font-bold flex items-center justify-center gap-2 hover:bg-aureve-gold/20 disabled:opacity-50 transition-all border border-aureve-gold/20"
                   >
                     {isAnalyzing ? <Loader2 className="h-4 w-4 animate-spin" /> : <Sparkles className="h-4 w-4" />} 
                     Stylist Opinion
                   </button>
                   <button 
                     onClick={handleSave}
                     disabled={selectedItems.length === 0 || isSaving}
                     className="flex-1 md:flex-none bg-aureve-charcoal text-white px-10 py-4 rounded-full text-[10px] uppercase tracking-widest font-bold shadow-soft hover:bg-aureve-gold disabled:opacity-50 transition-all flex items-center justify-center gap-2"
                   >
                     <Save className="h-4 w-4" /> {isSaving ? "Saving..." : "Save Look"}
                   </button>
                </div>
             </div>

             <div className="flex-1 mt-32 mb-12 flex items-center justify-center relative">
                {selectedItems.length === 0 ? (
                  <div className="text-center space-y-6">
                     <div className="h-24 w-24 rounded-full border-2 border-dashed border-aureve-gray/30 flex items-center justify-center mx-auto text-aureve-gray/30">
                        <Plus className="h-12 w-12" />
                     </div>
                     <div className="space-y-2">
                        <p className="text-aureve-charcoal font-serif text-2xl">Start curating</p>
                        <p className="text-aureve-taupe text-sm uppercase tracking-widest">Add pieces from your wardrobe to build an ensemble</p>
                     </div>
                  </div>
                ) : (
                  <div className="grid grid-cols-2 md:grid-cols-3 gap-8 max-w-3xl w-full p-4 overflow-y-auto no-scrollbar max-h-full">
                     {selectedItems.map((item, idx) => (
                       <motion.div 
                         key={item.id}
                         layoutId={`item-${item.id}`}
                         initial={{ opacity: 0, scale: 0.8, rotate: idx % 2 === 0 ? -2 : 2 }}
                         animate={{ opacity: 1, scale: 1, rotate: 0 }}
                         className="relative aspect-[3/4] rounded-[2.5rem] overflow-hidden shadow-floating group bg-white p-2"
                       >
                          <div className="relative w-full h-full rounded-[2rem] overflow-hidden">
                             <Image src={item.image_url} alt={item.name} fill className="object-cover" />
                          </div>
                          <button 
                            onClick={(e) => { e.stopPropagation(); toggleItem(item); }}
                            className="absolute top-4 right-4 bg-aureve-charcoal/80 text-white backdrop-blur-md p-2 rounded-full opacity-0 group-hover:opacity-100 transition-all duration-300 hover:bg-red-500"
                          >
                            <X className="h-4 w-4" />
                          </button>
                          <div className="absolute bottom-6 left-6 right-6 opacity-0 group-hover:opacity-100 transition-opacity">
                             <p className="text-[8px] uppercase tracking-widest font-bold text-white bg-aureve-charcoal/40 backdrop-blur-sm px-3 py-1 rounded-full w-fit">{item.category}</p>
                          </div>
                       </motion.div>
                     ))}
                  </div>
                )}
             </div>

             <AnimatePresence>
                {aiFeedback && (
                  <motion.div 
                    initial={{ opacity: 0, y: 100 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 100 }}
                    className="absolute bottom-12 left-12 right-12 bg-aureve-charcoal text-white p-10 rounded-[3rem] shadow-2xl z-20 border border-white/10"
                  >
                     <div className="flex items-start gap-8">
                        <div className="bg-aureve-gold p-4 rounded-2xl mt-1 shadow-floating">
                           <Sparkles className="h-8 w-8 text-white" />
                        </div>
                        <div className="space-y-3 flex-1">
                           <div className="flex items-center gap-3">
                              <h4 className="text-xs uppercase tracking-[0.2em] font-bold text-aureve-gold">Stylist Perspective</h4>
                              <div className="h-px flex-1 bg-white/10" />
                           </div>
                           <p className="text-lg leading-relaxed text-aureve-cream font-serif italic">"{aiFeedback}"</p>
                        </div>
                        <button onClick={() => setAiFeedback(null)} className="text-white/30 hover:text-white transition-colors">
                           <X className="h-6 w-6" />
                        </button>
                     </div>
                  </motion.div>
                )}
             </AnimatePresence>
          </GlassCard>
        </div>
      </div>
    </DashboardLayout>
  );
}
