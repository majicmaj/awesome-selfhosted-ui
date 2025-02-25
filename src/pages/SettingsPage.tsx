import { Settings, Sun, Moon } from "lucide-react";
import { useSettings } from "../contexts/SettingsContext";
import { useTheme } from "../contexts/ThemeContext";
import { Button } from "@/components/ui/button";

export function SettingsPage() {
  const { settings, updateDiscoverSettings, updateDisplaySettings } =
    useSettings();
  const { theme, toggleTheme } = useTheme();

  return (
    <main className="max-w-4xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="space-y-6">
        {/* Theme Settings */}
        <div className="bg-card rounded-xl shadow-sm border p-6">
          <div className="flex items-center gap-3 mb-6">
            {theme === "light" ? (
              <Sun className="w-6 h-6" />
            ) : (
              <Moon className="w-6 h-6" />
            )}
            <h2 className="text-lg font-semibold ">Theme</h2>
          </div>
          <Button onClick={toggleTheme} variant="outline">
            Switch to {theme === "light" ? "Dark" : "Light"} Mode
          </Button>
        </div>

        {/* Discover Settings */}
        <div className="bg-card rounded-xl shadow-sm border p-6">
          <div className="flex items-center gap-3 mb-6">
            <Settings className="w-6 h-6 " />
            <h2 className="text-lg font-semibold ">Discover Page</h2>
          </div>

          <div className="space-y-6">
            <div className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium mb-1">
                    Number of Categories
                  </label>
                  <input
                    type="number"
                    min="1"
                    max="20"
                    value={settings.discover.categoriesCount}
                    onChange={(e) =>
                      updateDiscoverSettings({
                        categoriesCount: Math.min(
                          20,
                          Math.max(1, parseInt(e.target.value) || 1)
                        ),
                      })
                    }
                    className="w-full px-3 py-2 border rounded-md bg-background"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1">
                    Items per Category
                  </label>
                  <input
                    type="number"
                    min="1"
                    max="12"
                    value={settings.discover.itemsPerCategory}
                    onChange={(e) =>
                      updateDiscoverSettings({
                        itemsPerCategory: Math.min(
                          12,
                          Math.max(1, parseInt(e.target.value) || 1)
                        ),
                      })
                    }
                    className="w-full px-3 py-2 border rounded-md bg-background"
                  />
                </div>
              </div>

              <label className="flex items-center justify-between">
                <span className="text-gray-700 dark:text-gray-300">
                  Show archived software
                </span>
                <input
                  type="checkbox"
                  checked={settings.discover.showArchived}
                  onChange={(e) =>
                    updateDiscoverSettings({ showArchived: e.target.checked })
                  }
                  className="w-4 h-4 rounded"
                />
              </label>
            </div>
          </div>
        </div>

        {/* Display Settings */}
        <div className="bg-card rounded-xl shadow-sm border p-6">
          <div className="flex items-center gap-3 mb-6">
            <Settings className="w-6 h-6 text-gray-600 dark:text-gray-300" />
            <h2 className="text-lg font-semibold text-gray-900 dark:text-white">
              Display Options
            </h2>
          </div>

          <div className="space-y-4">
            <label className="flex items-center justify-between">
              <span className="">Show star count</span>
              <input
                type="checkbox"
                checked={settings.display.showStarCount}
                onChange={(e) =>
                  updateDisplaySettings({ showStarCount: e.target.checked })
                }
                className="w-4 h-4 rounded"
              />
            </label>

            <label className="flex items-center justify-between">
              <span className="">Show last updated date</span>
              <input
                type="checkbox"
                checked={settings.display.showLastUpdated}
                onChange={(e) =>
                  updateDisplaySettings({ showLastUpdated: e.target.checked })
                }
                className="w-4 h-4 rounded"
              />
            </label>

            <label className="flex items-center justify-between">
              <span className="">Show platform badges</span>
              <input
                type="checkbox"
                checked={settings.display.showPlatformBadges}
                onChange={(e) =>
                  updateDisplaySettings({
                    showPlatformBadges: e.target.checked,
                  })
                }
                className="w-4 h-4 rounded"
              />
            </label>

            <label className="flex items-center justify-between">
              <span className="text-gray-700 dark:text-gray-300">
                Show license badges
              </span>
              <input
                type="checkbox"
                checked={settings.display.showLicenseBadges}
                onChange={(e) =>
                  updateDisplaySettings({ showLicenseBadges: e.target.checked })
                }
                className="w-4 h-4 rounded"
              />
            </label>
          </div>
        </div>
      </div>
    </main>
  );
}
