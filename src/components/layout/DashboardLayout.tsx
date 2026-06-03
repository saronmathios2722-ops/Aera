"use client";

import { ReactNode } from "react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { 
  LayoutDashboard, 
  ShoppingBag, 
  Shirt, 
  Palette, 
  Settings, 
  LogOut, 
  Sparkles, 
  Target,
  Heart,
  Menu
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

interface DashboardLayoutProps {
  children: ReactNode;
  userName?: string;
}

export default function DashboardLayout({ children, userName = "Style Enthusiast" }: DashboardLayoutProps) {
  const pathname = usePathname();

  const navItems = [
    { icon: LayoutDashboard, label: "Insights", href: "/dashboard" },
    { icon: ShoppingBag, label: "Intentional Shop", href: "/dashboard/shop" },
    { icon: Shirt, label: "Wardrobe Sanctuary", href: "/dashboard/wardrobe" },
    { icon: Sparkles, label: "Inspiration", href: "/dashboard/inspiration" },
    { icon: Target, label: "Growth Goals", href: "/dashboard/goals" },
    { icon: Palette, label: "Style DNA", href: "/dashboard/blueprint" },
  ];

  return (
    <div className="flex min-h-screen bg-aureve-cream text-aureve-charcoal font-sans selection:bg-aureve-accent/20 overflow-x-hidden">
      {/* Sidebar - Desktop */}
      <aside className="fixed inset-y-0 left-0 z-50 hidden w-80 flex-col border-r border-aureve-base/10 bg-white/30 backdrop-blur-3xl lg:flex">
        <div className="flex flex-col flex-1 px-12 py-16">
          <div className="flex items-center gap-5 mb-24">
            <div className="relative h-14 w-14 overflow-hidden rounded-full border border-aureve-accent/30 bg-white shadow-soft flex items-center justify-center group cursor-pointer">
               <span className="font-serif text-2xl italic text-aureve-accent transition-transform duration-700 group-hover:scale-125">A</span>
               <div className="absolute inset-0 bg-aureve-accent/5 opacity-0 group-hover:opacity-100 transition-opacity" />
            </div>
            <div className="space-y-0.5">
              <span className="block font-serif text-3xl tracking-[0.15em] text-aureve-charcoal font-light italic leading-none">Aera</span>
              <span className="block text-[8px] uppercase tracking-[0.6em] text-aureve-accent font-bold">Sanctuary</span>
            </div>
          </div>
          
          <nav className="flex-1 space-y-3">
            {navItems.map((item) => {
              const isActive = pathname === item.href;
              return (
                <Link
                  key={item.label}
                  href={item.href}
                  className="relative group block"
                >
                  <div className={`flex items-center gap-6 px-6 py-5 rounded-[2rem] transition-all duration-700 ${isActive ? 'bg-aureve-charcoal text-white shadow-floating scale-[1.02]' : 'hover:bg-aureve-base/5 text-aureve-muted'}`}>
                    <item.icon className={`h-5 w-5 stroke-[1] ${isActive ? 'text-aureve-accent' : 'group-hover:text-aureve-charcoal'}`} />
                    <span className={`text-[10px] uppercase tracking-[0.5em] font-medium leading-none transition-colors duration-500 ${isActive ? 'text-white' : 'group-hover:text-aureve-charcoal'}`}>
                      {item.label}
                    </span>
                  </div>
                </Link>
              );
            })}
          </nav>
          
          <div className="pt-16 border-t border-aureve-base/10 space-y-6">
            <Link
              href="/settings"
              className="flex items-center gap-6 px-6 py-4 text-aureve-muted hover:text-aureve-charcoal transition-all duration-500 group"
            >
              <Settings className="h-5 w-5 stroke-[1] group-hover:rotate-45 transition-transform duration-700" />
              <span className="text-[10px] uppercase tracking-[0.5em] font-medium">Settings</span>
            </Link>
            <button
              className="w-full flex items-center gap-6 px-6 py-4 text-aureve-muted hover:text-red-400 transition-all duration-500"
            >
              <LogOut className="h-5 w-5 stroke-[1]" />
              <span className="text-[10px] uppercase tracking-[0.5em] font-medium">Depart</span>
            </button>
          </div>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 lg:pl-80 relative">
        {/* Editorial Background Atmosphere */}
        <div className="absolute top-0 right-0 h-[1000px] w-[1000px] bg-aureve-accent/5 blur-[150px] pointer-events-none -z-10 rounded-full animate-pulse" />
        <div className="absolute bottom-0 left-0 h-[800px] w-[800px] bg-aureve-base/10 blur-[120px] pointer-events-none -z-10 rounded-full" />
        
        <header className="flex items-center justify-between px-10 py-12 md:px-20 md:py-16">
          <motion.div 
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
            className="flex items-center gap-8"
          >
            <div className="h-[1px] w-16 bg-aureve-accent/40 hidden md:block" />
            <p className="text-[10px] uppercase tracking-[0.8em] text-aureve-accent font-black">
              Curation Studio
            </p>
          </motion.div>
          
          <div className="flex items-center gap-12">
            <div className="hidden md:block text-right space-y-1">
              <p className="text-[9px] uppercase tracking-[0.4em] text-aureve-muted font-black opacity-30">Available Intent</p>
              <p className="text-3xl font-serif text-aureve-charcoal tracking-tighter font-light italic">$1,240</p>
            </div>
            <Link href="/dashboard/profile" className="relative h-16 w-16 rounded-full border border-aureve-base/20 bg-white p-1 shadow-soft group overflow-hidden transition-transform duration-700 hover:scale-110">
               <div className="h-full w-full rounded-full bg-gradient-to-tr from-aureve-cream to-aureve-base/40 flex items-center justify-center">
                  <Heart className="h-6 w-6 text-aureve-accent/40 transition-transform duration-700 group-hover:scale-125" />
               </div>
               <div className="absolute inset-0 border-2 border-transparent group-hover:border-aureve-accent/20 rounded-full transition-all duration-700" />
            </Link>
          </div>
        </header>

        <section className="px-10 pb-32 md:px-20">
          <AnimatePresence mode="wait">
            <motion.div
              key={pathname}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -30 }}
              transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            >
              {children}
            </motion.div>
          </AnimatePresence>
        </section>
      </main>

      {/* Mobile Nav - Redefined */}
      <nav className="fixed bottom-0 left-0 right-0 z-50 flex items-center justify-around border-t border-aureve-base/10 bg-white/80 backdrop-blur-3xl px-8 py-10 lg:hidden">
        {navItems.slice(0, 4).map((item) => {
           const isActive = pathname === item.href;
           return (
             <Link key={item.label} href={item.href} className={`relative transition-all duration-500 ${isActive ? 'text-aureve-accent scale-125' : 'text-aureve-muted/40'}`}>
               <item.icon className="h-7 w-7 stroke-[1]" />
               {isActive && (
                 <motion.div 
                   layoutId="active-nav-mobile"
                   className="absolute -bottom-4 left-1/2 -translate-x-1/2 w-1.5 h-1.5 bg-aureve-accent rounded-full"
                 />
               )}
             </Link>
           );
        })}
      </nav>
    </div>
  );
}
