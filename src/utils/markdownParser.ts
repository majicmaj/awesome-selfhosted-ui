import { marked } from 'marked';
import type { Software } from '../types/Software';

function generateUniqueId(name: string, url: string, index: number): string {
  // Create a unique ID by combining name, url and index
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
        const matches = text.match(/^\[([^\]]+)\]\(([^\)]+)\)\s*-\s*(.+?)(?:\s*`([^`]+)`)?$/);
        
        if (matches) {
          const [, name, url, description, license] = matches;
          const tags = description.match(/\[([^\]]+)\]/g)?.map(tag => tag.slice(1, -1)) || [];
          
          software.push({
            id: generateUniqueId(name, url, index),
            name,
            url,
            description: description.replace(/\[([^\]]+)\]/g, '').trim(),
            category: currentCategory,
            tags,
            license: license || 'Unknown'
          });
        }
      });
    }
  });

  return software;
}