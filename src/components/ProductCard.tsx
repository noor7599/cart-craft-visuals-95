
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Product } from "@/data/products";
import { useCart } from "@/contexts/CartContext";
import { ShoppingCart, Star, StarHalf } from "lucide-react";
import { useState } from "react";
import { Badge } from "@/components/ui/badge";

interface ProductCardProps {
  product: Product;
}

export const ProductCard = ({ product }: ProductCardProps) => {
  const { addToCart } = useCart();
  const [isHovered, setIsHovered] = useState(false);

  // Generate badge based on product properties
  const renderBadge = () => {
    if (product.isNew) {
      return <Badge className="absolute top-2 left-2 bg-blue-500 hover:bg-blue-600">New</Badge>;
    }
    if (product.isBestSeller) {
      return <Badge className="absolute top-2 left-2 bg-orange-500 hover:bg-orange-600">Best Seller</Badge>;
    }
    if (product.onSale) {
      return <Badge className="absolute top-2 left-2 bg-red-500 hover:bg-red-600">On Sale</Badge>;
    }
    return null;
  };

  // Render star ratings
  const renderStars = () => {
    const stars = [];
    const rating = product.rating || 0;
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 !== 0;
    
    // Add full stars
    for (let i = 0; i < fullStars; i++) {
      stars.push(<Star key={`star-${i}`} className="h-4 w-4 fill-yellow-400 text-yellow-400" />);
    }
    
    // Add half star if needed
    if (hasHalfStar) {
      stars.push(<StarHalf key="half-star" className="h-4 w-4 fill-yellow-400 text-yellow-400" />);
    }
    
    // Add empty stars
    const emptyStars = 5 - Math.ceil(rating);
    for (let i = 0; i < emptyStars; i++) {
      stars.push(<Star key={`empty-star-${i}`} className="h-4 w-4 text-gray-300" />);
    }
    
    return stars;
  };

  return (
    <Card 
      className="overflow-hidden transition-all duration-300 hover:shadow-lg hover:translate-y-[-4px] relative"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className="aspect-square overflow-hidden relative">
        {renderBadge()}
        <img
          src={product.image}
          alt={product.name}
          className="h-full w-full object-cover transition-transform duration-300 hover:scale-110"
        />
        {isHovered && (
          <div className="absolute inset-0 flex items-center justify-center bg-black/40 transition-opacity duration-200">
            <Button 
              onClick={(e) => {
                e.stopPropagation();
                addToCart(product);
              }}
              size="sm"
              className="animate-fade-in"
            >
              <ShoppingCart className="mr-2 h-4 w-4" />
              Add to cart
            </Button>
          </div>
        )}
      </div>
      <CardHeader className="p-4">
        <div className="flex items-center justify-between">
          <CardTitle className="line-clamp-1 text-lg">{product.name}</CardTitle>
          <p className="text-lg font-bold text-primary">${product.price.toFixed(2)}</p>
        </div>
        {product.rating && (
          <div className="flex items-center mt-1">
            <div className="flex mr-2">
              {renderStars()}
            </div>
            <span className="text-xs text-muted-foreground">
              ({product.reviewCount || 0})
            </span>
          </div>
        )}
      </CardHeader>
      <CardContent className="p-4 pt-0">
        <p className="line-clamp-2 text-sm text-gray-500">{product.description}</p>
      </CardContent>
      <CardFooter className="p-4">
        <Button 
          onClick={() => addToCart(product)} 
          className="w-full transition-all duration-200 hover:bg-primary/90"
        >
          <ShoppingCart className="mr-2 h-4 w-4" />
          Add to cart
        </Button>
      </CardFooter>
    </Card>
  );
};
