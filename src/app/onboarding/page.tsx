"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowRight, ArrowLeft, Check } from "lucide-react";
import { onboardingQuestions } from "./questions";
import Link from "next/link";
import Image from "next/image";

export default function Onboarding() {
  const [currentStep, setCurrentStep] = useState(0);
  const [answers, setAnswers] = useState<Record<string, any>>({});
  const [isFinished, setIsFinished] = useState(false);

  const currentQuestion = onboardingQuestions[currentStep];
  const progress = ((currentStep + 1) / onboardingQuestions.length) * 100;

  const handleNext = () => {
    if (currentStep < onboardingQuestions.length - 1) {
      setCurrentStep(currentStep + 1);
    } else {
      setIsFinished(true);
    }
  };

  const handleBack = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    }
  };

  const handleAnswer = (value: any) => {
    setAnswers({ ...answers, [currentQuestion.id]: value });
  };

  const handleChoice = (choice: string) => {
    handleAnswer(choice);
    // Auto-advance for simple choices
    setTimeout(handleNext, 400);
  };

  const handleMultiple = (choice: string) => {
    const current = answers[currentQuestion.id] || [];
    const updated = current.includes(choice)
      ? current.filter((c: string) => c !== choice)
      : [...current, choice];
    handleAnswer(updated);
  };

  if (isFinished) {
    return (
      <div className="flex min-h-screen flex-col items-center justify-center bg-aureve-cream px-6">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="max-w-md space-y-8 text-center"
        >
          <div className="mx-auto h-20 w-20 rounded-full bg-aureve-gold flex items-center justify-center text-white shadow-floating">
            <Check className="h-10 w-10" />
          </div>
          <h2 className="font-serif text-4xl text-aureve-charcoal">Your Journey Begins.</h2>
          <p className="text-aureve-taupe">
            We've analyzed your style DNA. Your personalized dashboard is ready to guide you towards a more intentional wardrobe.
          </p>
          <Link
            href="/dashboard"
            className="inline-flex items-center gap-3 rounded-full bg-aureve-charcoal px-8 py-4 text-white shadow-soft hover:bg-aureve-gold transition-colors duration-500"
          >
            Enter Your Sanctuary <ArrowRight className="h-5 w-5" />
          </Link>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="relative flex min-h-screen flex-col bg-aureve-cream overflow-hidden">
      {/* Background Texture */}
      <div 
        className="fixed inset-0 z-0 opacity-10 pointer-events-none mix-blend-multiply"
        style={{ backgroundImage: 'url("/texture.png")', backgroundSize: 'cover' }}
      />

      {/* Progress Bar */}
      <div className="fixed top-0 left-0 right-0 z-50 h-1 bg-aureve-gray">
        <motion.div 
          className="h-full bg-aureve-gold"
          initial={{ width: 0 }}
          animate={{ width: `${progress}%` }}
          transition={{ duration: 0.5 }}
        />
      </div>

      {/* Navigation Header */}
      <header className="relative z-10 flex items-center justify-between px-6 py-8 md:px-12">
        <button 
          onClick={handleBack}
          disabled={currentStep === 0}
          className="flex items-center gap-2 text-xs uppercase tracking-widest text-aureve-taupe disabled:opacity-0 transition-opacity duration-300"
        >
          <ArrowLeft className="h-4 w-4" /> Back
        </button>
        <div className="flex items-center gap-2">
          <div className="relative h-6 w-6">
            <Image src="/logo.png" alt="Auréve Logo" fill className="object-contain" />
          </div>
          <span className="font-serif text-xl tracking-tight text-aureve-charcoal">Auréve</span>
        </div>
        <div className="text-xs uppercase tracking-widest text-aureve-gold font-medium">
          Step {currentStep + 1} of {onboardingQuestions.length}
        </div>
      </header>

      {/* Main Content */}
      <main className="relative z-10 flex flex-1 flex-col items-center justify-center px-6 pb-20">
        <div className="w-full max-w-2xl">
          <AnimatePresence mode="wait">
            <motion.div
              key={currentQuestion.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
              className="flex flex-col space-y-12"
            >
              <div className="space-y-4">
                <span className="text-xs font-semibold uppercase tracking-widest text-aureve-taupe opacity-60">
                  {currentQuestion.section}
                </span>
                <h2 className="font-serif text-3xl leading-snug text-aureve-charcoal md:text-5xl">
                  {currentQuestion.question}
                </h2>
              </div>

              <div className="flex flex-col space-y-4">
                {currentQuestion.type === "text" && (
                  <motion.div
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.3 }}
                  >
                    <input
                      type="text"
                      autoFocus
                      placeholder={currentQuestion.placeholder}
                      value={answers[currentQuestion.id] || ""}
                      onChange={(e) => handleAnswer(e.target.value)}
                      onKeyDown={(e) => e.key === "Enter" && handleNext()}
                      className="w-full border-b-2 border-aureve-gray bg-transparent py-4 text-2xl outline-none transition-colors focus:border-aureve-gold placeholder:text-aureve-gray text-aureve-charcoal"
                    />
                  </motion.div>
                )}

                {currentQuestion.type === "choice" && (
                  <div className="grid grid-cols-1 gap-4">
                    {currentQuestion.options?.map((option, idx) => (
                      <motion.button
                        key={option}
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.1 * idx }}
                        onClick={() => handleChoice(option)}
                        className={`group flex items-center justify-between rounded-2xl border-2 px-6 py-5 text-left transition-all duration-300 ${
                          answers[currentQuestion.id] === option
                            ? "border-aureve-gold bg-aureve-gold/5 shadow-soft"
                            : "border-aureve-gray hover:border-aureve-taupe"
                        }`}
                      >
                        <span className="text-lg text-aureve-charcoal">{option}</span>
                        <div className={`h-6 w-6 rounded-full border-2 flex items-center justify-center transition-colors ${
                          answers[currentQuestion.id] === option ? "border-aureve-gold bg-aureve-gold" : "border-aureve-gray"
                        }`}>
                          {answers[currentQuestion.id] === option && <Check className="h-4 w-4 text-white" />}
                        </div>
                      </motion.button>
                    ))}
                  </div>
                )}

                {currentQuestion.type === "multiple" && (
                  <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                    {currentQuestion.options?.map((option, idx) => (
                      <motion.button
                        key={option}
                        initial={{ opacity: 0, scale: 0.95 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ delay: 0.05 * idx }}
                        onClick={() => handleMultiple(option)}
                        className={`flex items-center gap-4 rounded-2xl border-2 px-6 py-4 text-left transition-all duration-300 ${
                          (answers[currentQuestion.id] || []).includes(option)
                            ? "border-aureve-gold bg-aureve-gold/5"
                            : "border-aureve-gray hover:border-aureve-taupe"
                        }`}
                      >
                        <div className={`h-5 w-5 rounded border-2 flex items-center justify-center ${
                          (answers[currentQuestion.id] || []).includes(option) ? "border-aureve-gold bg-aureve-gold" : "border-aureve-gray"
                        }`}>
                          {(answers[currentQuestion.id] || []).includes(option) && <Check className="h-3 w-3 text-white" />}
                        </div>
                        <span className="text-aureve-charcoal">{option}</span>
                      </motion.button>
                    ))}
                  </div>
                )}

                {currentQuestion.type === "scale" && (
                  <div className="flex flex-col space-y-8 py-8">
                    <div className="flex justify-between text-xs uppercase tracking-widest text-aureve-taupe">
                      <span>Not at all</span>
                      <span>Completely</span>
                    </div>
                    <input 
                      type="range" 
                      min="1" 
                      max="10" 
                      className="accent-aureve-gold h-1 bg-aureve-gray rounded-lg appearance-none cursor-pointer"
                      onChange={(e) => handleAnswer(e.target.value)}
                    />
                  </div>
                )}
              </div>

              {/* Action Buttons */}
              <div className="flex justify-between pt-8">
                <div /> {/* Spacer */}
                {(currentQuestion.type !== "choice" || !answers[currentQuestion.id]) && (
                  <motion.button
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    onClick={handleNext}
                    className="flex items-center gap-2 text-sm font-semibold uppercase tracking-widest text-aureve-gold hover:text-aureve-charcoal transition-colors duration-300"
                  >
                    Continue <ArrowRight className="h-4 w-4" />
                  </motion.button>
                )}
              </div>
            </motion.div>
          </AnimatePresence>
        </div>
      </main>

      {/* Background Decoration */}
      <div className="fixed -bottom-24 -right-24 h-96 w-96 rounded-full bg-aureve-gold/5 blur-[100px] pointer-events-none" />
      <div className="fixed -top-24 -left-24 h-96 w-96 rounded-full bg-aureve-taupe/5 blur-[100px] pointer-events-none" />
    </div>
  );
}
