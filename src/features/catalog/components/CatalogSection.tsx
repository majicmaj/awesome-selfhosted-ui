import type { Software } from '../../../types/Software';
import { VirtualizedSoftwareGrid } from './VirtualizedSoftwareGrid';

interface CatalogSectionProps {
  category: string;
  software: Software[];
}

export function CatalogSection({ category, software }: CatalogSectionProps) {
  return (
    <section 
      id={category.toLowerCase().replace(/\s+/g, '-')} 
      className="scroll-mt-8 mb-12"
    >
      <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6 flex items-center">
        <span>{category}</span>
        <span className="ml-3 text-sm font-medium text-gray-500 dark:text-gray-400">
          ({software.length} {software.length === 1 ? 'item' : 'items'})
        </span>
      </h2>
      <VirtualizedSoftwareGrid software={software} />
    </section>
  );
}