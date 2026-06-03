"use client";

import DashboardLayout from "@/components/layout/DashboardLayout";
import GoalsList from "@/components/goals/GoalsList";
import SpendingBehavior from "@/components/goals/SpendingBehavior";
import ConfidenceTracker from "@/components/goals/ConfidenceTracker";
import SavingsImpact from "@/components/goals/SavingsImpact";
import { motion } from "framer-motion";
import GlassCard from "@/components/ui/GlassCard";
import { Target, TrendingUp, ShieldCheck, Heart } from "lucide-react";

export default function GoalsPage() {
  return (
    <div className="space-y-24">
      {/* Header Section - Editorial Style */}
      <section className="relative overflow-hidden">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 items-end">
          <div className="lg:col-span-8 space-y-8">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
            >
              <h2 className="text-[10px] uppercase tracking-[1em] text-aureve-accent font-black mb-6">Intentionality & Impact</h2>
              <h1 className="text-7xl md:text-8xl lg:text-9xl font-serif text-aureve-charcoal leading-[0.85] tracking-tighter italic font-light">
                Growth <br />
                <span className="not-italic">Insights.</span>
              </h1>
            </motion.div>
            
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.6, duration: 1 }}
              className="text-xl text-aureve-muted font-light max-w-2xl leading-relaxed"
            >
              A refined overview of your journey toward a <span className="text-aureve-charcoal font-medium">highly curated existence</span>. 
              Track your milestones, understand your style psychology, and visualize the impact of intentional choices.
            </motion.p>
          </div>
          
          <div className="lg:col-span-4 flex justify-end">
             <GlassCard className="p-10 w-full" hover>
                <div className="space-y-6">
                   <div className="flex justify-between items-center">
                      <p className="text-[9px] uppercase tracking-widest text-aureve-muted font-bold">Overall Progress</p>
                      <span className="text-2xl font-serif text-aureve-accent">72%</span>
                   </div>
                   <div className="h-[2px] w-full bg-aureve-base/10 rounded-full overflow-hidden">
                      <motion.div 
                        initial={{ width: 0 }}
                        animate={{ width: "72%" }}
                        transition={{ delay: 1, duration: 2, ease: [0.16, 1, 0.3, 1] }}
                        className="h-full bg-aureve-accent"
                      />
                   </div>
                   <p className="text-[10px] text-aureve-muted leading-relaxed">
                      You are <span className="text-aureve-charcoal font-bold">12%</span> ahead of your monthly intentionality goal.
                   </p>
                </div>
             </GlassCard>
          </div>
        </div>
      </section>

      {/* Quick Stats Ribbon */}
      <section className="grid grid-cols-2 md:grid-cols-4 gap-8">
        {[
          { label: "Milestones", value: "8", icon: Target },
          { label: "Confidence", value: "+14%", icon: Heart },
          { label: "Intentional", value: "92%", icon: ShieldCheck },
          { label: "Efficiency", value: "High", icon: TrendingUp },
        ].map((stat, i) => (
          <div key={stat.label} className="text-center space-y-4">
             <div className="h-16 w-16 rounded-full border border-aureve-base/10 mx-auto flex items-center justify-center text-aureve-accent/40">
                <stat.icon size={20} strokeWidth={1} />
             </div>
             <div>
                <p className="text-[8px] uppercase tracking-[0.4em] text-aureve-muted font-black mb-1">{stat.label}</p>
                <p className="text-2xl font-serif text-aureve-charcoal">{stat.value}</p>
             </div>
          </div>
        ))}
      </section>

      {/* Goals Tracker */}
      <section className="space-y-12">
        <div className="flex items-end justify-between px-2">
          <div className="space-y-4">
            <h2 className="text-[10px] uppercase tracking-[1em] text-aureve-accent font-black">Style Milestones</h2>
            <h3 className="text-5xl font-serif text-aureve-charcoal italic font-light">Long-term Trajectory</h3>
          </div>
        </div>
        <GoalsList />
      </section>

      {/* Analytics Grid */}
      <section className="grid grid-cols-1 xl:grid-cols-2 gap-24 items-start">
        <div className="space-y-12">
          <div className="space-y-4 px-2">
            <h2 className="text-[10px] uppercase tracking-[1em] text-aureve-accent font-black">Psychology</h2>
            <h3 className="text-5xl font-serif text-aureve-charcoal italic font-light">Spending Behavior</h3>
          </div>
          <SpendingBehavior />
        </div>
        <div className="space-y-12">
          <div className="space-y-4 px-2">
            <h2 className="text-[10px] uppercase tracking-[1em] text-aureve-accent font-black">Emotional ROI</h2>
            <h3 className="text-5xl font-serif text-aureve-charcoal italic font-light">Confidence Trend</h3>
          </div>
          <ConfidenceTracker />
        </div>
      </section>

      {/* Savings Impact */}
      <section className="space-y-12">
        <div className="flex items-end justify-between px-2">
          <div className="space-y-4">
            <h2 className="text-[10px] uppercase tracking-[1em] text-aureve-accent font-black">Economic Wisdom</h2>
            <h3 className="text-5xl font-serif text-aureve-charcoal italic font-light">Avoided Spending</h3>
          </div>
        </div>
        <SavingsImpact />
      </section>

      {/* Philosophy Statement */}
      <section className="py-40 border-y border-aureve-base/10 flex justify-center">
        <motion.div 
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1.5 }}
          className="max-w-4xl text-center space-y-16"
        >
          <div className="h-px w-32 bg-aureve-accent/30 mx-auto" />
          <p className="font-serif text-5xl md:text-6xl text-aureve-charcoal italic font-light leading-snug">
            "The most <span className="not-italic font-medium">sustainable</span> garment is the one already in your wardrobe, 
            styled with <span className="not-italic font-medium">unwavering intention</span>."
          </p>
          <div className="space-y-4">
             <p className="text-[10px] uppercase tracking-[0.8em] text-aureve-accent font-black">Aera Philosophy</p>
             <div className="h-1 w-1 bg-aureve-accent rounded-full mx-auto" />
          </div>
        </motion.div>
      </section>
    </div>
  );
}
