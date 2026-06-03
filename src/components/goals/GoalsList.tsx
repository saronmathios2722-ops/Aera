"use client";

import { motion } from "framer-motion";
import { Target, CheckCircle2, Circle } from "lucide-react";
import GlassCard from "@/components/ui/GlassCard";

const goals = [
  { 
    id: 1, 
    title: "Minimalist Work Capsule", 
    description: "Curate 12 essential pieces for a professional, versatile wardrobe.", 
    progress: 75, 
    deadline: "Sept 2026",
    status: "On Track" 
  },
  { 
    id: 2, 
    title: "Ethical Fabric Transition", 
    description: "Replace polyester items with organic cotton or linen alternatives.", 
    progress: 40, 
    deadline: "Dec 2026",
    status: "Emerging" 
  },
  { 
    id: 3, 
    title: "Signature Evening Look", 
    description: "Find the perfect tailored blazer and silk slip dress combination.", 
    progress: 100, 
    deadline: "Completed",
    status: "Achieved" 
  },
];

export default function GoalsList() {
  return (
    <div className="space-y-6">
      <div className="flex items-center gap-2">
        <Target className="h-5 w-5 text-aureve-gold" />
        <h2 className="text-xs uppercase tracking-[0.2em] font-semibold text-aureve-taupe">Style Milestones</h2>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {goals.map((goal, idx) => (
          <GlassCard key={goal.id} className="p-8 !rounded-3xl relative overflow-hidden group" delay={idx * 0.1}>
            <div className="relative z-10 space-y-6">
              <div className="flex justify-between items-start">
                <span className={`text-[9px] uppercase tracking-widest px-2 py-1 rounded-full border ${
                  goal.progress === 100 ? 'border-green-500 text-green-600 bg-green-500/5' : 'border-aureve-gold/30 text-aureve-gold'
                }`}>
                  {goal.status}
                </span>
                {goal.progress === 100 ? (
                  <CheckCircle2 className="h-5 w-5 text-green-500" />
                ) : (
                  <Circle className="h-5 w-5 text-aureve-taupe/30" />
                )}
              </div>

              <div>
                <h3 className="font-serif text-2xl text-aureve-charcoal mb-2">{goal.title}</h3>
                <p className="text-xs text-aureve-taupe leading-relaxed">{goal.description}</p>
              </div>

              <div className="space-y-2">
                <div className="flex justify-between text-[10px] uppercase tracking-widest text-aureve-taupe font-bold">
                  <span>Progress</span>
                  <span>{goal.progress}%</span>
                </div>
                <div className="h-1.5 w-full bg-aureve-gray/20 rounded-full overflow-hidden">
                  <motion.div 
                    initial={{ width: 0 }}
                    animate={{ width: `${goal.progress}%` }}
                    transition={{ duration: 1, delay: 0.5 + idx * 0.1 }}
                    className={`h-full rounded-full ${goal.progress === 100 ? 'bg-green-500' : 'bg-aureve-gold'}`}
                  />
                </div>
              </div>

              <div className="pt-4 flex justify-between items-center border-t border-aureve-gray/10">
                <span className="text-[10px] uppercase tracking-widest text-aureve-taupe">Deadline</span>
                <span className="text-xs font-serif text-aureve-charcoal">{goal.deadline}</span>
              </div>
            </div>
            
            {/* Background Decoration */}
            <div className="absolute -bottom-6 -right-6 h-24 w-24 bg-aureve-gold/5 rounded-full blur-2xl transition-transform duration-500 group-hover:scale-150" />
          </GlassCard>
        ))}

        <GlassCard className="p-8 !rounded-3xl border-dashed border-2 bg-transparent shadow-none flex flex-col items-center justify-center text-center group cursor-pointer hover:bg-white/10 transition-colors">
          <div className="h-12 w-12 rounded-full bg-aureve-cream flex items-center justify-center text-aureve-taupe mb-4 group-hover:text-aureve-gold transition-colors">
            <Plus className="h-6 w-6" />
          </div>
          <p className="text-xs uppercase tracking-widest text-aureve-taupe font-bold">Define New Milestone</p>
        </GlassCard>
      </div>
    </div>
  );
}

function Plus({ className }: { className?: string }) {
  return (
    <svg 
      xmlns="http://www.w3.org/2000/svg" 
      width="24" 
      height="24" 
      viewBox="0 0 24 24" 
      fill="none" 
      stroke="currentColor" 
      strokeWidth="2" 
      strokeLinecap="round" 
      strokeLinejoin="round" 
      className={className}
    >
      <path d="M5 12h14" />
      <path d="M12 5v14" />
    </svg>
  );
}
