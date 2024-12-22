import { useState } from 'react';
import { ChevronDown, ChevronUp } from 'lucide-react';
import { SoftwareCard } from './SoftwareCard';
import type { Software } from '../types/Software';

interface CategorySectionProps {
  category: string;
  software: Software[];
  initialCount?: number;
}

export function CategorySection({ category, software, initialCount = 4 }: CategorySectionProps) {
  const [isExpanded, setIsExpanded] = useState(false);
  const displayedSoftware = isExpanded ? software : software.slice(0, initialCount);
  const hasMore = software.length > initialCount;

  return (
    <section id={category.toLowerCase().replace(/\s+/g, '-')} className="mb-12 scroll-mt-8">
      <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center">
        <span>{category}</span>
        <span className="ml-3 text-sm font-medium text-gray-500">
          ({software.length} {software.length === 1 ? 'item' : 'items'})
        </span>
      </h2>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        {displayedSoftware.map((item) => (
          <SoftwareCard key={`${category}-${item.id}`} software={item} />
        ))}
      </div>
      {hasMore && (
        <button
          onClick={() => setIsExpanded(!isExpanded)}
          className="mt-4 flex items-center gap-2 text-blue-500 hover:text-blue-600 transition-colors mx-auto"
        >
          {isExpanded ? (
            <>
              <ChevronUp size={20} />
              <span>Show Less</span>
            </>
          ) : (
            <>
              <ChevronDown size={20} />
              <span>Show {software.length - initialCount} More</span>
            </>
          )}
        </button>
      )}
    </section>
  );
}