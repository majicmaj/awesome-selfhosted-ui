import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { ArrowRight, Dices } from "lucide-react";
import { LoadingScreen } from "../components/LoadingScreen";
import { SoftwareCard } from "../components/SoftwareCard";
import { useSoftwareData } from "../hooks/useSoftwareData";
import { useDiscoverSoftware } from "../hooks/useDiscoverSoftware";

export function DiscoverPage() {
  const { loading, software } = useSoftwareData();
  const { discoveredSoftware, categories, randomize } =
    useDiscoverSoftware(software);

  const handleReroll = () => {
    randomize();
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  if (loading) {
    return <LoadingScreen />;
  }

  return (
    <main className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {categories.map((category) => (
        <section key={category} className="mb-12">
          <div className="flex justify-between items-center mb-6">
            <h3 className="text-xl font-semibold text-foreground/80">
              {category}
            </h3>
            <Link
              to={`/catalog?category=${encodeURIComponent(category)}`}
              className="min-w-max flex items-center text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300 transition-colors text-sm font-medium"
            >
              View More
              <ArrowRight size={16} className="ml-1" />
            </Link>
          </div>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
            {discoveredSoftware[category].map((item) => (
              <SoftwareCard key={item.id} software={item} />
            ))}
          </div>
        </section>
      ))}

      <div className="fixed bottom-6 right-6 z-50">
        <button
          onClick={handleReroll}
          className="flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-full shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105"
        >
          <Dices size={20} />
          <span>Reroll</span>
        </button>
      </div>
    </main>
  );
}
