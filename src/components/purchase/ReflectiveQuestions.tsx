'use client';

import { motion } from "framer-motion";
import { useState } from "react";
import { Check } from "lucide-react";

interface ReflectiveQuestionsProps {
  purchaseId: string;
  questions: string[];
  onComplete: (answer: string) => void;
}

export default function ReflectiveQuestions({ purchaseId, questions, onComplete }: ReflectiveQuestionsProps) {
  const [currentStep, setCurrentStep] = useState(0);
  const [answers, setAnswers] = useState<string[]>([]);
  const [inputValue, setInputValue] = useState("");

  const handleNext = () => {
    const newAnswers = [...answers, inputValue];
    setAnswers(newAnswers);
    setInputValue("");

    if (currentStep < questions.length - 1) {
      setCurrentStep(currentStep + 1);
    } else {
      onComplete(newAnswers.join(" | "));
    }
  };

  return (
    <div className="flex flex-col space-y-8 p-6 bg-white rounded-3xl shadow-floating max-w-lg w-full">
      <div className="space-y-2">
        <span className="text-[10px] uppercase tracking-widest text-aureve-gold font-bold">Intentional Check</span>
        <h3 className="font-serif text-2xl text-aureve-charcoal leading-tight">
          {questions[currentStep]}
        </h3>
      </div>

      <div className="space-y-4">
        <textarea
          autoFocus
          className="w-full p-4 rounded-2xl border border-aureve-gray bg-aureve-cream/30 focus:outline-none focus:ring-2 focus:ring-aureve-gold/20 min-h-[120px] text-aureve-charcoal resize-none"
          placeholder="Reflect here..."
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
        />
        
        <button
          onClick={handleNext}
          disabled={!inputValue.trim()}
          className="w-full flex items-center justify-center gap-2 p-4 bg-aureve-charcoal text-white rounded-xl font-medium transition-all hover:bg-black disabled:opacity-30"
        >
          {currentStep < questions.length - 1 ? "Next Reflection" : "Complete Reflection"}
        </button>
      </div>

      <div className="flex justify-center gap-1">
        {questions.map((_, idx) => (
          <div 
            key={idx} 
            className={`h-1 w-8 rounded-full transition-all ${idx === currentStep ? "bg-aureve-gold" : "bg-aureve-gray"}`}
          />
        ))}
      </div>
    </div>
  );
}
