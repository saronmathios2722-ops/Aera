import { useState } from 'react';

export interface DiscoveryItem {
  itemName: string;
  url?: string;
  imageUrl?: string;
}

export function useDiscovery() {
  const [isLogging, setIsLogging] = useState(false);

  const logDiscovery = async (item: DiscoveryItem) => {
    setIsLogging(true);
    try {
      const response = await fetch('/api/discovery', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(item),
      });
      const data = await response.json();
      if (response.ok) {
        // Return discoveryId to be used later in purchase
        return data.discoveryId;
      }
    } catch (err) {
      console.error('Failed to log discovery', err);
    } finally {
      setIsLogging(false);
    }
    return null;
  };

  return {
    logDiscovery,
    isLogging
  };
}
