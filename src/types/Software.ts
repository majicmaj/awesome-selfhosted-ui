export interface Software {
  id: string;
  name: string;
  description: string;
  url: string;
  category: string;
  tags: string[];
  license: string;
  stars?: number;
  demo?: string;
  sourceCode?: string;
  language?: string;
  lastUpdated?: string;
  archived?: boolean;
}

export interface CategoryCount {
  name: string;
  count: number;
}