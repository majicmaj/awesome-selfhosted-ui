import { NavLink } from 'react-router-dom';
import { Compass, List } from 'lucide-react';
import { ThemeToggle } from './ThemeToggle';

export function Navigation() {
  const linkClass = ({ isActive }: { isActive: boolean }) =>
    `flex items-center space-x-2 px-4 py-1.5 rounded-lg transition-all ${
      isActive
        ? 'bg-white/10 text-white backdrop-blur-sm shadow-lg'
        : 'text-gray-600 dark:text-gray-300 hover:bg-white/5 hover:backdrop-blur-sm'
    }`;

  return (
    <nav className="flex items-center space-x-2">
      <NavLink to="/" className={linkClass} end>
        <Compass size={20} />
        <span>Discover</span>
      </NavLink>
      <NavLink to="/catalog" className={linkClass}>
        <List size={20} />
        <span>Catalog</span>
      </NavLink>
      <div className="ml-auto">
        <ThemeToggle />
      </div>
    </nav>
  );
}