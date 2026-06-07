"use client";

import { motion } from "framer-motion";
import { Footer } from "@/components/layout/Footer";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Shield, Heart, Eye } from "lucide-react";

export default function AboutUs() {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.3,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
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

      <main className="relative z-10 pt-40 pb-20 px-6 md:px-12 max-w-7xl mx-auto">
        <motion.div 
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="space-y-32"
        >
          {/* Hero Section */}
          <section className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div className="space-y-8">
              <motion.span variants={itemVariants} className="text-[10px] font-bold uppercase tracking-[0.5em] text-aureve-accent">
                The Story of Aera
              </motion.span>
              <motion.h1 variants={itemVariants} className="font-serif text-6xl md:text-7xl leading-tight">
                An Intentional <br />
                <span className="italic font-light text-aureve-muted/80">Revolution.</span>
              </motion.h1>
              <motion.p variants={itemVariants} className="max-w-md text-lg leading-relaxed text-aureve-muted/70 font-light">
                Aera was born from a simple realization: in an era of hyper-consumption, the most luxury thing we can own is our attention.
              </motion.p>
            </div>
            <motion.div 
              variants={itemVariants}
              className="relative h-[500px] rounded-3xl overflow-hidden shadow-floating transform rotate-1"
            >
              <Image 
                src="https://images.unsplash.com/photo-1441984904996-e0b6ba687e04?auto=format&fit=crop&q=80&w=1200"
                alt="Editorial Fashion"
                fill
                className="object-cover brightness-95"
              />
            </motion.div>
          </section>

          {/* Philosophy Section */}
          <section className="space-y-20">
            <div className="text-center space-y-4">
              <span className="text-[10px] font-bold uppercase tracking-[0.5em] text-aureve-muted/50">Our Philosophy</span>
              <h2 className="font-serif text-4xl md:text-5xl">Style, Intended.</h2>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
              <motion.div variants={itemVariants} className="p-10 bg-white/40 backdrop-blur-xl rounded-[2.5rem] border border-white/40 shadow-soft space-y-6">
                <div className="h-12 w-12 rounded-2xl bg-aureve-cream flex items-center justify-center text-aureve-accent">
                  <Shield className="h-6 w-6 stroke-[1.5]" />
                </div>
                <h3 className="font-serif text-2xl italic">The Impulse Shield</h3>
                <p className="text-sm text-aureve-muted font-light leading-relaxed">
                  We don't just curate style; we protect your sanctuary. Our AI intervenes in the "dopamine loop" of impulsive spending, helping you pause and reflect before every acquisition.
                </p>
              </motion.div>

              <motion.div variants={itemVariants} className="p-10 bg-white/40 backdrop-blur-xl rounded-[2.5rem] border border-white/40 shadow-soft space-y-6">
                <div className="h-12 w-12 rounded-2xl bg-aureve-cream flex items-center justify-center text-aureve-accent">
                  <Eye className="h-6 w-6 stroke-[1.5]" />
                </div>
                <h3 className="font-serif text-2xl italic">Curated Clarity</h3>
                <p className="text-sm text-aureve-muted font-light leading-relaxed">
                  Every item in your wardrobe should tell a story. We help you define your Style DNA, transforming a collection of clothes into a coherent editorial vision of yourself.
                </p>
              </motion.div>

              <motion.div variants={itemVariants} className="p-10 bg-white/40 backdrop-blur-xl rounded-[2.5rem] border border-white/40 shadow-soft space-y-6">
                <div className="h-12 w-12 rounded-2xl bg-aureve-cream flex items-center justify-center text-aureve-accent">
                  <Heart className="h-6 w-6 stroke-[1.5]" />
                </div>
                <h3 className="font-serif text-2xl italic">Emotional IQ</h3>
                <p className="text-sm text-aureve-muted font-light leading-relaxed">
                  Fashion is emotional. Aera understands the "why" behind your desires, helping you build a relationship with your wardrobe based on longevity and love, not fleeting trends.
                </p>
              </motion.div>
            </div>
          </section>

          {/* Mission Statement */}
          <section className="relative py-32 overflow-hidden rounded-[3rem] bg-aureve-black text-white text-center px-6">
            <Image 
              src="https://images.unsplash.com/photo-1558769132-cb1aea458c5e?auto=format&fit=crop&q=80&w=1600"
              alt="Mission Background"
              fill
              className="object-cover opacity-10 grayscale"
            />
            <div className="relative z-10 max-w-3xl mx-auto space-y-10">
              <h2 className="font-serif text-4xl md:text-5xl leading-tight italic font-light">
                "Our mission is to help the world breathe again in a sea of consumption."
              </h2>
              <div className="h-px w-20 bg-aureve-accent mx-auto" />
              <p className="text-aureve-base/60 font-light leading-relaxed">
                By combining advanced behavioral AI with a deep understanding of luxury aesthetics, we empower individuals to reclaim their financial well-being and build wardrobes that truly reflect their highest selves.
              </p>
              <Link
                href="/onboarding"
                className="inline-flex items-center gap-4 bg-white text-aureve-black px-10 py-5 rounded-full font-bold text-xs uppercase tracking-[0.2em] hover:bg-aureve-accent transition-colors duration-500"
              >
                Begin Your Ritual <ArrowRight className="h-4 w-4" />
              </Link>
            </div>
          </section>
        </motion.div>
      </main>

      <Footer />
    </div>
  );
}
