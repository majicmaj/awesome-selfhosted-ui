import { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { fetchAndParseMd } from '../../../utils/markdownParser';
import type { Software } from '../../../types/Software';

export function useCatalogData() {
  const [searchParams, setSearchParams] = useSearchParams();
  const [software, setSoftware] = useState<Software[]>([]);
  const [loading, setLoading] = useState(true);
  
  const search = searchParams.get('search') || '';
  const selectedCategory = searchParams.get('category') || '';

  useEffect(() => {
    fetchAndParseMd().then((data) => {
      setSoftware(data);
      setLoading(false);
    });
  }, []);

  const setSearch = (value: string) => {
    setSearchParams(params => {
      if (value) {
        params.set('search', value);
      } else {
        params.delete('search');
      }
      return params;
    });
  };

  const setSelectedCategory = (value: string) => {
    setSearchParams(params => {
      if (value) {
        params.set('category', value);
      } else {
        params.delete('category');
      }
      return params;
    });
  };

  const filteredSoftware = software.filter(item => {
    const matchesSearch = search === '' ||
      item.name.toLowerCase().includes(search.toLowerCase()) ||
      item.description.toLowerCase().includes(search.toLowerCase()) ||
      item.tags.some(tag => tag.toLowerCase().includes(search.toLowerCase()));
    
    const matchesCategory = selectedCategory === '' || item.category === selectedCategory;
    
    return matchesSearch && matchesCategory;
  });

  const groupedSoftware = filteredSoftware.reduce<Record<string, Software[]>>((acc, item) => {
    if (!acc[item.category]) {
      acc[item.category] = [];
    }
    acc[item.category].push(item);
    return acc;
  }, {});

  const categories = Object.keys(software.reduce<Record<string, number>>((acc, item) => {
    acc[item.category] = (acc[item.category] || 0) + 1;
    return acc;
  }, {}));

  return {
    loading,
    search,
    setSearch,
    selectedCategory,
    setSelectedCategory,
    groupedSoftware,
    categories
  };
}