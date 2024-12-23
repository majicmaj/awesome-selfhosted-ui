import { ExternalLink, Github, Tag } from 'lucide-react';
import type { Software } from '../types/Software';

interface SoftwareCardProps {
  software: Software;
}

function getFaviconUrl(url: string): string {
  try {
    const domain = new URL(url).hostname;
    return `https://www.google.com/s2/favicons?domain=${domain}&sz=32`;
  } catch {
    return '';
  }
}

function formatLinks(url: string, sourceCode?: string): string {
  const links = [url];
  if (sourceCode) {
    links.push(sourceCode);
  }
  return `(${links.join('), (')})`;
}

export function SoftwareCard({ software }: SoftwareCardProps) {
  const favicon = getFaviconUrl(software.url);

  return (
    <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-6 hover:shadow-md transition-shadow h-[280px] flex flex-col">
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
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white truncate">{software.name}</h3>
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
        </div>
      </div>
      
      <div className="mt-2 overflow-y-auto scrollbar-thin scrollbar-thumb-gray-200 dark:scrollbar-thumb-gray-700 hover:scrollbar-thumb-gray-300 dark:hover:scrollbar-thumb-gray-600 pr-2 flex-grow">
        <p className="text-gray-600 dark:text-gray-300 text-sm">{software.description}</p>
      </div>
      
      <div className="mt-4 space-y-2 flex-shrink-0">
        <div className="text-sm text-gray-500 dark:text-gray-400 truncate">
          {formatLinks(software.url, software.sourceCode)}
        </div>
        
        <div className="flex flex-wrap gap-2">
          
          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200 font-mono">
            {software.license}
          </span>

          {software.tags.map((tag) => (
            <span
              key={tag}
              className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-gray-100 dark:bg-gray-700 text-gray-800 dark:text-gray-200"
            >
              <Tag size={12} className="mr-1" />
              {tag}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}