
import { ProductCard } from "@/components/ProductCard";
import { products } from "@/data/products";
import { ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";

export const FeaturedProducts = () => {
  // Get products marked as bestsellers or new
  const featuredProducts = products
    .filter(product => product.isBestSeller || product.isNew)
    .slice(0, 4);

  return (
    <div className="py-12 md:py-16">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center mb-8">
          <div>
            <h2 className="text-2xl md:text-3xl font-bold mb-2">Featured Products</h2>
            <p className="text-muted-foreground">Our most popular picks for you</p>
          </div>
          <Button variant="ghost" asChild className="hidden sm:flex">
            <Link to="/" className="flex items-center">
              View all
              <ArrowRight className="ml-2 h-4 w-4" />
            </Link>
          </Button>
        </div>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {featuredProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
        
        <div className="mt-8 text-center sm:hidden">
          <Button variant="outline" asChild>
            <Link to="/" className="flex items-center justify-center">
              View all products
              <ArrowRight className="ml-2 h-4 w-4" />
            </Link>
          </Button>
        </div>
      </div>
    </div>
  );
};
