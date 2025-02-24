import { useState, useCallback, useMemo } from 'react';
import { useSettings } from '../contexts/SettingsContext';
import type { Software } from '../types/Software';

export function useDiscoverSoftware(software: Software[]) {
  const [randomSeed, setRandomSeed] = useState(0);
  const { settings } = useSettings();

  const { discoveredSoftware, categories } = useMemo(() => {
    // Filter out archived software if setting is disabled
    const filteredSoftware = settings.discover.showArchived 
      ? software 
      : software.filter(item => !item.archived);

    const allCategories = Array.from(new Set(filteredSoftware.map(item => item.category)));
    
    // Shuffle categories and take the configured number
    const shuffledCategories = [...allCategories]
      .sort(() => 0.5 - Math.random())
      .slice(0, settings.discover.categoriesCount);

    // Group software by category and get the configured number of random items from each
    const discovered: Record<string, Software[]> = {};
    shuffledCategories.forEach(category => {
      const categoryItems = filteredSoftware.filter(item => item.category === category);
      discovered[category] = [...categoryItems]
        .sort(() => 0.5 - Math.random())
        .slice(0, settings.discover.itemsPerCategory);
    });

    return {
      discoveredSoftware: discovered,
      categories: shuffledCategories
    };
  }, [software, randomSeed, settings.discover]);

  const randomize = useCallback(() => {
    setRandomSeed(prev => prev + 1);
  }, []);

  return {
    discoveredSoftware,
    categories,
    randomize
  };
}