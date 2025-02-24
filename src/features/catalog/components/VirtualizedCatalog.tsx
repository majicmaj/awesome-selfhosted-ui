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
    <div className="flex flex-col gap-8 overflow-auto">
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
