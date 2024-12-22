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
    <main className="border max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="mb-8">
        <SearchBar search={search} onSearchChange={setSearch} />
      </div>
      
      <div className="flex gap-8 border">
        <div className='border'>
        <CategorySidebar 
          categories={categoryCount}
          onCategoryClick={handleCategoryClick}
        />
        </div>
        
        <div className="flex-1 min-w-0">
          <VirtualizedCatalog groupedSoftware={groupedSoftware} />
        </div>
      </div>
    </main>
  );
}