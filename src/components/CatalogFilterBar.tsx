import { Filter, SortAsc, SortDesc } from "lucide-react";
import { Button } from "./ui/button";
import { Popover, PopoverContent, PopoverTrigger } from "./ui/popover";

export interface CatalogFilters {
  archived: "all" | "show" | "hide";
  sortBy: "name" | "stars" | "updated";
  sortOrder: "asc" | "desc";
  license: string;
  language: string;
}

interface CatalogFilterBarProps {
  filters: CatalogFilters;
  onFiltersChange: (filters: CatalogFilters) => void;
  availableLicenses: string[];
  availableLanguages: string[];
}

export function CatalogFilterBar({
  filters,
  onFiltersChange,
  availableLicenses,
  availableLanguages,
}: CatalogFilterBarProps) {
  return (
    <div className="flex flex-wrap items-center gap-3 p-4 bg-card rounded-lg shadow-sm border">
      {/* Archive Filter */}
      <select
        value={filters.archived}
        onChange={(e) =>
          onFiltersChange({
            ...filters,
            archived: e.target.value as CatalogFilters["archived"],
          })
        }
        className="px-3 py-1.5 bg-background border rounded-md text-sm"
      >
        <option value="all">All Software</option>
        <option value="hide">Hide Archived</option>
        <option value="show">Only Archived</option>
      </select>

      {/* Sort Options */}
      <select
        value={filters.sortBy}
        onChange={(e) =>
          onFiltersChange({
            ...filters,
            sortBy: e.target.value as CatalogFilters["sortBy"],
          })
        }
        className="px-3 py-1.5 bg-background border rounded-md text-sm"
      >
        <option value="name">Sort by Name</option>
        <option value="stars">Sort by Stars</option>
        <option value="updated">Sort by Last Updated</option>
      </select>

      <Button
        variant="outline"
        size="sm"
        onClick={() =>
          onFiltersChange({
            ...filters,
            sortOrder: filters.sortOrder === "asc" ? "desc" : "asc",
          })
        }
      >
        {filters.sortOrder === "asc" ? (
          <SortAsc className="h-4 w-4" />
        ) : (
          <SortDesc className="h-4 w-4" />
        )}
      </Button>

      {/* Advanced Filters */}
      <Popover>
        <PopoverTrigger asChild>
          <Button variant="outline" size="sm">
            <Filter className="h-4 w-4 mr-2" />
            Filters
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-80">
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium mb-1">License</label>
              <select
                value={filters.license}
                onChange={(e) =>
                  onFiltersChange({ ...filters, license: e.target.value })
                }
                className="w-full px-3 py-1.5 bg-gray-50 dark:bg-gray-700 border border-gray-200 dark:border-gray-600 rounded-md text-sm"
              >
                <option value="">Any License</option>
                {availableLicenses.map((license) => (
                  <option key={license} value={license}>
                    {license}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium mb-1">
                Platform/Language
              </label>
              <select
                value={filters.language}
                onChange={(e) =>
                  onFiltersChange({ ...filters, language: e.target.value })
                }
                className="w-full px-3 py-1.5 bg-gray-50 dark:bg-gray-700 border border-gray-200 dark:border-gray-600 rounded-md text-sm"
              >
                <option value="">Any Platform</option>
                {availableLanguages.map((language) => (
                  <option key={language} value={language}>
                    {language}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </PopoverContent>
      </Popover>
    </div>
  );
}
