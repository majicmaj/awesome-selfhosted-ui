import { LoadingScreen } from "../components/LoadingScreen";
import { SearchBar } from "../components/SearchBar";
import { CategorySidebar } from "../components/CategorySidebar";
import { VirtualizedCatalog } from "../features/catalog/components/VirtualizedCatalog";
import { CatalogFilterBar } from "../components/CatalogFilterBar";
import { useCatalogData } from "../features/catalog/hooks/useCatalogData";

export function CatalogPage() {
  const {
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
  } = useCatalogData();

  if (loading) {
    return <LoadingScreen />;
  }

  const categoryCount = categories.map((category) => ({
    name: category,
    count: groupedSoftware[category]?.length || 0,
    isSelected: category === selectedCategory,
  }));

  const handleCategoryClick = (category: string) => {
    setSelectedCategory(category === selectedCategory ? "" : category);
    const element = document.getElementById(
      category.toLowerCase().replace(/\s+/g, "-")
    );
    element?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <main className="h-screen flex gap-4 w-full">
      <aside className="hidden md:flex px-2 flex-col min-w-0 w-80 border-r bg-background relative">
        <SearchBar search={search} onSearchChange={setSearch} />
        <CategorySidebar
          categories={categoryCount}
          onCategoryClick={handleCategoryClick}
        />
      </aside>

      <div className="overflow-auto flex flex-col w-full gap-4 pr-2 pt-2">
        <CatalogFilterBar
          filters={filters}
          onFiltersChange={setFilters}
          availableLicenses={availableLicenses}
          availableLanguages={availableLanguages}
        />
        <VirtualizedCatalog groupedSoftware={groupedSoftware} />
      </div>
    </main>
  );
}
