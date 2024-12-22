import { useVirtualizer } from '@tanstack/react-virtual';
import { useRef } from 'react';
import { SoftwareCard } from './SoftwareCard';
import type { Software } from '../types/Software';

interface VirtualizedListProps {
  items: Software[];
}

export function VirtualizedList({ items }: VirtualizedListProps) {
  const parentRef = useRef<HTMLDivElement>(null);

  const rowVirtualizer = useVirtualizer({
    count: items.length,
    getScrollElement: () => parentRef.current,
    estimateSize: () => 200,
    overscan: 5
  });

  return (
    <div
      ref={parentRef}
      className="h-[calc(100vh-320px)] overflow-auto"
    >
      <div
        style={{
          height: `${rowVirtualizer.getTotalSize()}px`,
          width: '100%',
          position: 'relative',
        }}
      >
        {rowVirtualizer.getVirtualItems().map((virtualRow) => (
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
            className="p-2"
          >
            <SoftwareCard software={items[virtualRow.index]} />
          </div>
        ))}
      </div>
    </div>
  );
}