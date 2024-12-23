import { LoadingScreen } from '../components/LoadingScreen';
import { SearchBar } from '../components/SearchBar';
import { CategorySidebar } from '../components/CategorySidebar';
import { VirtualizedCatalog } from '../features/catalog/components/VirtualizedCatalog';
import { useCatalogData } from '../features/catalog/hooks/useCatalogData';

export function CatalogPage() {
  const { 
    loading, 
    search, 
    setSearch, 
    selectedCategory,
    setSelectedCategory,
    groupedSoftware, 
    categories 
  } = useCatalogData();

  if (loading) {
    return <LoadingScreen />;
  }

  const categoryCount = categories.map(category => ({
    name: category,
    count: groupedSoftware[category]?.length || 0,
    isSelected: category === selectedCategory
  }));

  const handleCategoryClick = (category: string) => {
    setSelectedCategory(category === selectedCategory ? '' : category);
    const element = document.getElementById(category.toLowerCase().replace(/\s+/g, '-'));
    element?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="flex gap-8">
        <aside className="flex-col space-y-4 w-64 flex-shrink-0 hidden md:block overflow-y-auto h-[calc(100vh-100px)] sticky top-20">
          <SearchBar search={search} onSearchChange={setSearch} />
          <CategorySidebar 
            categories={categoryCount}
            onCategoryClick={handleCategoryClick}
          />
        </aside>

        <div className="flex-1 min-w-0">
          <VirtualizedCatalog groupedSoftware={groupedSoftware} />
        </div>
      </div>
    </main>
  );
}