import { Outlet } from "react-router-dom";
import { Navigation } from "./Navigation";
import { HardDriveDownload } from "lucide-react";
import { useScrollDirection } from "../hooks/useScrollDirection";

export function Layout() {
  const { isScrollingDown, scrollY } = useScrollDirection();

  return (
    <div className="min-h-screen bg-background bg-gradient-to-b transition-colors flex">
      {/* Sidebar for large screens */}
      <aside className="hidden xl:flex flex-col w-64 border-r bg-background">
        <div className="p-6">
          <div className="flex items-center gap-2.5">
            <div className="flex items-center justify-center w-10 h-10 rounded-xl bg-gradient-to-br from-blue-500/20 to-purple-500/20 dark:from-blue-500/30 dark:to-purple-500/30">
              <HardDriveDownload className="w-5 h-5 text-blue-600 dark:text-blue-400" />
            </div>
            <div>
              <h1 className="text-xl font-semibold bg-gradient-to-r from-blue-600 to-purple-600 dark:from-blue-400 dark:to-purple-400 bg-clip-text text-transparent">
                ASH UI
              </h1>
              <p className="text-xs text-gray-500 dark:text-gray-400">
                Awesome Selfhosted
              </p>
            </div>
          </div>
        </div>
        <div className="flex-1">
          <Navigation className="grid gap-2 p-4" />
        </div>
      </aside>

      {/* Main content area */}
      <div className="flex-1 flex flex-col">
        {/* Mobile header */}
        <header
          className={`xl:hidden sticky transition-all duration-300 ${
            isScrollingDown ? "-top-[72px]" : "top-0"
          } z-10`}
        >
          <div
            className={`absolute inset-0 bg-background backdrop-blur-lg transition-opacity border-b ${
              scrollY > 0 ? "opacity-100" : "opacity-0"
            }`}
          />

          <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-[72px] flex items-center">
            <div className="flex items-center gap-12">
              <div className="flex items-center gap-2.5">
                <div className="flex items-center justify-center w-10 h-10 rounded-xl bg-gradient-to-br from-blue-500/20 to-purple-500/20 dark:from-blue-500/30 dark:to-purple-500/30">
                  <HardDriveDownload className="w-5 h-5 text-blue-600 dark:text-blue-400" />
                </div>
                <div>
                  <h1 className="text-xl font-semibold bg-gradient-to-r from-blue-600 to-purple-600 dark:from-blue-400 dark:to-purple-400 bg-clip-text text-transparent">
                    ASH UI
                  </h1>
                  <p className="text-xs text-gray-500 dark:text-gray-400">
                    Awesome Selfhosted
                  </p>
                </div>
              </div>

              <Navigation />
            </div>
          </div>
        </header>

        <div className="flex-1 relative">
          <Outlet />
        </div>
      </div>
    </div>
  );
}
