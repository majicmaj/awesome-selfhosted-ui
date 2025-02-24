import { createContext, useContext, useEffect, useState } from "react";

interface DiscoverSettings {
  categoriesCount: number;
  itemsPerCategory: number;
  showArchived: boolean;
  cacheDuration: number; // Duration in hours
}

interface DisplaySettings {
  showStarCount: boolean;
  showLastUpdated: boolean;
  showPlatformBadges: boolean;
  showLicenseBadges: boolean;
}

interface Settings {
  discover: DiscoverSettings;
  display: DisplaySettings;
}

interface SettingsContextType {
  settings: Settings;
  updateSettings: (newSettings: Partial<Settings>) => void;
  updateDiscoverSettings: (newSettings: Partial<DiscoverSettings>) => void;
  updateDisplaySettings: (newSettings: Partial<DisplaySettings>) => void;
}

const defaultSettings: Settings = {
  discover: {
    categoriesCount: 10,
    itemsPerCategory: 6,
    showArchived: true,
    cacheDuration: 24, // Default to 24 hours
  },
  display: {
    showStarCount: true,
    showLastUpdated: true,
    showPlatformBadges: true,
    showLicenseBadges: true,
  },
};

const SettingsContext = createContext<SettingsContextType | undefined>(
  undefined
);

export function SettingsProvider({ children }: { children: React.ReactNode }) {
  const [settings, setSettings] = useState<Settings>(() => {
    const stored = localStorage.getItem("settings");
    return stored
      ? { ...defaultSettings, ...JSON.parse(stored) }
      : defaultSettings;
  });

  useEffect(() => {
    localStorage.setItem("settings", JSON.stringify(settings));
  }, [settings]);

  const updateSettings = (newSettings: Partial<Settings>) => {
    setSettings((prev) => ({ ...prev, ...newSettings }));
  };

  const updateDiscoverSettings = (newSettings: Partial<DiscoverSettings>) => {
    setSettings((prev) => ({
      ...prev,
      discover: { ...prev.discover, ...newSettings },
    }));
  };

  const updateDisplaySettings = (newSettings: Partial<DisplaySettings>) => {
    setSettings((prev) => ({
      ...prev,
      display: { ...prev.display, ...newSettings },
    }));
  };

  return (
    <SettingsContext.Provider
      value={{
        settings,
        updateSettings,
        updateDiscoverSettings,
        updateDisplaySettings,
      }}
    >
      {children}
    </SettingsContext.Provider>
  );
}

export const useSettings = () => {
  const context = useContext(SettingsContext);
  if (!context)
    throw new Error("useSettings must be used within SettingsProvider");
  return context;
};
