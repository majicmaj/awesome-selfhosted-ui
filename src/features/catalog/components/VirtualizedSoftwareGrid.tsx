import { SoftwareCard } from '../../../components/SoftwareCard';
import type { Software } from '../../../types/Software';

interface VirtualizedSoftwareGridProps {
  software: Software[];
}

export function VirtualizedSoftwareGrid({ software }: VirtualizedSoftwareGridProps) {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
      {software.map((item) => (
        <SoftwareCard key={item.id} software={item} />
      ))}
    </div>
  );
}