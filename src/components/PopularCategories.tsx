
import React from 'react';
import { Badge } from '@/components/ui/badge';

interface PopularCategoriesProps {
  categories: string[];
  setSelectedCategory: (category: string) => void;
}

const PopularCategories = ({ categories, setSelectedCategory }: PopularCategoriesProps) => {
  return (
    <div className="mb-8">
      <h2 className="text-2xl font-bold text-gray-900 mb-4">Kategori Populer</h2>
      <div className="flex flex-wrap gap-2">
        {categories.slice(0, 10).map((category) => (
          <Badge
            key={category}
            variant="secondary"
            className="bg-gradient-to-r from-blue-100 to-purple-100 text-blue-800 border-0 cursor-pointer hover:from-blue-200 hover:to-purple-200 transition-all"
            onClick={() => setSelectedCategory(category)}
          >
            #{category}
          </Badge>
        ))}
      </div>
    </div>
  );
};

export default PopularCategories;
