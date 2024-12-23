// src/components/SoftwareCard.tsx
import { ExternalLink, FlaskConical, Github } from 'lucide-react';
import { useState } from 'react';
import type { Software } from '../types/Software';
import { getFaviconUrl } from '../utils/getFaviconUrl';
import { SoftwareModal } from './SoftwareModal';
import { LANGUAGE_CHIP_COLORS } from '../constants/languageChipColors';

interface SoftwareCardProps {
  software: Software;
}

export function SoftwareCard({ software }: SoftwareCardProps) {
  const [isModalOpen, setModalOpen] = useState(false);
  const favicon = getFaviconUrl(software.url);

  const getLanguageStyle = (language: string) => {
    const lowerLanguage = language?.toLowerCase();
    if (!(lowerLanguage in LANGUAGE_CHIP_COLORS)) return LANGUAGE_CHIP_COLORS.default;
    return LANGUAGE_CHIP_COLORS[lowerLanguage as keyof typeof LANGUAGE_CHIP_COLORS];
  };

  return (
    <>
      <div
        className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-4 hover:shadow-md transition-shadow h-[170px] flex flex-col cursor-pointer"
        onClick={() => setModalOpen(true)}
      >
        <div className="flex justify-between items-start">
          <div className="flex items-center gap-2 min-w-0">
            {favicon && (
              <img 
                src={favicon} 
                alt="" 
                className="w-5 h-5 rounded-sm flex-shrink-0"
                onError={(e) => {
                  (e.target as HTMLImageElement).style.display = 'none';
                }}
              />
            )}
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white truncate">
              {software.name}
            </h3>
            <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200 font-mono">
              {software.license}
            </span>
          </div>
          <div className="flex space-x-2 flex-shrink-0 ml-2">
            <a
              href={software.url}
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300"
              title="Website"
            >
              <ExternalLink size={20} />
            </a>
            {software.sourceCode && (
              <a
                href={software.sourceCode}
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300"
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
                className="text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300"
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
          <div className="flex flex-wrap gap-2">
          {software?.language?.split('/')?.map((language) => {
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
          </div>
        </div>
      </div>

      {isModalOpen && (
        <SoftwareModal software={software} onClose={() => setModalOpen(false)} />
      )}
    </>
  );
}
