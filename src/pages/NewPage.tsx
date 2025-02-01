import { Info } from "lucide-react";
import { LoadingScreen } from "../components/LoadingScreen";
import { SoftwareCard } from "../components/SoftwareCard";
import { useNewData } from "../features/new/hooks/useNewData";

const NoNewSoftware = () => (
  <div className="flex flex-col items-center justify-center text-center p-4 bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 pt-8">
    <Info className="w-16 h-16 text-gray-400 mb-4 animate-bounce" />
    <h2 className="text-2xl font-semibold text-gray-800 dark:text-gray-100">
      No New Software Found!
    </h2>
    <p className="mt-2 text-gray-600 dark:text-gray-300">
      Everything is up-to-date. Check back later for new additions.
    </p>
  </div>
);

export function NewPage() {
  const { loading, filteredSoftware } = useNewData();

  if (loading) {
    return <LoadingScreen />;
  }

  return (
    <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {filteredSoftware.map((item) => (
          <SoftwareCard key={item.id} software={item} />
        ))}
      </div>
      {filteredSoftware.length === 0 && <NoNewSoftware />}
    </main>
  );
}
