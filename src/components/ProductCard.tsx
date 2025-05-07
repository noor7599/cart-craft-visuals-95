
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Product } from "@/data/products";
import { useCart } from "@/contexts/CartContext";
import { ShoppingCart } from "lucide-react";

interface ProductCardProps {
  product: Product;
}

export const ProductCard = ({ product }: ProductCardProps) => {
  const { addToCart } = useCart();

  return (
    <Card className="overflow-hidden transition-all hover:shadow-md">
      <div className="aspect-square overflow-hidden">
        <img
          src={product.image}
          alt={product.name}
          className="h-full w-full object-cover transition-transform duration-300 hover:scale-105"
        />
      </div>
      <CardHeader className="p-4">
        <CardTitle className="line-clamp-1 text-lg">{product.name}</CardTitle>
        <p className="text-lg font-bold text-primary">${product.price.toFixed(2)}</p>
      </CardHeader>
      <CardContent className="p-4 pt-0">
        <p className="line-clamp-2 text-sm text-gray-500">{product.description}</p>
      </CardContent>
      <CardFooter className="p-4">
        <Button 
          onClick={() => addToCart(product)} 
          className="w-full"
        >
          <ShoppingCart className="mr-2 h-4 w-4" />
          Add to cart
        </Button>
      </CardFooter>
    </Card>
  );
};
