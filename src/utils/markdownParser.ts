import { marked } from 'marked';
import type { Software } from '../types/Software';

function generateUniqueId(name: string, index: number): string {
  // Create a unique ID by combining name and index
  return `${name.toLowerCase().replace(/[^a-z0-9]+/g, '-')}-${index}`;
}

export async function fetchAndParseMd(): Promise<Software[]> {
  const response = await fetch('https://raw.githubusercontent.com/awesome-selfhosted/awesome-selfhosted/master/README.md');
  const text = await response.text();
  
  const tokens = marked.lexer(text);
  const software: Software[] = [];
  let currentCategory = '';

  tokens.forEach((token: any) => {
    if (token.type === 'heading' && token.depth === 3) {
      currentCategory = token.text;
    }
    
    if (token.type === 'list') {
      token.items.forEach((item: any, index: number) => {
        const text = item.text;
        const match = text.match(/^\[([^\]]+)\]\(([^\)]+)\)\s*-\s*(.+?)(?:\s*`([^`]+)`)?$/);

        // Example: - [Activepieces](https://www.activepieces.com) - No-code business automation tool like Zapier or Tray. For example, you can send a Slack notification for each new Trello card. ([Source Code](https://github.com/activepieces/activepieces)) `MIT` `Docker`
        if (match) {
          const [, name, url, description, license] = match;

          // Description example: "WackoWiki is a light and easy to install multilingual Wiki-engine. ([Source Code](https://github.com/WackoWiki/wackowiki)) `BSD-3-Clause`"
          const tags = description.match(/\[([^\]]+)\]/g)?.map((tag: string) => tag.slice(1, -1)) || [];
        
          const sourceCode = description.match(/\[Source Code\]\((https?:\/\/[^\)]+)\)/)?.[1]
          const demo = description.match(/\[Demo\]\((https?:\/\/[^\)]+)\)/)?.[1]
          
          software.push({
            id: generateUniqueId(name, index),
            name,
            url,
            sourceCode,
            description: description.replace(/\([^\)]+\)\)|\`[^\`+\`]/g, ''),
            category: currentCategory,
            tags,
            license,
            demo,
          });
        }
      });
    }
  });

  return software;
}