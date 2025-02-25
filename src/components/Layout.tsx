import { Outlet } from "react-router-dom";
import { Navigation } from "./Navigation";
import { useScrollDirection } from "../hooks/useScrollDirection";
import logo from "@/assets/logo.png";

export function Layout() {
  const { isScrollingDown, scrollY } = useScrollDirection();

  return (
    <div className="min-h-screen h-screen overflow-auto bg-background bg-gradient-to-b transition-colors flex">
      {/* Sidebar for large screens */}
      <aside className="bg-card overflow-auto hidden xl:flex flex-col w-56 border-r">
        <div className="flex-1">
          <Navigation className="grid gap-2 p-4" />
        </div>
      </aside>

      {/* Main content area */}
      <div className="flex-1 w-full flex-col overflow-auto">
        {/* Mobile header */}
        <header
          className={`xl:hidden sticky transition-all overflow-autoduration-300 ${
            isScrollingDown ? "-top-[72px]" : "top-0"
          } z-10`}
        >
          <div
            className={`absolute inset-0 bg-background backdrop-blur-lg transition-opacity border-b ${
              scrollY > 0 ? "opacity-100" : "opacity-0"
            }`}
          />

          <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-[72px] flex items-center">
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-2.5">
                <img
                  src={logo}
                  className="aspect-square min-w-7 w-7 h-7 text-blue-600 dark:text-blue-400"
                />
              </div>

              <Navigation />
            </div>
          </div>
        </header>

        <div className="flex-1 flex flex-col w-full relative overflow-auto">
          <Outlet />
        </div>
      </div>
    </div>
  );
}
