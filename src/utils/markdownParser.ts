import { marked } from "marked";
import type { Software } from "../types/Software";

function generateUniqueId(name: string, index: number): string {
  // Create a unique ID by combining name and index
  return `${name.toLowerCase().replace(/[^a-z0-9]+/g, "-")}-${index}`;
}

// ------------------------------------------------------------------
// Main function: Fetch, parse, and update the "new" tags based on cache
// ------------------------------------------------------------------
export async function fetchAndParseMd(): Promise<Software[]> {
  // Cache duration of 30 days (in milliseconds)
  const cacheDuration = 30 * 24 * 60 * 60 * 1000;
  const now = Date.now();

  // Determine if this is the first visit
  const isFirstVisit = !localStorage.getItem("firstVisitDone");
  if (isFirstVisit) {
    // Mark that the first visit has occurred
    localStorage.setItem("firstVisitDone", "true");
  }

  // === 1. Cache the README markdown in localStorage ===
  const readmeCacheKey = "readmeCache";
  const readmeCacheTimestampKey = "readmeCacheTimestamp";
  let markdownText: string;

  const cachedMarkdown = localStorage.getItem(readmeCacheKey);
  const cachedMarkdownTimestamp = localStorage.getItem(readmeCacheTimestampKey);

  if (
    cachedMarkdown &&
    cachedMarkdownTimestamp &&
    now - parseInt(cachedMarkdownTimestamp, 10) < cacheDuration
  ) {
    // Use cached markdown if it exists and is still fresh
    markdownText = cachedMarkdown;
  } else {
    // Otherwise fetch the markdown from the remote URL...
    const response = await fetch(
      "https://raw.githubusercontent.com/awesome-selfhosted/awesome-selfhosted/master/README.md"
    );
    markdownText = await response.text();
    // ... and update the cache
    localStorage.setItem(readmeCacheKey, markdownText);
    localStorage.setItem(readmeCacheTimestampKey, now.toString());
  }

  // === 2. Parse the markdown using marked ===
  const tokens = marked.lexer(markdownText);
  const software: Software[] = [];
  let currentCategory = "";
  let listIndex = 0; // used to generate a unique ID

  tokens.forEach((token: any) => {
    if (token.type === "heading" && token.depth === 3) {
      currentCategory = token.text;
    }

    if (token.type === "list") {
      token.items.forEach((item: any) => {
        const text = item.text;
        const match = text.match(
          /^\[([^\]]+)\]\(([^\)]+)\)\s*-\s*(.+?)(?:\s*`([^`]+)`)(?:\s*`([^`]+)`)?$/
        );

        // Example item:
        // - [Activepieces](https://www.activepieces.com) - No-code business automation tool. ([Source Code](https://github.com/activepieces/activepieces)) `MIT` `Docker`
        if (match) {
          const [, name, url, description, license, language] = match;

          // Optionally extract tags, sourceCode, demo etc.
          const tags =
            description
              .match(/\[([^\]]+)\]/g)
              ?.map((tag: string) => tag.slice(1, -1)) || [];
          const sourceCode = description.match(
            /\[Source Code\]\((https?:\/\/[^\)]+)\)/
          )?.[1];
          const demo = description.match(
            /\[Demo\]\((https?:\/\/[^\)]+)\)/
          )?.[1];

          software.push({
            id: generateUniqueId(name, listIndex),
            name,
            url,
            sourceCode,
            description: description.replace(
              /\([^\)]+\)+,*|\`[^\`]+\`|\[[^\]]+\]/g,
              ""
            ),
            category: currentCategory,
            tags, // initial tags parsed from the description
            license,
            language,
            demo,
          });

          listIndex++;
        }
      });
    }
  });

  // === 3. Check/update the software cache in localStorage ===
  // We keep a simple cache mapping software.id -> { added: string }
  const softwareCacheKey = "softwareCache";
  let softwareCache: { [id: string]: { added: string } } = JSON.parse(
    localStorage.getItem(softwareCacheKey) || "{}"
  );

  // Process each software entry
  software.forEach((soft) => {
    if (softwareCache[soft.id]) {
      // This software was seen before; check how old it is:
      const addedDate = new Date(softwareCache[soft.id].added);
      if (!isFirstVisit && now - addedDate.getTime() < cacheDuration) {
        // If not first visit and added less than 30 days ago, add a "new" tag (if not already present)
        if (!soft.tags.includes("new")) {
          soft.tags.push("new");
        }
      } else if (!isFirstVisit && now - addedDate.getTime() >= cacheDuration) {
        // More than 30 days ago; remove from our cache so it is no longer “new”
        delete softwareCache[soft.id];
      }
      // On first visit, do nothing (even if it's in the cache)
    } else {
      // This software is not in the cache yet
      if (isFirstVisit) {
        // On first visit, add it to the cache with an old timestamp so it won't be marked as new
        softwareCache[soft.id] = {
          added: (now - cacheDuration - 1).toString(),
        };
      } else {
        // On subsequent visits, add it as new
        softwareCache[soft.id] = { added: now.toString() };
        if (!soft.tags.includes("new")) {
          soft.tags.push("new");
        }
      }
    }
  });

  // Save the updated software cache back to localStorage
  localStorage.setItem(softwareCacheKey, JSON.stringify(softwareCache));

  return software;
}

// ------------------------------------------------------------------
// Helper Functions for Testing: Manually add or remove "new" items
// ------------------------------------------------------------------

/**
 * Manually add a software item to the "new" list.
 * This sets the "added" date to now for the given software id.
 *
 * @param softwareId - The unique id of the software item.
 */
export function addSoftwareToNew(softwareId: string): void {
  const softwareCacheKey = "softwareCache";
  const now = Date.now();
  let softwareCache: { [id: string]: { added: string } } = JSON.parse(
    localStorage.getItem(softwareCacheKey) || "{}"
  );

  softwareCache[softwareId] = { added: now.toString() };
  localStorage.setItem(softwareCacheKey, JSON.stringify(softwareCache));

  console.log(`Software ${softwareId} marked as new.`);
}

/**
 * Manually remove a software item from the "new" list.
 * This removes the software from the cache so it won't be tagged as "new".
 *
 * @param softwareId - The unique id of the software item.
 */
export function removeSoftwareFromNew(softwareId: string): void {
  const softwareCacheKey = "softwareCache";
  let softwareCache: { [id: string]: { added: string } } = JSON.parse(
    localStorage.getItem(softwareCacheKey) || "{}"
  );

  if (softwareCache[softwareId]) {
    delete softwareCache[softwareId];
    localStorage.setItem(softwareCacheKey, JSON.stringify(softwareCache));
    console.log(`Software ${softwareId} removed from new list.`);
  } else {
    console.log(`Software ${softwareId} was not found in the new list.`);
  }
}
