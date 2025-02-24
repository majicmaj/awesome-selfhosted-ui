import { useState, useEffect } from "react";
import { fetchAndParseMd } from "../utils/markdownParser";
import type { Software } from "../types/Software";

export function useSoftwareData() {
  const [software, setSoftware] = useState<Software[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchAndParseMd().then((data) => {
      setSoftware(data);
      setLoading(false);
    });
  }, []);

  return {
    loading,
    software,
  };
}