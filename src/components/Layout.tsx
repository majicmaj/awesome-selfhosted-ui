import { Outlet } from "react-router-dom";
import { Navigation } from "./Navigation";
import { useScrollDirection } from "../hooks/useScrollDirection";

export function Layout() {
  const { isScrollingDown, scrollY } = useScrollDirection();

  return (
    <div className="min-h-screen h-screen xl:overflow-auto bg-background bg-gradient-to-b transition-colors flex">
      {/* Sidebar for large screens */}
      <aside className="bg-card xl:overflow-auto hidden xl:flex flex-col w-56 border-r">
        <div className="flex-1">
          <Navigation className="grid gap-2 p-2" />
        </div>
      </aside>

      {/* Main content area */}
      <div className="flex-1 w-full flex-col xl:overflow-auto">
        {/* Mobile header */}
        <header
          className={`xl:hidden sticky z-10 transition-all overflow-auto duration-300 ${
            isScrollingDown ? "-top-[72px]" : "top-0"
          }`}
        >
          <div
            className={`absolute inset-0 bg-background backdrop-blur-lg transition-opacity border-b ${
              scrollY > 0 ? "opacity-100" : "opacity-0"
            }`}
          />
          <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-[72px] flex items-center">
            <div className="flex items-center gap-2">
              <Navigation />
            </div>
          </div>
        </header>

        <div className="flex-1 flex flex-col w-full relative xl:overflow-auto">
          <Outlet />
        </div>
      </div>
    </div>
  );
}
