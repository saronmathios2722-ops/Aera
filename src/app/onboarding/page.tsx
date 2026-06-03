"use client";

import { useState, useEffect, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowRight, ArrowLeft, Check, Shirt, Loader2, Sparkles } from "lucide-react";
import { onboardingQuestions } from "./questions";
import Link from "next/link";
import Image from "next/image";
import OnboardingStep from "@/components/onboarding/OnboardingStep";

const sectionImages: Record<string, string> = {
  "The Invitation": "https://images.unsplash.com/photo-1490481651871-ab68de25d43d?q=80&w=2000&auto=format&fit=crop",
  "The Silhouette": "https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?q=80&w=2000&auto=format&fit=crop",
  "The Palette": "https://images.unsplash.com/photo-1523381210434-271e8be1f52b?q=80&w=2000&auto=format&fit=crop",
  "The Psychology": "https://images.unsplash.com/photo-1441986300917-64674bd600d8?q=80&w=2000&auto=format&fit=crop",
  "The Vision": "https://images.unsplash.com/photo-1539109136881-3be061694b93?q=80&w=2000&auto=format&fit=crop",
  "The Sanctuary": "https://images.unsplash.com/photo-1558769132-cb1aea458c5e?q=80&w=2000&auto=format&fit=crop",
};

const sectionDescriptions: Record<string, string> = {
  "The Invitation": "A formal beginning to your curation journey. We seek to understand the essence of your identity.",
  "The Silhouette": "Form and presence. Defining the architecture of your physical manifestation.",
  "The Palette": "Atmosphere and emotion. Mapping the colors and textures that anchor your confidence.",
  "The Psychology": "Beneath the surface. Uncovering the emotional currents that drive your acquisitions.",
  "The Vision": "A manifestation of the future. Articulating the wardrobe that does not yet exist.",
  "The Sanctuary": "Order and preservation. Establishing the boundaries and logistics of your intentional life.",
};

