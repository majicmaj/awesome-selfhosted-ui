import { Github } from 'lucide-react';

export function Footer() {
  return (
    <footer className="bg-white/70 dark:bg-gray-900/70 backdrop-blur-lg border-t border-gray-200 dark:border-gray-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <div className="flex flex-col items-center justify-center space-y-4">
          <a
            href="https://github.com/awesome-selfhosted/awesome-selfhosted"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center space-x-2 text-gray-600 dark:text-gray-300 hover:text-blue-500 dark:hover:text-blue-400 transition-colors"
          >
            <Github size={20} />
            <span>Awesome Selfhosted on GitHub</span>
          </a>
          <p className="text-sm text-gray-500 dark:text-gray-400">
            A directory of Free Software network services and web applications which can be hosted on your own servers
          </p>
        </div>
      </div>
    </footer>
  );
}