import { useState } from 'react';

export interface PurchaseItem {
  itemName: string;
  price: number;
  imageUrl?: string;
  url?: string;
  discoveryId?: string;
}

export function usePurchaseIntercept() {
  const [isIntercepting, setIsIntercepting] = useState(false);
  const [interceptResult, setInterceptResult] = useState<any>(null);
  const [error, setError] = useState<string | null>(null);

  const intercept = async (item: PurchaseItem) => {
    setIsIntercepting(true);
    setError(null);
    try {
      const response = await fetch('/api/purchase/intercept', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(item),
      });
      const data = await response.json();
      if (!response.ok) throw new Error(data.error || 'Failed to intercept purchase');
      setInterceptResult(data);
      return data;
    } catch (err: any) {
      setError(err.message);
      return null;
    } finally {
      setIsIntercepting(false);
    }
  };

  return {
    intercept,
    isIntercepting,
    interceptResult,
    error,
    reset: () => {
      setInterceptResult(null);
      setError(null);
    }
  };
}
