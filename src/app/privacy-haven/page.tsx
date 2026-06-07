"use client";

import { motion } from "framer-motion";
import { Footer } from "@/components/layout/Footer";
import Link from "next/link";
import { ShieldCheck, Lock, EyeOff, Sparkles } from "lucide-react";

export default function PrivacyHaven() {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 15 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.8,
        ease: [0.22, 1, 0.36, 1],
      },
    },
  };

  return (
    <div className="relative min-h-screen overflow-x-hidden bg-[#F9F7F2] font-sans text-aureve-black">
      {/* Background Texture */}
      <div 
        className="fixed inset-0 z-0 opacity-[0.05] pointer-events-none mix-blend-multiply"
        style={{ backgroundImage: 'url("https://www.transparenttextures.com/patterns/natural-paper.png")' }}
      />

      {/* Navigation */}
      <nav className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-6 py-8 md:px-12 backdrop-blur-sm bg-white/5">
        <Link href="/" className="font-serif text-2xl tracking-[0.2em] text-aureve-black uppercase font-bold">
          Aera
        </Link>
        <Link 
          href="/onboarding" 
          className="text-[10px] font-bold uppercase tracking-[0.3em] text-aureve-black border-b border-aureve-muted/30 pb-1 hover:border-aureve-muted transition-all duration-300"
        >
          Enter Sanctuary
        </Link>
      </nav>

      <main className="relative z-10 pt-40 pb-20 px-6 md:px-12 max-w-4xl mx-auto">
        <motion.div 
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="space-y-24"
        >
          {/* Header */}
          <div className="text-center space-y-6">
            <motion.span variants={itemVariants} className="text-[10px] font-bold uppercase tracking-[0.5em] text-aureve-accent">
              Your Digital Sanctuary
            </motion.span>
            <motion.h1 variants={itemVariants} className="font-serif text-6xl md:text-7xl leading-tight">
              Privacy <span className="italic font-light text-aureve-muted/80">Haven.</span>
            </motion.h1>
            <motion.p variants={itemVariants} className="text-lg leading-relaxed text-aureve-muted/70 font-light max-w-2xl mx-auto">
              In the Aera Sanctuary, your data is as sacred as your style. We believe true luxury requires absolute peace of mind.
            </motion.p>
          </div>

          {/* Core Principles */}
          <section className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <motion.div variants={itemVariants} className="p-8 bg-white/30 backdrop-blur-md rounded-3xl border border-white/40 shadow-soft space-y-4">
              <ShieldCheck className="h-6 w-6 text-aureve-accent" />
              <h3 className="font-serif text-xl italic">Absolute Curation</h3>
              <p className="text-sm text-aureve-muted/80 font-light leading-relaxed">
                We only collect what is necessary to refine your Style DNA. We never sell your data to third parties. Your intentions are yours alone.
              </p>
            </motion.div>

            <motion.div variants={itemVariants} className="p-8 bg-white/30 backdrop-blur-md rounded-3xl border border-white/40 shadow-soft space-y-4">
              <Lock className="h-6 w-6 text-aureve-accent" />
              <h3 className="font-serif text-xl italic">Encrypted Elegance</h3>
              <p className="text-sm text-aureve-muted/80 font-light leading-relaxed">
                Using enterprise-grade encryption, we ensure that your wardrobe analysis and financial goals remain entirely private.
              </p>
            </motion.div>

            <motion.div variants={itemVariants} className="p-8 bg-white/30 backdrop-blur-md rounded-3xl border border-white/40 shadow-soft space-y-4">
              <EyeOff className="h-6 w-6 text-aureve-accent" />
              <h3 className="font-serif text-xl italic">Anonymized Insights</h3>
              <p className="text-sm text-aureve-muted/80 font-light leading-relaxed">
                Behavioral patterns used to train our AI are anonymized, ensuring the "Impulse Shield" works for everyone without exposing anyone.
              </p>
            </motion.div>

            <motion.div variants={itemVariants} className="p-8 bg-white/30 backdrop-blur-md rounded-3xl border border-white/40 shadow-soft space-y-4">
              <Sparkles className="h-6 w-6 text-aureve-accent" />
              <h3 className="font-serif text-xl italic">Radiant Control</h3>
              <p className="text-sm text-aureve-muted/80 font-light leading-relaxed">
                You have the absolute right to delete your sanctuary profile at any time. We erase all traces of your Style DNA upon request.
              </p>
            </motion.div>
          </section>

          {/* Detailed Policy */}
          <section className="prose prose-aureve max-w-none space-y-12">
            <motion.div variants={itemVariants} className="space-y-6">
              <h2 className="font-serif text-3xl italic">The Ritual of Data Collection</h2>
              <p className="text-aureve-muted/80 font-light leading-relaxed">
                When you enter the Sanctuary, we ask for your name and email to create your profile. As you engage with the onboarding ritual and style manifestations, we process your preferences to generate your unique Style Blueprint. This information is used exclusively to improve your personal experience within Aera.
              </p>
            </motion.div>

            <motion.div variants={itemVariants} className="space-y-6">
              <h2 className="font-serif text-3xl italic">Sanctuary Security</h2>
              <p className="text-aureve-muted/80 font-light leading-relaxed">
                Our infrastructure is built on the philosophy of "Safety First." We implement strict technical and organizational measures to protect your personal information against unauthorized access, loss, or alteration.
              </p>
            </motion.div>

            <motion.div variants={itemVariants} className="space-y-6">
              <h2 className="font-serif text-3xl italic">Your Rights</h2>
              <p className="text-aureve-muted/80 font-light leading-relaxed">
                You may request access to, correction of, or deletion of your personal data at any time. If you have questions about our privacy practices, our stewards are available at privacy@aera.style.
              </p>
            </motion.div>
          </section>

          <motion.div variants={itemVariants} className="pt-10 border-t border-aureve-muted/10 text-center">
            <p className="text-[10px] uppercase tracking-[0.3em] text-aureve-muted/40">
              Last updated: June 2026
            </p>
          </motion.div>
        </motion.div>
      </main>

      <Footer />
    </div>
  );
}
