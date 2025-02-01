import { NavLink } from "react-router-dom";
import { Compass, Github, List, Sparkles } from "lucide-react";
import { ThemeToggle } from "./ThemeToggle";

export function Navigation() {
  const linkClass = ({ isActive }: { isActive: boolean }) =>
    `flex items-center space-x-2 px-4 py-1.5 rounded-lg transition-all ${
      isActive
        ? "bg-white/10 text-blue-600 dark:text-gray-100 backdrop-blur-sm shadow-lg"
        : "text-gray-600 dark:text-gray-300 hover:bg-white/5 hover:backdrop-blur-sm"
    }`;

  return (
    <nav className="flex items-center gap-2 overflow-auto">
      <NavLink to="/" className={linkClass} end>
        <Compass size={20} />
        <span>Discover</span>
      </NavLink>
      <NavLink to="/catalog" className={linkClass}>
        <List size={20} />
        <span>Catalog</span>
      </NavLink>
      <NavLink to="/new" className={linkClass}>
        <Sparkles size={20} />
        <span>New</span>
      </NavLink>
      <div className="h-6 w-[1px] bg-gray-700/50 dark:bg-gray-300/50" />
      <NavLink
        to="https://github.com/majicmaj/awesome-selfhosted-ui"
        target="_blank"
        className={linkClass}
      >
        <Github size="20" />
      </NavLink>
      <div className="ml-auto">
        <ThemeToggle />
      </div>
    </nav>
  );
}
