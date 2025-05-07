
import { Button } from "@/components/ui/button";

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
    <div className="mb-6">
      <h2 className="mb-3 text-lg font-semibold">Categories</h2>
      <div className="flex flex-wrap gap-2">
        <Button
          variant={selectedCategory === null ? "default" : "outline"}
          onClick={() => onSelectCategory(null)}
        >
          All
        </Button>
        {categories.map((category) => (
          <Button
            key={category}
            variant={selectedCategory === category ? "default" : "outline"}
            onClick={() => onSelectCategory(category)}
          >
            {category}
          </Button>
        ))}
      </div>
    </div>
  );
};
