"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";

export default function Home() {
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
    <div className="relative min-h-screen overflow-hidden bg-aureve-cream selection:bg-aureve-gold selection:text-white">
      {/* Background Texture Overlay */}
      <div 
        className="fixed inset-0 z-0 opacity-20 pointer-events-none mix-blend-multiply"
        style={{ backgroundImage: 'url("/texture.png")', backgroundSize: 'cover' }}
      />

      {/* Navigation */}
      <nav className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-6 py-8 md:px-12">
        <motion.div 
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          className="flex items-center gap-2"
        >
          <div className="relative h-10 w-10 md:h-12 md:w-12">
            <Image src="/logo.png" alt="Auréve Logo" fill className="object-contain" />
          </div>
          <span className="font-serif text-2xl tracking-tight text-aureve-charcoal md:text-3xl">Auréve</span>
        </motion.div>
        
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
        >
          <Link 
            href="/onboarding" 
            className="text-sm font-medium uppercase tracking-widest text-aureve-charcoal hover:text-aureve-gold transition-colors duration-300"
          >
            Log In
          </Link>
        </motion.div>
      </nav>

      {/* Hero Section */}
      <main className="relative z-10 flex min-h-screen flex-col items-center justify-center px-6 md:px-12">
        <div className="grid w-full max-w-7xl grid-cols-1 items-center gap-12 lg:grid-cols-2">
          
          {/* Text Content */}
          <motion.div 
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="flex flex-col items-start space-y-8"
          >
            <motion.div variants={itemVariants} className="flex flex-col space-y-2">
              <span className="text-sm font-medium uppercase tracking-[0.3em] text-aureve-gold">
                Meet Your AI Stylist
              </span>
              <h1 className="font-serif text-5xl leading-[1.1] text-aureve-charcoal md:text-7xl lg:text-8xl">
                Fashion with <br />
                <span className="italic">Intention.</span>
              </h1>
            </motion.div>
            
            <motion.p 
              variants={itemVariants}
              className="max-w-md text-lg leading-relaxed text-aureve-taupe md:text-xl"
            >
              The first AI-powered fashion assistant that understands your soul, protects your budget, and builds a wardrobe you'll love forever.
            </motion.p>
            
            <motion.div variants={itemVariants}>
              <Link
                href="/onboarding"
                className="group relative flex items-center gap-3 overflow-hidden rounded-full bg-aureve-charcoal px-8 py-4 text-white shadow-soft transition-all duration-500 hover:bg-aureve-gold hover:shadow-floating"
              >
                <span className="relative z-10 font-medium tracking-wide">Begin Your Journey</span>
                <ArrowRight className="relative z-10 h-5 w-5 transition-transform duration-500 group-hover:translate-x-1" />
              </Link>
            </motion.div>

            <motion.div variants={itemVariants} className="pt-4">
              <p className="text-xs uppercase tracking-widest text-aureve-taupe opacity-60">
                Calm • Personal • Ethical
              </p>
            </motion.div>
          </motion.div>

          {/* Image Hero */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1] }}
            className="relative hidden h-[600px] w-full lg:block"
          >
            <div className="absolute inset-0 overflow-hidden rounded-3xl shadow-floating transition-transform duration-700 hover:scale-[1.02]">
              <Image 
                src="/hero-fashion.png" 
                alt="Luxury Fashion Editorial" 
                fill 
                className="object-cover"
                priority
              />
              <div className="absolute inset-0 bg-gradient-to-t from-aureve-charcoal/20 to-transparent" />
            </div>
            
            {/* Floating Decorative Elements */}
            <motion.div
              animate={{ y: [0, -15, 0] }}
              transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
              className="absolute -bottom-6 -left-6 rounded-2xl border border-white/20 bg-white/30 p-6 backdrop-blur-md shadow-soft"
            >
              <p className="font-serif text-xl italic text-aureve-charcoal">"Truly personalized."</p>
              <p className="mt-1 text-[10px] uppercase tracking-widest text-aureve-taupe">Vogue AI Reviews</p>
            </motion.div>
          </motion.div>
        </div>
      </main>

      {/* Footer Decoration */}
      <div className="absolute bottom-8 left-0 right-0 z-10 flex justify-center opacity-30">
        <p className="text-[10px] uppercase tracking-[0.5em] text-aureve-charcoal">Auréve 2026</p>
      </div>
    </div>
  );
}
