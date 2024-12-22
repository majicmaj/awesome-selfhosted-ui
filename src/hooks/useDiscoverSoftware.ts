import { useState, useCallback, useMemo } from 'react';
import type { Software } from '../types/Software';

export function useDiscoverSoftware(software: Software[]) {
  const [randomSeed, setRandomSeed] = useState(0);

  const { discoveredSoftware, categories } = useMemo(() => {
    const allCategories = Array.from(new Set(software.map(item => item.category)));
    
    // Shuffle categories and take 10
    const shuffledCategories = [...allCategories]
      .sort(() => 0.5 - Math.random())
      .slice(0, 10);

    // Group software by category and get 6 random items from each
    const discovered: Record<string, Software[]> = {};
    shuffledCategories.forEach(category => {
      const categoryItems = software.filter(item => item.category === category);
      discovered[category] = [...categoryItems]
        .sort(() => 0.5 - Math.random())
        .slice(0, 6);
    });

    return {
      discoveredSoftware: discovered,
      categories: shuffledCategories
    };
  }, [software, randomSeed]);

  const randomize = useCallback(() => {
    setRandomSeed(prev => prev + 1);
  }, []);

  return {
    discoveredSoftware,
    categories,
    randomize
  };
}