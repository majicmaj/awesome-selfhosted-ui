import { useState, useEffect, useMemo } from "react";
import { useSearchParams } from "react-router-dom";
import { fetchAndParseMd } from "../../../utils/markdownParser";
import type { Software } from "../../../types/Software";
import type { CatalogFilters } from "../../../components/CatalogFilterBar";

export function useCatalogData() {
  const [searchParams, setSearchParams] = useSearchParams();
  const [software, setSoftware] = useState<Software[]>([]);
  const [loading, setLoading] = useState(true);

  const search = searchParams.get("search") || "";
  const selectedCategory = searchParams.get("category") || "";

  const [filters, setFilters] = useState<CatalogFilters>({
    archived: "hide",
    sortBy: "name",
    sortOrder: "asc",
    license: "",
    language: "",
  });

  useEffect(() => {
    fetchAndParseMd().then((data) => {
      setSoftware(data);
      setLoading(false);
    });
  }, []);

  const setSearch = (value: string) => {
    setSearchParams((params) => {
      if (value) {
        params.set("search", value);
      } else {
        params.delete("search");
      }
      return params;
    });
  };

  const setSelectedCategory = (value: string) => {
    setSearchParams((params) => {
      if (value) {
        params.set("category", value);
      } else {
        params.delete("category");
      }
      return params;
    });
  };

  // Get available licenses and languages
  const { availableLicenses, availableLanguages } = useMemo(() => {
    const licenses = new Set<string>();
    const languages = new Set<string>();

    software.forEach((item) => {
      if (item.license) licenses.add(item.license);
      if (item.language) {
        item.language.split("/").forEach((lang) => languages.add(lang.trim()));
      }
    });

    return {
      availableLicenses: Array.from(licenses).sort(),
      availableLanguages: Array.from(languages).sort(),
    };
  }, [software]);

  const filteredSoftware = useMemo(() => {
    return software
      .filter((item) => {
        // Text search
        const matchesSearch =
          search === "" ||
          item.name.toLowerCase().includes(search.toLowerCase()) ||
          item.description.toLowerCase().includes(search.toLowerCase()) ||
          item.tags.some((tag) =>
            tag.toLowerCase().includes(search.toLowerCase())
          );

        // Category filter
        const matchesCategory =
          selectedCategory === "" || item.category === selectedCategory;

        // Archive filter
        const matchesArchived =
          filters.archived === "all" ||
          (filters.archived === "show" && item.archived) ||
          (filters.archived === "hide" && !item.archived);

        // License filter
        const matchesLicense =
          filters.license === "" || item.license === filters.license;

        // Language filter
        const matchesLanguage =
          filters.language === "" ||
          (item.language &&
            item.language
              .split("/")
              .some((lang) => lang.trim() === filters.language));

        return (
          matchesSearch &&
          matchesCategory &&
          matchesArchived &&
          matchesLicense &&
          matchesLanguage
        );
      })
      .sort((a, b) => {
        let comparison = 0;
        switch (filters.sortBy) {
          case "name":
            comparison = a?.name?.localeCompare(b?.name);
            break;
          case "stars":
            comparison = (b.stars || 0) - (a.stars || 0);
            break;
          case "updated":
            if (a.lastUpdated && b.lastUpdated) {
              comparison =
                new Date(b.lastUpdated).getTime() -
                new Date(a.lastUpdated).getTime();
            }
            break;
        }
        return filters.sortOrder === "asc" ? comparison : -comparison;
      });
  }, [software, search, selectedCategory, filters]);

  const groupedSoftware = useMemo(() => {
    return filteredSoftware.reduce<Record<string, Software[]>>((acc, item) => {
      if (!acc[item.category]) {
        acc[item.category] = [];
      }
      acc[item.category].push(item);
      return acc;
    }, {});
  }, [filteredSoftware]);

  const categories = useMemo(() => {
    return Object.keys(
      software.reduce<Record<string, number>>((acc, item) => {
        acc[item.category] = (acc[item.category] || 0) + 1;
        return acc;
      }, {})
    );
  }, [software]);

  return {
    loading,
    search,
    setSearch,
    selectedCategory,
    setSelectedCategory,
    groupedSoftware,
    categories,
    filters,
    setFilters,
    availableLicenses,
    availableLanguages,
  };
}
