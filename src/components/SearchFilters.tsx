
import React from 'react';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Search } from 'lucide-react';
import { useUIStore } from '@/stores/zustand/uiStore';
import { usePreferencesStore } from '@/stores/zustand/preferencesStore';

interface SearchFiltersProps {
  searchTerm: string;
  setSearchTerm: (term: string) => void;
  selectedCategory: string;
  setSelectedCategory: (category: string) => void;
  categories: string[];
}

const SearchFilters = ({
  searchTerm,
  setSearchTerm,
  selectedCategory,
  setSelectedCategory,
  categories
}: SearchFiltersProps) => {
  const theme = useUIStore((state) => state.theme);
  const language = usePreferencesStore((state) => state.language);

  const searchPlaceholder = language === 'id'
    ? 'Cari thread atau topik...'
    : 'Search threads or topics...';

  const categoryPlaceholder = language === 'id'
    ? 'Pilih kategori'
    : 'Select category';

  const allCategoriesText = language === 'id'
    ? 'Semua Kategori'
    : 'All Categories';

  return (
    <div className={`bg-white/80 backdrop-blur-sm rounded-2xl p-6 mb-8 shadow-lg border border-gray-200/60 ${
      theme === 'dark' ? 'bg-gray-800/80 border-gray-700/60' : ''
    }`}>
      <div className="flex flex-col md:flex-row gap-4 items-center">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
          <Input
            placeholder={searchPlaceholder}
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10 bg-white/90"
          />
        </div>

        <Select value={selectedCategory} onValueChange={setSelectedCategory}>
          <SelectTrigger className="w-full md:w-48 bg-white/90">
            <SelectValue placeholder={categoryPlaceholder} />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">{allCategoriesText}</SelectItem>
            {categories.map((category) => (
              <SelectItem key={category} value={category}>
                #{category}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>
    </div>
  );
};

export default SearchFilters;
