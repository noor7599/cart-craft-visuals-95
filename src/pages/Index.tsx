
import { useState } from "react";
import { Layout } from "@/components/Layout";
import { ProductGrid } from "@/components/ProductGrid";
import { CategoryFilter } from "@/components/CategoryFilter";
import { products, categories } from "@/data/products";

const Index = () => {
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);

  const filteredProducts = selectedCategory 
    ? products.filter(product => product.category === selectedCategory) 
    : products;

  return (
    <Layout>
      <section className="mb-8">
        <h1 className="mb-2 text-3xl font-bold">Browse Products</h1>
        <p className="text-muted-foreground">
          Explore our collection of high-quality products
        </p>
      </section>
      
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
