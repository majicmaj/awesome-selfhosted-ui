import { useVirtualizer } from '@tanstack/react-virtual';
import { useRef } from 'react';
import { CategorySection } from './CategorySection';
import type { Software } from '../types/Software';

interface VirtualizedCategoryListProps {
  groupedSoftware: Record<string, Software[]>;
}

export function VirtualizedCategoryList({ groupedSoftware }: VirtualizedCategoryListProps) {
  const parentRef = useRef<HTMLDivElement>(null);
  const categories = Object.keys(groupedSoftware);

  const virtualizer = useVirtualizer({
    count: categories.length,
    getScrollElement: () => parentRef.current,
    estimateSize: () => 600, // Estimated category section height
    overscan: 2,
  });

  return (
    <div
      ref={parentRef}
      className="h-[calc(100vh-200px)] overflow-auto"
    >
      <div
        style={{
          height: `${virtualizer.getTotalSize()}px`,
          width: '100%',
          position: 'relative',
        }}
      >
        {virtualizer.getVirtualItems().map((virtualRow) => {
          const category = categories[virtualRow.index];
          const items = groupedSoftware[category];
          
          return (
            <div
              key={category}
                      className='border border-rose-500'

              style={{
                position: 'absolute',
                top: 0,
                left: 0,
                width: '100%',
                height: `${virtualRow.size}px`,
                transform: `translateY(${virtualRow.start}px)`,
              }}
            >
              <CategorySection 
                category={category}
                software={items}
              />
            </div>
          );
        })}
      </div>
    </div>
  );
}