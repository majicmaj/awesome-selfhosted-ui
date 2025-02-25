import { Search } from "lucide-react";

interface SearchBarProps {
  search: string;
  onSearchChange: (value: string) => void;
}

export function SearchBar({ search, onSearchChange }: SearchBarProps) {
  return (
    <div className="sticky py-2 top-0 z-10 bg-background shadow-sm">
      <Search
        className="absolute left-2 top-1/2 transform -translate-y-1/2 text-gray-400"
        size={16}
      />
      <input
        type="text"
        value={search}
        onChange={(e) => onSearchChange(e.target.value)}
        placeholder="Search"
        className="bg-popover rounded-lg shadow-sm border pl-7 pr-2 py-0.5 hover:shadow-md transition-shadow w-full"
      />
    </div>
  );
}
