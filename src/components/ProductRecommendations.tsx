
import { useState, useEffect } from "react";
import { ProductCard } from "@/components/ProductCard";
import { Product, products } from "@/data/products";
import { Skeleton } from "@/components/ui/skeleton";
import { useLanguage } from "@/contexts/LanguageContext";

interface ProductRecommendationsProps {
  currentProductId?: string;
  category?: string;
  limit?: number;
  title?: string;
}

export const ProductRecommendations = ({
  currentProductId,
  category,
  limit = 4,
  title
}: ProductRecommendationsProps) => {
  const [isLoading, setIsLoading] = useState(true);
  const [recommendations, setRecommendations] = useState<Product[]>([]);
  const { t } = useLanguage();

  useEffect(() => {
    // Simulate API call for recommendations
    const getRecommendations = () => {
      setIsLoading(true);
      
      // Wait for a short delay to simulate loading
      setTimeout(() => {
        let filteredProducts = [...products];
        
        // Remove current product if provided
        if (currentProductId) {
          filteredProducts = filteredProducts.filter(p => p.id !== currentProductId);
        }
        
        // Filter by category if provided
        if (category) {
          filteredProducts = filteredProducts.filter(p => p.category === category);
        }
        
        // If there aren't enough products in the same category, add some bestsellers
        if (filteredProducts.length < limit) {
          const bestsellers = products
            .filter(p => p.isBestSeller && p.id !== currentProductId)
            .filter(p => !filteredProducts.find(fp => fp.id === p.id))
            .slice(0, limit - filteredProducts.length);
          
          filteredProducts = [...filteredProducts, ...bestsellers];
        }
        
        // Shuffle array for randomness and take limited amount
        const shuffled = filteredProducts.sort(() => 0.5 - Math.random());
        setRecommendations(shuffled.slice(0, limit));
        setIsLoading(false);
      }, 1000);
    };
    
    getRecommendations();
  }, [currentProductId, category, limit]);

  if (isLoading) {
    return (
      <div className="py-8">
        <Skeleton className="h-8 w-64 mb-6" />
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {[...Array(limit)].map((_, index) => (
            <div key={index} className="space-y-3">
              <Skeleton className="h-48 w-full" />
              <Skeleton className="h-4 w-2/3" />
              <Skeleton className="h-4 w-1/2" />
            </div>
          ))}
        </div>
      </div>
    );
  }

  if (recommendations.length === 0) {
    return null;
  }

  return (
    <div className="py-8">
      <h2 className="text-2xl font-bold mb-6">{title || t('productRecommendations')}</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {recommendations.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </div>
  );
};
