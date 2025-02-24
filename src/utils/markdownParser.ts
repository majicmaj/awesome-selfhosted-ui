import { marked } from "marked";
import type { Software } from "../types/Software";

interface CacheItem {
  data: any;
  timestamp: number;
}

export async function fetchAndParseMd(): Promise<Software[]> {
  const response = await fetch(
    "https://raw.githubusercontent.com/awesome-selfhosted/awesome-selfhosted/master/README.md"
  );
  const text = await response.text();
  const tokens = marked.lexer(text);

  const software: Software[] = [];
  let currentCategory = "";
  const fetchPromises: Promise<void>[] = [];

  for (const token of tokens) {
    if (token.type === "heading" && token.depth === 3) {
      currentCategory = token.text;
    }
    if (token.type === "list") {
      for (const item of token.items) {
        // Wrap the async operation in a promise and push it to the array
        fetchPromises.push(
          (async () => {
            const itemText = item.text;
            const nameMatch = itemText.match(/^\[([^\]]+)\]/);
            const urlMatch = itemText.match(/\(([^\)]+)\)/);
            const descriptionMatch = itemText.match(
              /\]\([^\)]+\)\s*-\s*([^`]+)/
            );

            if (nameMatch && urlMatch && descriptionMatch) {
              const name = nameMatch[1];
              const softwareSlug = name
                .toLowerCase()
                .replaceAll(/[^\p{L}0-9-.]+/gu, "-")
                .replace(/^-+|-+$/g, "");

              try {
                const cacheKey = `software-${softwareSlug}`;
                const cached = localStorage.getItem(cacheKey);
                let itemData;

                if (cached) {
                  const parsedCache: CacheItem = JSON.parse(cached);
                  if (!parsedCache.data?.name) {
                    localStorage.removeItem(cacheKey);
                  }
                  const settings = JSON.parse(
                    localStorage.getItem("settings") || "{}"
                  );
                  const cacheDuration =
                    (settings?.discover?.cacheDuration || 24) * 60 * 60 * 1000;

                  if (Date.now() - parsedCache.timestamp < cacheDuration) {
                    itemData = parsedCache.data;
                  }
                }

                if (!itemData) {
                  const softwareDataResponse = await fetch(
                    `https://raw.githubusercontent.com/awesome-selfhosted/awesome-selfhosted-data/master/software/${softwareSlug}.yml`
                  );
                  const dataText = await softwareDataResponse.text();

                  try {
                    itemData = JSON.parse(dataText);
                  } catch (jsonError) {
                    itemData = parseYaml(dataText);
                  }

                  if (!itemData || !itemData.name) {
                    console.error(`Failed to parse data for ${name}`);
                    return;
                  }

                  localStorage.setItem(
                    cacheKey,
                    JSON.stringify({
                      data: itemData,
                      timestamp: Date.now(),
                    })
                  );
                }

                software.push({
                  id: itemData.name.toLowerCase().replace(/[^a-z0-9]+/g, "-"),
                  name: itemData.name.replace(/[^a-zA-Z0-9\s]/g, ""),
                  description: itemData.description?.replace(/"/g, ""),
                  url: itemData.website_url?.replace(/"/g, ""),
                  category:
                    itemData.tags?.[0] || currentCategory || "Uncategorized",
                  tags: itemData.tags || [],
                  license: Array.isArray(itemData.licenses)
                    ? itemData.licenses.join("/")
                    : itemData.licenses || "",
                  stars: itemData.stargazers_count,
                  demo: itemData.demo_url?.replace(/"/g, ""),
                  sourceCode: itemData.source_code_url,
                  language: Array.isArray(itemData.platforms)
                    ? itemData.platforms.join("/")
                    : itemData.platforms || "",
                  lastUpdated: itemData.updated_at,
                  archived: itemData.archived || false,
                });
              } catch (e) {
                console.error(`Failed to fetch or parse data for ${name}:`, e);
              }
            }
          })()
        );
      }
    }
  }

  // Wait for all requests to complete
  await Promise.all(fetchPromises);
  return software;
}

function parseYaml(yamlText: string): any {
  const result: any = {};
  let currentKey: string | null = null;
  let currentArray: string[] | null = null;
  let isInArray = false;

  const lines = yamlText.split("\n");

  for (const lineRaw of lines) {
    const line = lineRaw.trim();
    if (!line) continue;

    const match = line.match(/^([^:]+):\s*(.*)$/);
    if (match) {
      const [, key, value] = match;
      if (value) {
        result[key.trim()] = value.trim();
        isInArray = false;
      } else {
        currentKey = key.trim();
        currentArray = [];
        result[currentKey] = currentArray;
        isInArray = true;
      }
    } else if (isInArray && currentArray) {
      currentArray.push(line.replace(/^-\s*/, "").trim());
    }
  }
  return result;
}
