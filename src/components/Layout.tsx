import { Outlet } from "react-router-dom";
import { Navigation } from "./Navigation";
import {
  AppWindow,
  AppWindowIcon,
  HardDriveDownload,
  LayoutGrid,
  Sparkles,
  Square,
} from "lucide-react";
import { useScrollDirection } from "../hooks/useScrollDirection";

export function Layout() {
  const { isScrollingDown, scrollY } = useScrollDirection();

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 transition-colors flex flex-col">
      <header
        className={`sticky transition-all duration-300 ${
          isScrollingDown ? "-top-[50px]" : "top-0"
        } z-10`}
      >
        <div
          className={`absolute inset-0 bg-white/70 dark:bg-gray-900/70 backdrop-blur-lg transition-opacity ${
            scrollY > 0 ? "opacity-100" : "opacity-0"
          }`}
        />

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-2">
          <div className="flex flex-col items-center space-y-4">
            <div className="flex items-center space-x-3">
              <div className="flex items-center gap-1">
                <HardDriveDownload className="w-5 h-5 text-blue-500" />
                <h1 className="text-2xl font-bold bg-gradient-to-r from-blue-500 to-purple-500 bg-clip-text text-transparent">
                  ASH UI
                </h1>
              </div>
            </div>
            <div className="overflow-auto max-w-[100vw]">
              <Navigation />
            </div>
          </div>
        </div>
      </header>

      <main className="flex-1">
        <Outlet />
      </main>

      {/* <Footer /> */}
    </div>
  );
}
