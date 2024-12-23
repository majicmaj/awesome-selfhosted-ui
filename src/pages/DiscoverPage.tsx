import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Dices } from 'lucide-react';
import { fetchAndParseMd } from '../utils/markdownParser';
import { LoadingScreen } from '../components/LoadingScreen';
import { SoftwareCard } from '../components/SoftwareCard';
import type { Software } from '../types/Software';
import { useDiscoverSoftware } from '../hooks/useDiscoverSoftware';

export function DiscoverPage() {
  const [software, setSoftware] = useState<Software[]>([]);
  const [loading, setLoading] = useState(true);
  const { discoveredSoftware, categories, randomize } = useDiscoverSoftware(software);

  useEffect(() => {
    fetchAndParseMd().then((data) => {
      setSoftware(data);
      setLoading(false);
    });
  }, []);

  const handleReroll = () => {
    randomize();
    window.scrollTo({
      top: 0,
      left: 0,
      behavior: 'smooth' // Optional for smooth scrolling
    });
  }

  if (loading) {
    return <LoadingScreen />;
  }

  return (
    <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
      {categories.map((category) => (
        <section key={category} className="mb-12">
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-xl font-semibold text-gray-800 dark:text-gray-100">{category}</h3>
            <Link
              to={`/catalog?category=${encodeURIComponent(category)}`}
              className="min-w-max flex items-center text-blue-500 hover:text-blue-600 transition-colors text-sm font-medium"
            >
              View More
              <ArrowRight size={16} className="ml-1" />
            </Link>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {discoveredSoftware[category].map((item) => (
              <SoftwareCard key={item.id} software={item} />
            ))}
          </div>
        </section>
      ))}

      <div className="fixed bottom-6 right-6 z-50">
        <button
          onClick={handleReroll}
          className="flex items-center space-x-2 px-6 py-3 bg-blue-500 dark:bg-blue-700 text-white rounded-full shadow-lg hover:bg-blue-600 transition-transform transform hover:scale-105"
        >
          <Dices size={20} />
          <span>Reroll</span>
        </button>
      </div>

    </main>
  );
}