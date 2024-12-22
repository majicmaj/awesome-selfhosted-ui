import { Hash } from 'lucide-react';
import { CategoryCount } from '../types/Software';

interface CategorySidebarProps {
  categories: (CategoryCount & { isSelected: boolean })[];
  onCategoryClick: (category: string) => void;
}

export function CategorySidebar({ categories, onCategoryClick }: CategorySidebarProps) {
  return (
      <nav className="space-y-1">
        {categories.map(({ name, count, isSelected }) => (
          <button
            key={name}
            onClick={() => onCategoryClick(name)}
            className={`flex w-full overflow-auto items-center justify-between px-4 py-2 text-sm rounded-lg transition-colors ${
              isSelected
                ? 'dark:bg-gray-700/50 bg-gray-300/50 dark:text-white text-black'
                : 'text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-800/50'
            }`}
          >
            <div className="flex flex-1 items-center truncate">
              <Hash size={16} className={`mr-2 min-w-max ${
                isSelected ? 'text-blue-500' : 'text-blue-600 dark:text-blue-400 group-hover:text-blue-500'
              }`} />
              <span className="truncate">{name}</span>
            </div>

            <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
              isSelected
                ? 'bg-blue-500 text-white'
                : 'bg-gray-100 dark:bg-gray-800 text-gray-800 dark:text-gray-200'
            }`}>
              {count}
            </span>
          </button>
        ))}
      </nav>
  );
}