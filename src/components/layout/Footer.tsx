"use client";

import Link from "next/link";
import { Shirt } from "lucide-react";

export function Footer() {
  return (
    <footer className="relative z-10 flex flex-col items-center justify-center py-24 px-6 bg-[#F9F7F2] border-t border-aureve-muted/10">
      <div className="flex items-center gap-3 mb-10">
        <div className="relative h-10 w-10 overflow-hidden rounded-full border border-aureve-muted/20 opacity-50">
           <div className="absolute inset-0 bg-aureve-muted opacity-10" />
           <Shirt className="absolute inset-0 m-auto h-5 w-5 text-aureve-muted" />
        </div>
        <span className="font-serif text-2xl tracking-[0.2em] text-aureve-black uppercase font-bold opacity-40">Aera</span>
      </div>
      <div className="flex flex-wrap justify-center gap-x-12 gap-y-6 mb-12 text-[10px] font-bold uppercase tracking-[0.3em] text-aureve-muted/40 text-center">
         <Link href="/privacy-haven" className="hover:text-aureve-muted transition-colors">Privacy Haven</Link>
         <Link href="/terms-of-curation" className="hover:text-aureve-muted transition-colors">Terms of Curation</Link>
         <Link href="/about-us" className="hover:text-aureve-muted transition-colors">About Us</Link>
      </div>
      <p className="text-[9px] uppercase tracking-[0.6em] text-aureve-muted/20 text-center">
        Aera Sanctuary © {new Date().getFullYear()} — Designed with Intention
      </p>
    </footer>
  );
}
