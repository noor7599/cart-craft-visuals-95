
import { useState } from "react";
import { Layout } from "@/components/Layout";
import { ProductGrid } from "@/components/ProductGrid";
import { CategoryFilter } from "@/components/CategoryFilter";
import { products, categories } from "@/data/products";
import { Input } from "@/components/ui/input";
import { Search } from "lucide-react";
import { Hero } from "@/components/Hero";
import { FeaturedProducts } from "@/components/FeaturedProducts";
import { CategoryShowcase } from "@/components/CategoryShowcase";
import { PromoSection } from "@/components/PromoSection";
import { Newsletter } from "@/components/Newsletter";
import { useLocation } from "react-router-dom";
import { useEffect } from "react";

const Index = () => {
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState("");
  const location = useLocation();

  // Extract category from URL query parameter if present
  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const categoryParam = params.get('category');
    if (categoryParam && categories.includes(categoryParam)) {
      setSelectedCategory(categoryParam);
    }
  }, [location.search]);

  const filteredProducts = products
    .filter(product => !selectedCategory || product.category === selectedCategory)
    .filter(product => 
      product.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
      product.description.toLowerCase().includes(searchQuery.toLowerCase())
    );

  return (
    <Layout>
      {/* Home hero section - only show on the main page without filters */}
      {!selectedCategory && searchQuery === "" && (
        <>
          <Hero />
          <FeaturedProducts />
          <CategoryShowcase />
          <PromoSection />
        </>
      )}
      
      {/* Products section */}
      <section className="py-12">
        <div className="container mx-auto px-4">
          <div className="mb-8">
            <h2 className="text-2xl md:text-3xl font-bold mb-2">
              {selectedCategory ? `${selectedCategory} Products` : "All Products"}
            </h2>
            <p className="text-muted-foreground">
              {selectedCategory
                ? `Browse our selection of ${selectedCategory.toLowerCase()} products`
                : "Explore our collection of high-quality products"}
            </p>
          </div>
          
          <div className="mb-8 relative">
            <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
            <Input 
              placeholder="Search products..." 
              className="pl-9"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              aria-label="Search products"
            />
          </div>
          
          <CategoryFilter
            categories={categories}
            selectedCategory={selectedCategory}
            onSelectCategory={setSelectedCategory}
          />
          
          <ProductGrid products={filteredProducts} />
        </div>
      </section>
      
      {/* Only show newsletter on the main page without filters */}
      {!selectedCategory && searchQuery === "" && <Newsletter />}
    </Layout>
  );
};

export default Index;
