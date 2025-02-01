import { CatalogSection } from "./CatalogSection";
import type { Software } from "../../../types/Software";

interface VirtualizedCatalogProps {
  groupedSoftware: Record<string, Software[]>;
}

export function VirtualizedCatalog({
  groupedSoftware,
}: VirtualizedCatalogProps) {
  const categories = Object.keys(groupedSoftware);
  return (
    <div className="space-y-12">
      {categories.map((category) => (
        <CatalogSection
          key={category}
          category={category}
          software={groupedSoftware[category]}
        />
      ))}
    </div>
  );
}
