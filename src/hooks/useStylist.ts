'use client';

import { useState } from 'react';

export function useStylist() {
  const [isAnalyzing, setIsAnalyzing] = useState(false);

  const getBlueprint = async () => {
    const res = await fetch('/api/ai/blueprint', { method: 'POST' });
    return res.json();
  };

  const analyzeOutfit = async (imageUrl: string) => {
    setIsAnalyzing(true);
    try {
      const res = await fetch('/api/ai/analyze', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ imageUrl }),
      });
      return res.json();
    } finally {
      setIsAnalyzing(false);
    }
  };

  const interceptPurchase = async (data: { itemName: string, price: number, url?: string, imageUrl?: string }) => {
    const res = await fetch('/api/purchase/intercept', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
    });
    return res.json();
  };

  return {
    isAnalyzing,
    getBlueprint,
    analyzeOutfit,
    interceptPurchase,
  };
}
