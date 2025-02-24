import { NavLink } from "react-router-dom";
import { Compass, Github, List, Settings, Sparkles } from "lucide-react";

interface NavigationProps {
  className?: string;
}

export function Navigation({ className = "" }: NavigationProps) {
  const linkClass = ({ isActive }: { isActive: boolean }) =>
    `flex items-center gap-2 px-4 py-2 rounded-lg transition-all ${
      isActive
        ? "bg-gradient-to-r from-primary/30 to-secondary/20 text-foreground"
        : "hover:bg-primary/10"
    }`;

  return (
    <nav className={`flex items-center gap-1 ${className}`}>
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
      <NavLink
        to="https://github.com/majicmaj/awesome-selfhosted-ui"
        target="_blank"
        className={linkClass}
      >
        <Github size={20} />
        <span className="hidden xl:inline">Github</span>
      </NavLink>
      <NavLink to="/settings" className={linkClass}>
        <Settings size={20} />
        <span className="hidden xl:inline">Settings</span>
      </NavLink>
    </nav>
  );
}