export default function Onboarding() {
  const [currentStep, setCurrentStep] = useState(0);
  const [answers, setAnswers] = useState<Record<string, any>>({});
  const [isFinished, setIsFinished] = useState(false);
  const [loading, setLoading] = useState(false);
  const [showSectionIntro, setShowSectionIntro] = useState(true);

  const currentQuestion = onboardingQuestions[currentStep];
  const currentSection = currentQuestion.section;
  
  const progress = useMemo(() => {
    return ((currentStep + 1) / onboardingQuestions.length) * 100;
  }, [currentStep]);

  const handleNext = async () => {
    const nextStep = currentStep + 1;
    
    if (nextStep < onboardingQuestions.length) {
      const nextSection = onboardingQuestions[nextStep].section;
      if (nextSection !== currentSection) {
        setShowSectionIntro(true);
      }
      setCurrentStep(nextStep);
    } else {
      setLoading(true);
      try {
        await fetch("/api/profile/onboarding", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(answers),
        });
        setIsFinished(true);
      } catch (error) {
        console.error("Failed to submit onboarding:", error);
        setIsFinished(true);
      } finally {
        setLoading(false);
      }
    }
  };

  const handleBack = () => {
    if (currentStep > 0) {
      const prevStep = currentStep - 1;
      const prevSection = onboardingQuestions[prevStep].section;
      // If going back causes a section change, we don't necessarily need to show intro again
      // unless we want to. For now, just change step.
      setCurrentStep(prevStep);
      setShowSectionIntro(false);
    }
  };

  const handleAnswer = (value: any) => {
    setAnswers({ ...answers, [currentQuestion.id]: value });
  };

  if (isFinished) {
    return (
      <div className="flex min-h-screen flex-col items-center justify-center bg-[#F9F7F2] px-6">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="max-w-md space-y-10 text-center"
        >
          <div className="mx-auto h-24 w-24 rounded-full bg-aureve-charcoal flex items-center justify-center text-aureve-accent shadow-floating border-4 border-white/20">
            <Check className="h-10 w-10" />
          </div>
          <div className="space-y-4">
             <h2 className="font-serif text-5xl text-aureve-charcoal leading-tight">The Curation <br /> is Complete.</h2>
             <p className="text-aureve-muted leading-relaxed font-light text-lg">
               Your style DNA has been carefully steeped. Your personalized sanctuary is ready to guide you towards a more intentional existence.
             </p>
          </div>
          <Link
            href="/dashboard"
            className="group relative inline-flex items-center gap-6 overflow-hidden rounded-full bg-aureve-charcoal px-12 py-6 text-white shadow-floating hover:bg-aureve-accent hover:text-aureve-charcoal transition-all duration-700"
          >
            <span className="relative z-10 text-[11px] font-bold uppercase tracking-[0.4em]">Enter Your Sanctuary</span> 
            <ArrowRight className="relative z-10 h-5 w-5 transition-transform group-hover:translate-x-2" />
          </Link>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="relative flex min-h-screen flex-col bg-[#F9F7F2] overflow-hidden text-aureve-charcoal font-sans">
      {/* Background Texture */}
      <div 
        className="fixed inset-0 z-0 opacity-[0.03] pointer-events-none mix-blend-multiply"
        style={{ backgroundImage: 'url("https://www.transparenttextures.com/patterns/natural-paper.png")', backgroundSize: 'cover' }}
      />

      {/* Progress Bar */}
      <div className="fixed top-0 left-0 right-0 z-[100] h-[3px] bg-aureve-base/10">
        <motion.div 
          className="h-full bg-aureve-accent shadow-[0_0_15px_rgba(197,160,89,0.5)]"
          initial={{ width: 0 }}
          animate={{ width: `${progress}%` }}
          transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
        />
      </div>

      <AnimatePresence mode="wait">
        {showSectionIntro ? (
          <motion.div
            key={`intro-${currentSection}`}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
            className="fixed inset-0 z-[60] flex flex-col items-center justify-center bg-[#F9F7F2]"
          >
            <div className="absolute inset-0 z-0">
               <Image 
                 src={sectionImages[currentSection]} 
                 alt={currentSection}
                 fill
                 className="object-cover opacity-20 scale-110 grayscale"
               />
               <div className="absolute inset-0 bg-gradient-to-b from-[#F9F7F2]/80 via-transparent to-[#F9F7F2]" />
            </div>

            <div className="relative z-10 max-w-2xl text-center space-y-12 px-8">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5, duration: 1 }}
                className="space-y-4"
              >
                <span className="text-[10px] uppercase tracking-[1em] text-aureve-accent font-black">Ritual Chapter</span>
                <h1 className="text-7xl md:text-8xl font-serif italic font-light tracking-tighter text-aureve-charcoal">
                  {currentSection}
                </h1>
              </motion.div>
              
              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 1, duration: 1 }}
                className="text-xl text-aureve-muted font-light leading-relaxed italic"
              >
                {sectionDescriptions[currentSection]}
              </motion.p>

              <motion.button
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 1.8, duration: 0.8 }}
                onClick={() => setShowSectionIntro(false)}
                className="px-16 py-8 rounded-full bg-aureve-charcoal text-white text-[11px] uppercase tracking-[0.5em] font-bold hover:bg-aureve-accent hover:text-aureve-charcoal transition-all duration-700 shadow-floating"
              >
                Begin Chapter
              </motion.button>
            </div>
          </motion.div>
        ) : (
          <div className="relative flex flex-col flex-1 z-10">
            {/* Navigation Header */}
            <header className="flex items-center justify-between px-8 py-12 md:px-16">
              <button 
                onClick={handleBack}
                disabled={currentStep === 0}
                className="group flex items-center gap-4 text-[10px] font-black uppercase tracking-[0.4em] text-aureve-muted hover:text-aureve-charcoal disabled:opacity-0 transition-all duration-500"
              >
                <ArrowLeft className="h-4 w-4 transition-transform group-hover:-translate-x-1" /> Back
              </button>
              <div className="flex items-center gap-4">
                <div className="h-10 w-10 rounded-full border border-aureve-accent/30 flex items-center justify-center bg-white shadow-soft">
                   <Shirt className="h-4 w-4 text-aureve-accent" />
                </div>
                <span className="font-serif text-2xl tracking-[0.1em] text-aureve-charcoal font-light italic">Aera</span>
              </div>
              <div className="text-[10px] uppercase tracking-[0.4em] text-aureve-accent font-black">
                {currentStep + 1} <span className="opacity-20 mx-2">/</span> {onboardingQuestions.length}
              </div>
            </header>

            {/* Main Content */}
            <main className="flex flex-1 flex-col items-center justify-center px-8 pb-32">
              <div className="w-full max-w-4xl">
                <AnimatePresence mode="wait">
                  <OnboardingStep
                    key={currentQuestion.id}
                    question={currentQuestion}
                    answer={answers[currentQuestion.id]}
                    onAnswer={handleAnswer}
                    onNext={handleNext}
                  />
                </AnimatePresence>

                {/* Action Buttons */}
                <div className="mt-24 flex justify-between items-center px-4">
                  <div className="flex items-center gap-6">
                    <div className="h-[1px] w-12 bg-aureve-accent/30" />
                    <span className="text-[10px] font-black uppercase tracking-[0.5em] text-aureve-accent/40 italic">
                       {currentSection}
                    </span>
                  </div>
                  
                  {(currentQuestion.type !== "choice" || !answers[currentQuestion.id]) && (
                    <motion.button
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      onClick={handleNext}
                      disabled={loading || (currentQuestion.type !== "upload" && currentQuestion.type !== "scale" && !answers[currentQuestion.id])}
                      className="group flex items-center gap-6 bg-aureve-charcoal text-white pl-12 pr-8 py-6 rounded-full text-[11px] font-bold uppercase tracking-[0.4em] hover:bg-aureve-accent hover:text-aureve-charcoal transition-all duration-700 shadow-floating disabled:opacity-20 disabled:grayscale"
                    >
                      {loading ? (
                        <>
                          Curating DNA <Loader2 className="h-4 w-4 animate-spin" />
                        </>
                      ) : (
                        <>
                          {currentStep === onboardingQuestions.length - 1 ? "Complete Ritual" : "Next Vessel"}
                          <div className="h-10 w-10 rounded-full bg-white/10 flex items-center justify-center group-hover:bg-black/10 transition-colors">
                             <ArrowRight size={18} className="transition-transform group-hover:translate-x-1" />
                          </div>
                        </>
                      )}
                    </motion.button>
                  )}
                </div>
              </div>
            </main>
          </div>
        )}
      </AnimatePresence>

      {/* Decorative Atmosphere */}
      <div className="fixed -bottom-64 -right-64 h-[800px] w-[800px] rounded-full bg-aureve-accent/[0.03] blur-[150px] pointer-events-none" />
      <div className="fixed -top-64 -left-64 h-[800px] w-[800px] rounded-full bg-aureve-charcoal/[0.03] blur-[150px] pointer-events-none" />
    </div>
  );
}
