"use client";

import { motion } from "framer-motion";
import { Check, Plus } from "lucide-react";
import { Question } from "@/app/onboarding/questions";

interface OnboardingStepProps {
  question: Question;
  answer: any;
  onAnswer: (value: any) => void;
  onNext: () => void;
}

export default function OnboardingStep({ question, answer, onAnswer, onNext }: OnboardingStepProps) {
  const handleChoice = (choice: string) => {
    onAnswer(choice);
    setTimeout(onNext, 600);
  };

  const handleMultiple = (choice: string) => {
    const current = answer || [];
    const updated = current.includes(choice)
      ? current.filter((c: string) => c !== choice)
      : [...current, choice];
    onAnswer(updated);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -40 }}
      transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
      className="flex flex-col space-y-20"
    >
      <div className="space-y-8">
        <motion.span 
          initial={{ opacity: 0, x: -10 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.2 }}
          className="text-[10px] font-black uppercase tracking-[0.5em] text-aureve-accent/60"
        >
          {question.section}
        </motion.span>
        <motion.h2 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4, duration: 1 }}
          className="font-serif text-5xl leading-[1.1] text-aureve-charcoal md:text-7xl max-w-3xl italic font-light tracking-tighter"
        >
          {question.question}
        </motion.h2>
      </div>

      <div className="flex flex-col space-y-8">
        {question.type === "text" && (
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.6 }}
            className="relative"
          >
            <input
              type="text"
              autoFocus
              placeholder={question.placeholder}
              value={answer || ""}
              onChange={(e) => onAnswer(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && answer && onNext()}
              className="w-full border-b-[1px] border-aureve-base/30 bg-transparent py-10 text-4xl font-light outline-none transition-all focus:border-aureve-accent placeholder:text-aureve-muted/20 text-aureve-charcoal italic"
            />
            <div className="absolute bottom-0 left-0 h-[1px] w-0 bg-aureve-accent transition-all duration-1000 group-focus-within:w-full" />
          </motion.div>
        )}

        {question.type === "choice" && (
          <div className="grid grid-cols-1 gap-6">
            {question.options?.map((option, idx) => (
              <motion.button
                key={option}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.6 + (0.1 * idx), duration: 0.8 }}
                onClick={() => handleChoice(option)}
                className={`group flex items-center justify-between rounded-[2rem] border-[1px] px-10 py-8 text-left transition-all duration-700 ${
                  answer === option
                    ? "border-aureve-accent bg-white shadow-floating scale-[1.03]"
                    : "border-aureve-base/10 hover:border-aureve-accent/40 hover:bg-white/40"
                }`}
              >
                <span className={`text-2xl transition-colors duration-500 ${answer === option ? "text-aureve-charcoal font-medium" : "text-aureve-muted/60 font-light"}`}>
                  {option}
                </span>
                <div className={`h-8 w-8 rounded-full border-[1px] flex items-center justify-center transition-all duration-700 ${
                  answer === option ? "border-aureve-accent bg-aureve-accent shadow-soft rotate-[360deg]" : "border-aureve-base/20"
                }`}>
                  {answer === option && <Check className="h-4 w-4 text-white" />}
                </div>
              </motion.button>
            ))}
          </div>
        )}

        {question.type === "multiple" && (
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
            {question.options?.map((option, idx) => (
              <motion.button
                key={option}
                initial={{ opacity: 0, scale: 0.98 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.6 + (0.05 * idx) }}
                onClick={() => handleMultiple(option)}
                className={`flex items-center gap-6 rounded-[2rem] border-[1px] px-10 py-6 text-left transition-all duration-700 ${
                  (answer || []).includes(option)
                    ? "border-aureve-accent bg-white shadow-soft scale-[1.02]"
                    : "border-aureve-base/10 hover:border-aureve-accent/30"
                }`}
              >
                <div className={`h-7 w-7 rounded-xl border-[1px] flex items-center justify-center transition-all duration-700 ${
                  (answer || []).includes(option) ? "border-aureve-accent bg-aureve-accent shadow-soft" : "border-aureve-base/20"
                }`}>
                  {(answer || []).includes(option) ? <Check className="h-4 w-4 text-white" /> : <Plus className="h-4 w-4 text-aureve-muted/20" />}
                </div>
                <span className={`text-xl transition-colors duration-500 ${(answer || []).includes(option) ? "text-aureve-charcoal font-medium" : "text-aureve-muted/60 font-light"}`}>
                  {option}
                </span>
              </motion.button>
            ))}
          </div>
        )}

        {question.type === "scale" && (
          <div className="flex flex-col space-y-16 py-12">
            <div className="flex justify-between text-[10px] font-black uppercase tracking-[0.5em] text-aureve-accent/40 italic">
              <span>Seldom</span>
              <span>Invariably</span>
            </div>
            <div className="relative group px-4">
               <input 
                 type="range" 
                 min="1" 
                 max="10" 
                 value={answer || 5}
                 className="accent-aureve-accent h-[1px] w-full bg-aureve-base/30 rounded-lg appearance-none cursor-pointer"
                 onChange={(e) => onAnswer(e.target.value)}
               />
               <div className="mt-10 text-center">
                  <motion.span 
                    key={answer || 5}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="font-serif text-8xl italic text-aureve-accent/10 block"
                  >
                    {answer || 5}
                  </motion.span>
               </div>
            </div>
          </div>
        )}

        {question.type === "upload" && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.6 }}
            className="flex flex-col items-center justify-center rounded-[4rem] border-[1px] border-dashed border-aureve-accent/20 p-24 transition-all duration-1000 hover:border-aureve-accent hover:bg-white/60 group cursor-pointer"
          >
            <div className="mb-10 rounded-full bg-white p-12 shadow-soft group-hover:shadow-floating transition-all duration-700">
               <svg className="h-12 w-12 text-aureve-accent stroke-[1]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M12 4v16m8-8H4" />
              </svg>
            </div>
            <p className="text-[11px] font-black uppercase tracking-[0.5em] text-aureve-charcoal">Manifest Your Vision</p>
            <p className="mt-4 text-[10px] text-aureve-muted/40 uppercase tracking-widest italic">Optional: Upload imagery that resonates</p>
          </motion.div>
        )}
      </div>
    </motion.div>
  );
}
