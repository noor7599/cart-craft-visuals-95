
import { useState } from "react";
import { Layout } from "@/components/Layout";
import { ProductGrid } from "@/components/ProductGrid";
import { CategoryFilter } from "@/components/CategoryFilter";
import { products, categories } from "@/data/products";
import { Input } from "@/components/ui/input";
import { Search } from "lucide-react";

const Index = () => {
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState("");

  const filteredProducts = products
    .filter(product => !selectedCategory || product.category === selectedCategory)
    .filter(product => 
      product.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
      product.description.toLowerCase().includes(searchQuery.toLowerCase())
    );

  return (
    <Layout>
      <section className="mb-8">
        <h1 className="mb-3 text-4xl font-bold tracking-tight">Browse Products</h1>
        <p className="text-lg text-muted-foreground">
          Explore our collection of high-quality products
        </p>
      </section>
      
      <div className="mb-8 relative">
        <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
        <Input 
          placeholder="Search products..." 
          className="pl-9"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
      </div>
      
      <CategoryFilter
        categories={categories}
        selectedCategory={selectedCategory}
        onSelectCategory={setSelectedCategory}
      />
      
      <ProductGrid products={filteredProducts} />
    </Layout>
  );
};

export default Index;
