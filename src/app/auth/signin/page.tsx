'use client';

import Link from "next/link";
import { signIn } from "next-auth/react";
import { useState } from "react";
import { motion } from "framer-motion";
import Image from "next/image";

export default function SignIn() {
  const [email, setEmail] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await signIn("credentials", { email, callbackUrl: "/onboarding" });
  };

  return (
    <div className="relative flex min-h-screen items-center justify-center bg-aureve-cream overflow-hidden px-6">
      {/* Background Texture */}
      <div 
        className="fixed inset-0 z-0 opacity-20 pointer-events-none mix-blend-multiply"
        style={{ backgroundImage: 'url("/texture.png")', backgroundSize: 'cover' }}
      />

      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
        className="relative z-10 w-full max-w-md"
      >
        <div className="bg-white/40 backdrop-blur-xl border border-white/20 p-12 rounded-[2.5rem] shadow-floating">
          <div className="flex flex-col items-center mb-12">
            <div className="relative h-16 w-16 mb-6">
              <Image src="/logo.png" alt="Aera Logo" fill className="object-contain" />
            </div>
            <h1 className="text-4xl font-serif text-aureve-charcoal tracking-tight">Aera</h1>
            <p className="text-[10px] uppercase tracking-[0.4em] text-aureve-taupe mt-3 font-semibold">Sanctuary of Intentionality</p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-8">
            <div className="space-y-2">
              <label htmlFor="email" className="block text-[10px] font-bold text-aureve-taupe uppercase tracking-[0.2em] ml-1">Email Address</label>
              <input
                id="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="style@aureve.com"
                className="w-full bg-white/50 p-5 rounded-2xl border border-aureve-gray/30 text-aureve-charcoal placeholder:text-aureve-taupe/40 focus:outline-none focus:ring-2 focus:ring-aureve-gold/20 transition-all text-lg"
                required
              />
            </div>
            
            <button
              type="submit"
              className="w-full p-5 bg-aureve-charcoal text-white rounded-2xl font-medium tracking-wide hover:bg-aureve-gold hover:shadow-floating transition-all duration-500 shadow-soft"
            >
              Enter Sanctuary
            </button>
          </form>

          <div className="mt-12 text-center">
            <p className="text-xs text-aureve-taupe leading-relaxed">
              By entering, you agree to our <br />
              <Link href="/terms-of-curation" className="text-aureve-charcoal underline cursor-pointer hover:text-aureve-accent transition-colors">Terms of Curation</Link> and <Link href="/privacy-haven" className="text-aureve-charcoal underline cursor-pointer hover:text-aureve-accent transition-colors">Privacy Haven</Link>.
            </p>
          </div>
        </div>

        {/* Footer decoration */}
        <div className="mt-8 text-center opacity-30">
           <p className="text-[9px] uppercase tracking-[0.6em] text-aureve-charcoal font-bold">Est. 2026</p>
        </div>
      </motion.div>

      {/* Floating Blobs */}
      <div className="absolute -bottom-32 -right-32 h-96 w-96 rounded-full bg-aureve-gold/10 blur-[120px] pointer-events-none" />
      <div className="absolute -top-32 -left-32 h-96 w-96 rounded-full bg-aureve-taupe/10 blur-[120px] pointer-events-none" />
    </div>
  );
}
