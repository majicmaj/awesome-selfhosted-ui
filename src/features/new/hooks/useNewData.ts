import { useState, useEffect } from "react";
import { fetchAndParseMd } from "../../../utils/markdownParser";
import type { Software } from "../../../types/Software";

export function useNewData() {
  const [software, setSoftware] = useState<Software[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchAndParseMd().then((data) => {
      setSoftware(data);
      setLoading(false);
    });
  }, []);

  const filteredSoftware = software.filter((item) => item.tags.includes("new"));

  const categories = Object.keys(
    software.reduce<Record<string, number>>((acc, item) => {
      acc[item.category] = (acc[item.category] || 0) + 1;
      return acc;
    }, {})
  );

  return {
    loading,
    filteredSoftware,
    categories,
  };
}
