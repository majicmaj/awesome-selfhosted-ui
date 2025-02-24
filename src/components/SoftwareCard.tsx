import { ExternalLink, FlaskConical, Github, Star, Clock } from "lucide-react";
import { useState } from "react";
import type { Software } from "../types/Software";
import { LANGUAGE_CHIP_COLORS } from "../constants/languageChipColors";
import License from "./License";
import { useSettings } from "../contexts/SettingsContext";
import { SoftwareModal } from "./SoftwareModal";

interface SoftwareCardProps {
  software: Software;
}

export function SoftwareCard({ software }: SoftwareCardProps) {
  const [isModalOpen, setModalOpen] = useState(false);
  const { settings } = useSettings();

  // Extract domain from URL for favicon
  const getDomain = (url: string) => {
    try {
      return new URL(url).hostname;
    } catch {
      return null;
    }
  };

  const domain = getDomain(software.url);
  const faviconUrl = domain
    ? `https://www.google.com/s2/favicons?domain=${domain}&sz=128`
    : null;

  // Determine card styling based on status
  const cardStyle = software.archived
    ? "bg-card bg-gradient-to-br from-warning/5 to-transparent border-warning/20"
    : "bg-card bg-gradient-to-br from-primary/5 to-transparent border-primary/20";

  const getLanguageStyle = (language: string) => {
    const lowerLanguage = language?.toLowerCase();
    if (!(lowerLanguage in LANGUAGE_CHIP_COLORS))
      return LANGUAGE_CHIP_COLORS.default;
    return LANGUAGE_CHIP_COLORS[
      lowerLanguage as keyof typeof LANGUAGE_CHIP_COLORS
    ];
  };

  const formatDate = (dateString?: string) => {
    if (!dateString) return "";
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  };

  return (
    <>
      <div
        className={`rounded-xl shadow-sm border p-4 hover:shadow-md transition-all duration-300 h-[170px] flex flex-col cursor-pointer group ${cardStyle}`}
        onClick={() => setModalOpen(true)}
      >
        <div className="flex justify-between items-start">
          <div className="flex items-center gap-2 min-w-0">
            {faviconUrl && (
              <img
                src={faviconUrl}
                className="w-8 h-8 flex-shrink-0 rounded-sm bg-gray-100 dark:bg-gray-700"
                onError={(e) => {
                  (e.target as HTMLImageElement).style.display = "none";
                }}
              />
            )}

            <div className="min-w-0 overflow-hidden">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white truncate group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                {software.name}
                {software.archived && (
                  <span className="ml-2 text-xs text-red-500/75 dark:text-red-400/75 font-normal">
                    (Archived)
                  </span>
                )}
              </h3>
              {settings.display.showLicenseBadges && (
                <License license={software.license} />
              )}
            </div>
          </div>

          <div
            className="flex space-x-2 flex-shrink-0 ml-2 opacity-75 group-hover:opacity-100 transition-opacity"
            onClick={(e) => e.stopPropagation()}
          >
            {software.url && (
              <a
                href={software.url}
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-500 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
                title="Website"
              >
                <ExternalLink size={20} />
              </a>
            )}
            {software.sourceCode && (
              <a
                href={software.sourceCode}
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-500 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
                title="Source Code"
              >
                <Github size={20} />
              </a>
            )}
            {software.demo && (
              <a
                href={software.demo}
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-500 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
                title="Demo"
              >
                <FlaskConical size={20} />
              </a>
            )}
          </div>
        </div>

        <div className="mt-2 overflow-y-auto scrollbar-thin scrollbar-thumb-gray-200 dark:scrollbar-thumb-gray-700 hover:scrollbar-thumb-gray-300 dark:hover:scrollbar-thumb-gray-600 pr-2 flex-grow">
          <p className="text-gray-600 dark:text-gray-300 text-sm">
            {software.description}
          </p>
        </div>

        <div className="mt-4 space-y-2 flex-shrink-0">
          <div className="flex flex-wrap gap-2 items-center">
            {settings.display.showPlatformBadges &&
              software?.language?.split("/")?.map((language) => {
                const styles = getLanguageStyle(language);
                return (
                  <span
                    key={language}
                    className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${styles.background} ${styles.text} font-mono`}
                  >
                    {language}
                  </span>
                );
              })}

            {settings.display.showStarCount && software.stars !== undefined && (
              <span className="inline-flex items-center gap-1 text-xs text-gray-500 dark:text-gray-400">
                <Star size={12} className="text-amber-500" />
                {software.stars.toLocaleString()}
              </span>
            )}

            {settings.display.showLastUpdated && software.lastUpdated && (
              <span className="inline-flex items-center gap-1 text-xs text-gray-500 dark:text-gray-400">
                <Clock size={12} />
                {formatDate(software.lastUpdated)}
              </span>
            )}
          </div>
        </div>
      </div>

      {isModalOpen && (
        <SoftwareModal
          software={software}
          onClose={() => setModalOpen(false)}
        />
      )}
    </>
  );
}
