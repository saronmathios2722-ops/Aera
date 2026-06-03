"use client";

import { motion } from "framer-motion";
import { Plus, Link as LinkIcon, Check } from "lucide-react";
import { useState } from "react";
import GlassCard from "@/components/ui/GlassCard";

export default function PinterestLink() {
  const [isLinked, setIsLinked] = useState(false);
  const [url, setUrl] = useState("");
  const [loading, setLoading] = useState(false);

  const handleLink = () => {
    if (!url) return;
    setLoading(true);
    // Simulate API call
    setTimeout(() => {
      setIsLinked(true);
      setLoading(false);
    }, 1500);
  };

  return (
    <GlassCard className="p-8 !rounded-3xl relative overflow-hidden">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div className="space-y-2">
          <div className="flex items-center gap-2">
            <div className="bg-red-500/10 p-2 rounded-lg">
              <LinkIcon className="h-5 w-5 text-red-500" />
            </div>
            <h3 className="font-serif text-2xl text-aureve-charcoal">Pinterest Sanctuary</h3>
          </div>
          <p className="text-sm text-aureve-taupe max-w-md">
            Link your Pinterest boards to help our AI understand your aesthetic evolution and dream wardrobe.
          </p>
        </div>

        {!isLinked ? (
          <div className="flex flex-col sm:flex-row gap-3 w-full md:w-auto">
            <input
              type="text"
              placeholder="Paste Pinterest Board URL"
              value={url}
              onChange={(e) => setUrl(e.target.value)}
              className="px-6 py-3 bg-white/50 border border-aureve-gray/30 rounded-full text-sm outline-none focus:ring-2 focus:ring-aureve-gold/20 transition-all w-full sm:w-64"
            />
            <button
              onClick={handleLink}
              disabled={loading || !url}
              className="bg-aureve-charcoal text-white px-8 py-3 rounded-full text-xs font-bold uppercase tracking-widest hover:bg-aureve-gold transition-all disabled:opacity-50"
            >
              {loading ? "Analyzing..." : "Link Board"}
            </button>
          </div>
        ) : (
          <motion.div 
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="flex items-center gap-3 bg-green-500/10 px-6 py-3 rounded-full border border-green-500/20"
          >
            <Check className="h-4 w-4 text-green-600" />
            <span className="text-xs font-bold text-green-700 uppercase tracking-widest">Board Linked & Analyzed</span>
          </motion.div>
        )}
      </div>

      {/* Decorative background element */}
      <div className="absolute top-0 right-0 -mr-8 -mt-8 h-32 w-32 bg-red-500/5 blur-3xl rounded-full" />
    </GlassCard>
  );
}
