// src/components/SoftwareModal.tsx
import { ExternalLink, FlaskConical, Github } from 'lucide-react';
import type { Software } from '../types/Software';
import { getFaviconUrl } from '../utils/getFaviconUrl';
import { LANGUAGE_CHIP_COLORS } from '../constants/languageChipColors';

interface SoftwareModalProps {
  software: Software;
  onClose: () => void;
}

export function SoftwareModal({ software, onClose }: SoftwareModalProps) {
  const favicon = getFaviconUrl(software.url);

  const handleBackgroundClick = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

    const getLanguageStyle = (language: string) => {
      const lowerLanguage = language?.toLowerCase();
      if (!(lowerLanguage in LANGUAGE_CHIP_COLORS)) return LANGUAGE_CHIP_COLORS.default;
      return LANGUAGE_CHIP_COLORS[lowerLanguage as keyof typeof LANGUAGE_CHIP_COLORS];
    };
  

  return (
    <div
      className="fixed inset-0 bg-black bg-opacity-50 backdrop-blur-sm flex items-center justify-center z-50"
      onClick={handleBackgroundClick}
    >
      <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-4 hover:shadow-md transition-shadow flex flex-col shadow-lg max-w-4xl w-full p-6 relative">
        <button
          className="absolute top-4 right-4 text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300"
          
          onClick={onClose}
        >
          ✖
        </button>
        <div className="flex items-center gap-4">
          {favicon && <img src={favicon} alt="" className="w-8 h-8 rounded-sm" />}
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
            {software.name}
          </h2>

          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200 font-mono">
              {software.license}
            </span>
        </div>
        
        <p className="mt-4 text-gray-600 dark:text-gray-300">{software.description}</p>
        <div className="mt-6 space-y-4">
          <div className="flex space-x-4">
            {software.url && (
              <a
                href={software.url}
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-600 dark:text-blue-400 hover:underline flex items-center gap-1"
              >
                <ExternalLink size={20} className="inline" /> <span>
                  Website
                  </span>
              </a>
            )}
            {software.sourceCode && (
              <a
                href={software.sourceCode}
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-600 dark:text-blue-400 hover:underline flex items-center gap-1"
              >
                <Github size={20} className="inline" /> <span>
                  Source Code
                  </span>
              </a>
            )}
            {software.demo && (
              <a
                href={software.demo}
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-600 dark:text-blue-400 hover:underline flex items-center gap-1"
              >
                <FlaskConical size={20} className="inline" /> <span>
                  Demo
                  </span>
              </a>
            )}
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
      </div>
    </div>
  );
}