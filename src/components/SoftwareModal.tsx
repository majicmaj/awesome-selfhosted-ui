import { ExternalLink, FlaskConical, Github, Star, Clock } from "lucide-react";
import { useState, useEffect } from "react";
import type { Software } from "../types/Software";
import { LANGUAGE_CHIP_COLORS } from "../constants/languageChipColors";
import License from "./License";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import rehypeRaw from "rehype-raw";
import rehypeSanitize from "rehype-sanitize";

interface SoftwareModalProps {
  software: Software;
  onClose: () => void;
}

export function SoftwareModal({ software, onClose }: SoftwareModalProps) {
  const [readme, setReadme] = useState<string | null>(null);

  useEffect(() => {
    const fetchReadme = async () => {
      if (!software.sourceCode?.includes("github.com")) return;

      try {
        // Convert github.com URL to raw.githubusercontent.com URL
        const rawUrl =
          software.sourceCode
            .replace("github.com", "raw.githubusercontent.com")
            .replace("/tree/master", "")
            .replace("/blob/master", "") + "/master/README.md";

        const response = await fetch(rawUrl);
        if (response.ok) {
          const text = await response.text();
          setReadme(text);
        }
      } catch (error) {
        console.error("Failed to fetch README:", error);
      }
    };

    fetchReadme();
  }, [software.sourceCode]);

  const handleBackgroundClick = (
    e: React.MouseEvent<HTMLDivElement, MouseEvent>
  ) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

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
    <div
      className="fixed inset-0 bg-black bg-opacity-50 backdrop-blur-sm flex items-center justify-center z-50"
      onClick={handleBackgroundClick}
    >
      <div className="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 hover:shadow-md transition-shadow flex flex-col shadow-lg max-w-4xl w-full p-6 relative overflow-y-auto max-h-[90vh]">
        <button
          className="absolute top-4 right-4 text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300"
          onClick={onClose}
        >
          ✖
        </button>
        <div className="flex items-center gap-4">
          {faviconUrl && (
            <img
              src={faviconUrl}
              alt=""
              className="w-8 h-8 flex-shrink-0 rounded-sm bg-gray-100 dark:bg-gray-700"
              onError={(e) => {
                (e.target as HTMLImageElement).style.display = "none";
              }}
            />
          )}
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-2">
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white truncate">
                {software.name}
              </h2>
              <License license={software.license} />
              {software.archived && (
                <span className="text-sm text-red-500 font-medium">
                  (Archived)
                </span>
              )}
            </div>
            {software.stars !== undefined && (
              <div className="flex items-center gap-2 text-gray-500 dark:text-gray-400 mt-1">
                <Star size={16} className="inline" />
                <span>{software.stars.toLocaleString()} stars</span>
                {software.lastUpdated && (
                  <>
                    <span className="mx-2">•</span>
                    <Clock size={16} className="inline" />
                    <span>Updated {formatDate(software.lastUpdated)}</span>
                  </>
                )}
              </div>
            )}
          </div>
        </div>

        <p className="mt-4 text-gray-600 dark:text-gray-300">
          {software.description}
        </p>

        <div className="mt-6 space-y-4">
          <div className="flex space-x-4">
            {software.url && (
              <a
                href={software.url}
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-600 dark:text-blue-400 hover:underline flex items-center gap-1"
              >
                <ExternalLink size={20} className="inline" />
                <span>Website</span>
              </a>
            )}
            {software.sourceCode && (
              <a
                href={software.sourceCode}
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-600 dark:text-blue-400 hover:underline flex items-center gap-1"
              >
                <Github size={20} className="inline" />
                <span>Source Code</span>
              </a>
            )}
            {software.demo && (
              <a
                href={software.demo}
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-600 dark:text-blue-400 hover:underline flex items-center gap-1"
              >
                <FlaskConical size={20} className="inline" />
                <span>Demo</span>
              </a>
            )}
          </div>

          <div className="flex flex-wrap gap-2">
            {software?.language?.split("/")?.map((language) => {
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

          <div className="flex flex-wrap gap-2">
            {software.tags.map((tag) => (
              <span
                key={tag}
                className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-gray-100 dark:bg-gray-700 text-gray-800 dark:text-gray-200"
              >
                {tag}
              </span>
            ))}
          </div>
        </div>

        {readme && (
          <div className="mt-8 border border-gray-200 dark:border-gray-700 rounded-lg overflow-hidden">
            <div className="bg-gray-50 dark:bg-gray-800 px-4 py-2 border-b border-gray-200 dark:border-gray-700">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100">
                README
              </h3>
            </div>
            <div className="p-6 overflow-auto max-h-[600px] bg-white dark:bg-gray-900">
              <article
                className="prose dark:prose-invert max-w-none 
                prose-headings:border-b prose-headings:border-gray-200 dark:prose-headings:border-gray-800 prose-headings:pb-2
                prose-headings:mb-4 prose-headings:mt-6
                prose-h1:text-3xl prose-h2:text-2xl prose-h3:text-xl
                prose-pre:bg-gray-100 dark:prose-pre:bg-gray-800 prose-pre:p-4 prose-pre:rounded-lg
                prose-code:text-gray-800 dark:prose-code:text-gray-200 prose-code:bg-gray-100 dark:prose-code:bg-gray-800 prose-code:px-1 prose-code:py-0.5 prose-code:rounded
                prose-img:rounded-lg prose-img:max-w-full
                prose-a:text-blue-600 dark:prose-a:text-blue-400 prose-a:no-underline hover:prose-a:underline
                prose-blockquote:border-l-4 prose-blockquote:border-gray-300 dark:prose-blockquote:border-gray-700
                prose-blockquote:pl-4 prose-blockquote:italic prose-blockquote:text-gray-700 dark:prose-blockquote:text-gray-300
                prose-table:border prose-table:border-gray-300 dark:prose-table:border-gray-700
                prose-th:bg-gray-100 dark:prose-th:bg-gray-800 prose-th:p-2
                prose-td:p-2 prose-td:border prose-td:border-gray-300 dark:prose-td:border-gray-700"
              >
                <ReactMarkdown
                  remarkPlugins={[remarkGfm]}
                  rehypePlugins={[rehypeRaw, rehypeSanitize]}
                  components={{
                    a: ({ node, ...props }) => (
                      <a {...props} target="_blank" rel="noopener noreferrer" />
                    ),
                  }}
                >
                  {readme}
                </ReactMarkdown>
              </article>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
