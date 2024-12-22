import { useMemo, useState } from 'react';
import type { Software } from '../types/Software';

export function useSoftwareFilter(software: Software[]) {
  const [search, setSearch] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('');

  const categories = useMemo(() => {
    return Array.from(new Set(software.map((item) => item.category))).sort();
  }, [software]);

  const filteredSoftware = useMemo(() => {
    return software.filter((item) => {
      const matchesSearch = search === '' || 
        item.name.toLowerCase().includes(search.toLowerCase()) ||
        item.description.toLowerCase().includes(search.toLowerCase()) ||
        item.tags.some(tag => tag.toLowerCase().includes(search.toLowerCase()));
      
      const matchesCategory = selectedCategory === '' || item.category === selectedCategory;
      
      return matchesSearch && matchesCategory;
    });
  }, [software, search, selectedCategory]);

  return {
    search,
    setSearch,
    selectedCategory,
    setSelectedCategory,
    categories,
    filteredSoftware
  };
}