
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from "@/components/ui/hover-card";
import { useCart } from "@/contexts/CartContext";
import { ShoppingCart } from "lucide-react";
import { CartItem } from "./CartItem";
import { Link } from "react-router-dom";
import { Separator } from "@/components/ui/separator";

export const CartDrawer = () => {
  const { items, totalItems, subtotal, clearCart } = useCart();

  const renderQuickCartPreview = () => {
    if (items.length === 0) {
      return <p className="text-center text-muted-foreground py-2">Your cart is empty</p>;
    }

    return (
      <div className="space-y-3">
        {items.slice(0, 3).map((item) => (
          <div key={item.id} className="flex items-center gap-2">
            <div className="h-10 w-10 overflow-hidden rounded">
              <img
                src={item.image}
                alt={item.name}
                className="h-full w-full object-cover"
              />
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium truncate">{item.name}</p>
              <p className="text-xs text-muted-foreground">
                {item.quantity} × ${item.price.toFixed(2)}
              </p>
            </div>
          </div>
        ))}
        
        {items.length > 3 && (
          <p className="text-xs text-muted-foreground text-center">
            +{items.length - 3} more items
          </p>
        )}
        
        <Separator />
        
        <div className="flex items-center justify-between text-sm">
          <span>Total:</span>
          <span className="font-bold">${subtotal.toFixed(2)}</span>
        </div>
        
        <Button asChild size="sm" className="w-full">
          <Link to="/checkout">Checkout</Link>
        </Button>
      </div>
    );
  };

  return (
    <Sheet>
      <HoverCard openDelay={300}>
        <HoverCardTrigger asChild>
          <SheetTrigger asChild>
            <Button variant="outline" size="icon" className="relative">
              <ShoppingCart className="h-4 w-4" />
              {totalItems > 0 && (
                <span className="absolute -right-2 -top-2 flex h-5 w-5 items-center justify-center rounded-full bg-primary text-xs text-primary-foreground">
                  {totalItems}
                </span>
              )}
            </Button>
          </SheetTrigger>
        </HoverCardTrigger>
        <HoverCardContent className="w-64">
          <div className="space-y-2">
            <h4 className="font-medium">Your Cart</h4>
            {renderQuickCartPreview()}
          </div>
        </HoverCardContent>
      </HoverCard>
      <SheetContent className="flex flex-col sm:max-w-md">
        <SheetHeader>
          <SheetTitle>Your Cart</SheetTitle>
          <SheetDescription>
            {totalItems} {totalItems === 1 ? "item" : "items"} in your cart
          </SheetDescription>
        </SheetHeader>
        <div className="flex-1 overflow-y-auto py-4">
          {items.length > 0 ? (
            items.map((item) => <CartItem key={item.id} item={item} />)
          ) : (
            <div className="flex h-40 flex-col items-center justify-center rounded-md border border-dashed">
              <ShoppingCart className="mb-2 h-10 w-10 text-muted-foreground" />
              <p className="text-center text-muted-foreground">
                Your cart is empty
              </p>
            </div>
          )}
        </div>
        {items.length > 0 && (
          <>
            <div className="space-y-2 py-4">
              <div className="flex items-center justify-between">
                <span>Subtotal</span>
                <span className="font-medium">${subtotal.toFixed(2)}</span>
              </div>
              <div className="flex items-center justify-between">
                <span>Shipping</span>
                <span className="text-muted-foreground">Calculated at checkout</span>
              </div>
              <div className="flex items-center justify-between border-t pt-2">
                <span className="text-lg font-bold">Total</span>
                <span className="text-lg font-bold">${subtotal.toFixed(2)}</span>
              </div>
            </div>
            <SheetFooter className="flex flex-col gap-2 sm:flex-col">
              <Button asChild className="w-full">
                <Link to="/checkout">Checkout</Link>
              </Button>
              <Button
                variant="outline"
                className="w-full"
                onClick={clearCart}
              >
                Clear Cart
              </Button>
            </SheetFooter>
          </>
        )}
      </SheetContent>
    </Sheet>
  );
};
