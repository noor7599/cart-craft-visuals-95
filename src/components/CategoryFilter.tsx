
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { motion } from "framer-motion";

interface CategoryFilterProps {
  categories: string[];
  selectedCategory: string | null;
  onSelectCategory: (category: string | null) => void;
}

export const CategoryFilter = ({
  categories,
  selectedCategory,
  onSelectCategory,
}: CategoryFilterProps) => {
  return (
    <div className="mb-8">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-lg font-semibold">Categories</h2>
        {selectedCategory && (
          <Button 
            variant="ghost" 
            size="sm" 
            onClick={() => onSelectCategory(null)}
            className="text-sm"
          >
            Clear Filter
          </Button>
        )}
      </div>
      <div className="flex flex-wrap gap-3">
        <Button
          variant={selectedCategory === null ? "default" : "outline"}
          onClick={() => onSelectCategory(null)}
          className="transition-all duration-200 hover:scale-105"
          size="sm"
        >
          All
          <Badge variant="outline" className="ml-2 bg-primary/10">
            {categories.length}
          </Badge>
        </Button>
        {categories.map((category) => (
          <Button
            key={category}
            variant={selectedCategory === category ? "default" : "outline"}
            onClick={() => onSelectCategory(category)}
            className="transition-all duration-200 hover:scale-105"
            size="sm"
          >
            {category}
          </Button>
        ))}
      </div>
    </div>
  );
};
