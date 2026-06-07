"use client";

import Image from "next/image";
import Link from "next/link";
import { motion, useScroll, useTransform, Variants } from "framer-motion";
import { ArrowRight, Shirt, Sparkles, Wind, Layout, Heart } from "lucide-react";
import { useRef } from "react";

import { Footer } from "@/components/layout/Footer";

export default function Home() {
  const targetRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: targetRef,
    offset: ["start start", "end start"],
  });

  const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);
  const scale = useTransform(scrollYProgress, [0, 0.5], [1, 0.95]);

  const containerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.3,
      },
    },
  };

  const itemVariants: Variants = {
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
    <div className="relative min-h-screen overflow-x-hidden bg-[#F9F7F2] selection:bg-aureve-accent selection:text-white font-sans text-aureve-black">
      {/* Background Texture Overlay - Subtle Paper/Grain */}
      <div 
        className="fixed inset-0 z-0 opacity-[0.15] pointer-events-none mix-blend-multiply"
        style={{ backgroundImage: 'url("https://www.transparenttextures.com/patterns/natural-paper.png")' }}
      />

      {/* Navigation */}
      <nav className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-6 py-8 md:px-12 backdrop-blur-sm bg-white/5">
        <motion.div 
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          className="flex items-center gap-3"
        >
          <div className="relative h-10 w-10 overflow-hidden rounded-full border border-aureve-muted/20">
             <div className="absolute inset-0 bg-gradient-to-br from-aureve-muted to-aureve-accent opacity-20" />
             <Shirt className="absolute inset-0 m-auto h-5 w-5 text-aureve-muted" />
          </div>
          <span className="font-serif text-2xl tracking-[0.2em] text-aureve-black uppercase font-bold md:text-3xl">Aera</span>
        </motion.div>
        
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          className="flex items-center gap-10"
        >
          <Link 
            href="/onboarding" 
            className="hidden text-[10px] font-bold uppercase tracking-[0.3em] text-aureve-muted/60 hover:text-aureve-muted transition-colors duration-300 md:block"
          >
            The Experience
          </Link>
          <Link 
            href="/onboarding" 
            className="text-[10px] font-bold uppercase tracking-[0.3em] text-aureve-black border-b border-aureve-muted/30 pb-1 hover:border-aureve-muted transition-all duration-300"
          >
            Enter Sanctuary
          </Link>
        </motion.div>
      </nav>

      {/* Hero Section */}
      <motion.main 
        ref={targetRef}
        style={{ opacity, scale }}
        className="relative z-10 flex min-h-screen flex-col items-center justify-center px-6 md:px-12 pt-20"
      >
        <div className="grid w-full max-w-7xl grid-cols-1 items-center gap-16 lg:grid-cols-2">
          
          {/* Text Content */}
          <motion.div 
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="flex flex-col items-start space-y-10"
          >
            <motion.div variants={itemVariants} className="flex flex-col space-y-4">
              <span className="text-[10px] font-bold uppercase tracking-[0.5em] text-aureve-accent">
                Aesthetic Mastery. Absolute Intent.
              </span>
              <h1 className="font-serif text-6xl leading-[1] text-aureve-black md:text-[5.5rem] lg:text-[6.5rem]">
                Style, <br />
                <span className="italic font-light text-aureve-muted/80">Intended.</span>
              </h1>
            </motion.div>
            
            <motion.p 
              variants={itemVariants}
              className="max-w-md text-lg leading-relaxed text-aureve-muted/70 font-light"
            >
              Aera is your personal fashion sanctuary. Intelligently curating your wardrobe, protecting your budget, and refining your soul.
            </motion.p>
            
            <motion.div variants={itemVariants} className="flex flex-col gap-8 sm:flex-row sm:items-center">
              <Link
                href="/onboarding"
                className="group relative flex items-center gap-4 overflow-hidden rounded-full bg-aureve-black px-10 py-6 text-[#F9F7F2] shadow-floating transition-all duration-700 hover:bg-aureve-muted"
              >
                <span className="relative z-10 font-bold text-xs uppercase tracking-[0.2em]">Enter Aera</span>
                <ArrowRight className="relative z-10 h-4 w-4 transition-transform duration-500 group-hover:translate-x-2" />
                <div className="absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/10 to-transparent transition-transform duration-1000 group-hover:translate-x-full" />
              </Link>
              
              <div className="flex items-center gap-3 text-[10px] font-bold uppercase tracking-[0.3em] text-aureve-accent">
                <span className="h-[1px] w-12 bg-aureve-base" />
                <span>Emotionally Intelligent AI</span>
              </div>
            </motion.div>
          </motion.div>

          {/* Cinematic Image Grid */}
          <motion.div
            initial={{ opacity: 0, scale: 0.98 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1.5, ease: [0.22, 1, 0.36, 1] }}
            className="relative h-[600px] w-full lg:h-[750px]"
          >
            {/* Layered Images for a Boutique Feel */}
            <div className="absolute inset-0 z-10 grid grid-cols-12 grid-rows-12 gap-4 h-full w-full">
               {/* Main Style Journey Photo */}
               <div className="col-start-1 col-end-10 row-start-1 row-end-11 relative overflow-hidden rounded-2xl shadow-floating transform -rotate-1">
                  <Image 
                    src="https://images.unsplash.com/photo-1490481651871-ab68de25d43d?auto=format&fit=crop&q=80&w=1200" 
                    alt="Style Journey" 
                    fill 
                    className="object-cover brightness-[0.85] transition-transform duration-1000 hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-aureve-black/40 to-transparent" />
               </div>

               {/* Detail: Fashion focus */}
               <motion.div 
                 animate={{ y: [0, -10, 0] }}
                 transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
                 className="col-start-8 col-end-13 row-start-7 row-end-12 relative overflow-hidden rounded-2xl shadow-floating z-20 border-4 border-[#F9F7F2]"
               >
                  <Image 
                    src="https://images.unsplash.com/photo-1490481651871-ab68de25d43d?auto=format&fit=crop&q=80&w=600" 
                    alt="Fashion Detail" 
                    fill 
                    className="object-cover"
                  />
               </motion.div>

               {/* Detail: Luxury Boutique */}
               <motion.div 
                 animate={{ y: [0, 15, 0] }}
                 transition={{ duration: 8, repeat: Infinity, ease: "easeInOut", delay: 1 }}
                 className="col-start-2 col-end-6 row-start-9 row-end-13 relative overflow-hidden rounded-2xl shadow-soft z-30 border-2 border-[#F9F7F2]/50"
               >
                  <Image 
                    src="https://images.unsplash.com/photo-1481437156560-3205f6a55735?auto=format&fit=crop&q=80&w=600" 
                    alt="Luxury Boutique" 
                    fill 
                    className="object-cover brightness-90"
                  />
               </motion.div>
            </div>
            
            {/* Floating Floating Leaf / Sparkle elements */}
            <div className="absolute -top-10 -left-10 h-40 w-40 bg-aureve-accent/10 blur-[80px] rounded-full pointer-events-none" />
            <div className="absolute -bottom-10 -right-10 h-40 w-40 bg-aureve-muted/10 blur-[80px] rounded-full pointer-events-none" />
          </motion.div>
        </div>
      </motion.main>

      {/* The Atmosphere Section - Slow, Premium Scroll */}
      <section className="relative z-10 bg-white py-40 px-6 md:px-12">
        <div className="mx-auto max-w-7xl">
          <div className="mb-24 flex flex-col items-center text-center space-y-4">
             <span className="text-[10px] font-bold uppercase tracking-[0.5em] text-aureve-muted/50">The Sanctuary Pillars</span>
             <h2 className="font-serif text-5xl text-aureve-black">Crafted with Patience</h2>
          </div>

          <div className="grid grid-cols-1 gap-20 md:grid-cols-3">
            <motion.div whileHover={{ y: -10 }} className="flex flex-col items-center text-center space-y-6 group">
              <div className="h-16 w-16 rounded-2xl bg-aureve-cream flex items-center justify-center text-aureve-muted shadow-soft group-hover:bg-aureve-accent group-hover:text-white transition-colors duration-500">
                <Layout className="h-7 w-7 stroke-[1.5]" />
              </div>
              <h3 className="font-serif text-3xl text-aureve-black italic">Emotional Insight</h3>
              <p className="text-aureve-muted/70 leading-relaxed font-light">We identify your "why." Our AI understands the emotional triggers behind every purchase, helping you spend with clarity and love.</p>
            </motion.div>

            <motion.div whileHover={{ y: -10 }} className="flex flex-col items-center text-center space-y-6 group">
              <div className="h-16 w-16 rounded-2xl bg-aureve-cream flex items-center justify-center text-aureve-muted shadow-soft group-hover:bg-aureve-accent group-hover:text-white transition-colors duration-500">
                <Wind className="h-7 w-7 stroke-[1.5]" />
              </div>
              <h3 className="font-serif text-3xl text-aureve-black italic">Conscious Budgeting</h3>
              <p className="text-aureve-muted/70 leading-relaxed font-light">A budget tracker that feels like a calm exhale. Protective, serene, and designed to grow your long-term fashion wealth.</p>
            </motion.div>

            <motion.div whileHover={{ y: -10 }} className="flex flex-col items-center text-center space-y-6 group">
              <div className="h-16 w-16 rounded-2xl bg-aureve-cream flex items-center justify-center text-aureve-muted shadow-soft group-hover:bg-aureve-accent group-hover:text-white transition-colors duration-500">
                <Sparkles className="h-7 w-7 stroke-[1.5]" />
              </div>
              <h3 className="font-serif text-3xl text-aureve-black italic">Timeless Capsules</h3>
              <p className="text-aureve-muted/70 leading-relaxed font-light">Wardrobes that only get better with time. We curate pieces that belong to your story, creating capsules that stand the test of seasons.</p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Atmospheric Quote Section */}
      <section className="relative h-[60vh] flex items-center justify-center overflow-hidden bg-aureve-black">
         <Image 
           src="https://images.unsplash.com/photo-1523381235312-3a1647fa9921?auto=format&fit=crop&q=80&w=1600" 
           alt="Fabric Texture" 
           fill 
           className="object-cover opacity-20 grayscale"
         />
         <div className="relative z-10 max-w-4xl px-6 text-center">
            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ duration: 1 }}
              className="space-y-8"
            >
               <h2 className="font-serif text-4xl md:text-6xl text-aureve-base leading-tight italic font-light">
                 "Style is the ritual of showing <br /> who you are without having to speak."
               </h2>
               <div className="h-px w-20 bg-aureve-accent mx-auto" />
               <p className="text-[10px] uppercase tracking-[0.5em] text-aureve-base/50">The Aera Philosophy</p>
            </motion.div>
         </div>
      </section>

      <Footer />
    </div>
  );
}
