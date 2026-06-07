"use client";

import { motion } from "framer-motion";
import { Footer } from "@/components/layout/Footer";
import Link from "next/link";
import { Scale, ShieldAlert, CheckCircle, HelpCircle } from "lucide-react";

export default function TermsOfCuration() {
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
              The Agreement of Intent
            </motion.span>
            <motion.h1 variants={itemVariants} className="font-serif text-6xl md:text-7xl leading-tight">
              Terms of <span className="italic font-light text-aureve-muted/80">Curation.</span>
            </motion.h1>
            <motion.p variants={itemVariants} className="text-lg leading-relaxed text-aureve-muted/70 font-light max-w-2xl mx-auto">
              By entering the Aera Sanctuary, you agree to the principles of intentionality and the ethical use of our AI styling services.
            </motion.p>
          </div>

          {/* Key Terms */}
          <section className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <motion.div variants={itemVariants} className="p-8 bg-white/30 backdrop-blur-md rounded-3xl border border-white/40 shadow-soft space-y-4">
              <CheckCircle className="h-6 w-6 text-aureve-accent" />
              <h3 className="font-serif text-xl italic">The Ritual</h3>
              <p className="text-sm text-aureve-muted/80 font-light leading-relaxed">
                Our services are designed to assist you in curating a more intentional wardrobe. You retain all responsibility for your financial decisions.
              </p>
            </motion.div>

            <motion.div variants={itemVariants} className="p-8 bg-white/30 backdrop-blur-md rounded-3xl border border-white/40 shadow-soft space-y-4">
              <Scale className="h-6 w-6 text-aureve-accent" />
              <h3 className="font-serif text-xl italic">Fair Use</h3>
              <p className="text-sm text-aureve-muted/80 font-light leading-relaxed">
                The "Impulse Shield" and "Style DNA" analysis are provided for personal use only. Commercial exploitation of Aera's algorithms is strictly prohibited.
              </p>
            </motion.div>
          </section>

          {/* Detailed Policy */}
          <section className="prose prose-aureve max-w-none space-y-12">
            <motion.div variants={itemVariants} className="space-y-6">
              <h2 className="font-serif text-3xl italic">1. Acceptance of Terms</h2>
              <p className="text-aureve-muted/80 font-light leading-relaxed">
                By accessing or using the Aera platform, you agree to be bound by these Terms of Curation and our Privacy Haven policy.
              </p>
            </motion.div>

            <motion.div variants={itemVariants} className="space-y-6">
              <h2 className="font-serif text-3xl italic">2. Curation Services</h2>
              <p className="text-aureve-muted/80 font-light leading-relaxed">
                Aera provides AI-driven style suggestions and financial spending coaching. These suggestions are based on the data you provide during the onboarding ritual.
              </p>
            </motion.div>

            <motion.div variants={itemVariants} className="space-y-6">
              <h2 className="font-serif text-3xl italic">3. Subscription Sanctuary</h2>
              <p className="text-aureve-muted/80 font-light leading-relaxed">
                Premium features within "The Sanctuary" are provided on a monthly subscription basis. You may pause or cancel your subscription at any time through your profile settings.
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
