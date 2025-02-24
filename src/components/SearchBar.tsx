import { Search } from "lucide-react";

interface SearchBarProps {
  search: string;
  onSearchChange: (value: string) => void;
}

export function SearchBar({ search, onSearchChange }: SearchBarProps) {
  return (
    <div className="sticky top-0 z-10 bg-background p-4 shadow-sm">
      <Search
        className="absolute left-6 top-1/2 transform -translate-y-1/2 text-gray-400"
        size={16}
      />
      <input
        type="text"
        value={search}
        onChange={(e) => onSearchChange(e.target.value)}
        placeholder="Search"
        className="bg-white dark:text-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 pl-7 pr-2 py-1 hover:shadow-md transition-shadow w-full"
      />
    </div>
  );
}
