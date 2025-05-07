
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { CartItem as CartItemType } from "@/contexts/CartContext";
import { useCart } from "@/contexts/CartContext";
import { Minus, Plus, X } from "lucide-react";

interface CartItemProps {
  item: CartItemType;
}

export const CartItem = ({ item }: CartItemProps) => {
  const { updateQuantity, removeFromCart } = useCart();

  const handleQuantityChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = parseInt(e.target.value);
    if (!isNaN(value)) {
      updateQuantity(item.id, value);
    }
  };

  const incrementQuantity = () => {
    updateQuantity(item.id, item.quantity + 1);
  };

  const decrementQuantity = () => {
    if (item.quantity > 1) {
      updateQuantity(item.id, item.quantity - 1);
    }
  };

  return (
    <div className="flex items-center justify-between border-b py-4">
      <div className="flex items-center space-x-4">
        <div className="h-16 w-16 overflow-hidden rounded-md">
          <img
            src={item.image}
            alt={item.name}
            className="h-full w-full object-cover"
          />
        </div>
        <div>
          <h3 className="font-medium">{item.name}</h3>
          <p className="text-sm text-gray-500">${item.price.toFixed(2)}</p>
        </div>
      </div>
      <div className="flex items-center space-x-2">
        <div className="flex items-center">
          <Button
            size="icon"
            variant="outline"
            onClick={decrementQuantity}
            className="h-8 w-8 rounded-r-none"
          >
            <Minus className="h-3 w-3" />
          </Button>
          <Input
            type="number"
            min="1"
            value={item.quantity}
            onChange={handleQuantityChange}
            className="h-8 w-12 rounded-none border-x-0 text-center [appearance:textfield] [&::-webkit-inner-spin-button]:appearance-none [&::-webkit-outer-spin-button]:appearance-none"
          />
          <Button
            size="icon"
            variant="outline"
            onClick={incrementQuantity}
            className="h-8 w-8 rounded-l-none"
          >
            <Plus className="h-3 w-3" />
          </Button>
        </div>
        <Button
          variant="ghost"
          size="icon"
          onClick={() => removeFromCart(item.id)}
          className="h-8 w-8 text-destructive"
        >
          <X className="h-4 w-4" />
        </Button>
      </div>
    </div>
  );
};
