import { useVirtualizer } from '@tanstack/react-virtual';
import { useRef, useEffect, useState } from 'react';
import { SoftwareCard } from './SoftwareCard';
import type { Software } from '../types/Software';

interface VirtualizedGridProps {
  items: Software[];
  columns?: number;
}

export function VirtualizedGrid({ items, columns = 2 }: VirtualizedGridProps) {
  const parentRef = useRef<HTMLDivElement>(null);
  const [columnCount, setColumnCount] = useState(columns);
  
  // Responsive column count
  useEffect(() => {
    const updateColumns = () => {
      const width = window.innerWidth;
      if (width < 768) setColumnCount(1);
      else if (width < 1280) setColumnCount(2);
      else setColumnCount(columns);
    };
    
    updateColumns();
    window.addEventListener('resize', updateColumns);
    return () => window.removeEventListener('resize', updateColumns);
  }, [columns]);

  const rowCount = Math.ceil(items.length / columnCount);
  
  const rowVirtualizer = useVirtualizer({
    count: rowCount,
    getScrollElement: () => parentRef.current,
    estimateSize: () => 280, // Estimated row height
    overscan: 5,
  });

  return (
    <div
      ref={parentRef}
      className="h-[calc(100vh-200px)] overflow-auto"
    >
      <div
        style={{
          height: `${rowVirtualizer.getTotalSize()}px`,
          width: '100%',
          position: 'relative',
        }}
      >
        {rowVirtualizer.getVirtualItems().map((virtualRow) => {
          const startIndex = virtualRow.index * columnCount;
          return (
            <div
              key={virtualRow.index}
              style={{
                position: 'absolute',
                top: 0,
                left: 0,
                width: '100%',
                height: `${virtualRow.size}px`,
                transform: `translateY(${virtualRow.start}px)`,
              }}
              className="grid grid-cols-1 md:grid-cols-2 gap-4 px-4"
            >
              {Array.from({ length: columnCount }).map((_, columnIndex) => {
                const itemIndex = startIndex + columnIndex;
                const item = items[itemIndex];
                if (!item) return null;
                return (
                  <div key={item.id} className="min-w-0">
                    <SoftwareCard software={item} />
                  </div>
                );
              })}
            </div>
          );
        })}
      </div>
    </div>
  );
}