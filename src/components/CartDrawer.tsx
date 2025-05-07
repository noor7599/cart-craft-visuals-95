
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
import { ShoppingCart, Save, Clock } from "lucide-react";
import { CartItem } from "./CartItem";
import { Link } from "react-router-dom";
import { Separator } from "@/components/ui/separator";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useState } from "react";

export const CartDrawer = () => {
  const { items, totalItems, subtotal, clearCart, savedItems, moveToCart } = useCart();
  const [activeTab, setActiveTab] = useState("cart");

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

  const renderSavedItem = (item: CartItem) => (
    <div key={item.id} className="flex items-center gap-3 py-3">
      <div className="h-16 w-16 overflow-hidden rounded-md">
        <img
          src={item.image}
          alt={item.name}
          className="h-full w-full object-cover"
        />
      </div>
      <div className="flex-1">
        <p className="font-medium">{item.name}</p>
        <p className="text-sm text-muted-foreground">${item.price.toFixed(2)}</p>
      </div>
      <Button 
        variant="outline" 
        size="sm" 
        onClick={() => moveToCart(item.id)}
        className="ml-2"
      >
        <ShoppingCart className="h-4 w-4 mr-1" /> Add
      </Button>
    </div>
  );

  return (
    <Sheet>
      <HoverCard openDelay={300}>
        <HoverCardTrigger asChild>
          <SheetTrigger asChild>
            <Button 
              variant="outline" 
              size="icon" 
              className="relative transition-transform hover:scale-110"
              aria-label={`Shopping cart with ${totalItems} items`}
            >
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
            {savedItems.length > 0 && (
              <div className="mt-2 pt-2 border-t">
                <p className="text-xs text-muted-foreground">
                  {savedItems.length} {savedItems.length === 1 ? 'item' : 'items'} saved for later
                </p>
              </div>
            )}
          </div>
        </HoverCardContent>
      </HoverCard>
      <SheetContent className="flex flex-col sm:max-w-md">
        <SheetHeader>
          <SheetTitle>Your Cart</SheetTitle>
          <SheetDescription>
            {totalItems} {totalItems === 1 ? "item" : "items"} in your cart
            {savedItems.length > 0 && ` • ${savedItems.length} saved for later`}
          </SheetDescription>
        </SheetHeader>
        
        <Tabs 
          value={activeTab} 
          onValueChange={setActiveTab}
          className="flex-1 flex flex-col overflow-hidden"
        >
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="cart">
              <ShoppingCart className="h-4 w-4 mr-1" /> Cart
            </TabsTrigger>
            <TabsTrigger value="saved">
              <Save className="h-4 w-4 mr-1" /> Saved ({savedItems.length})
            </TabsTrigger>
          </TabsList>
          
          <TabsContent value="cart" className="flex-1 overflow-y-auto py-4 mt-0">
            {items.length > 0 ? (
              items.map((item) => <CartItem key={item.id} item={item} />)
            ) : (
              <div className="flex h-40 flex-col items-center justify-center rounded-md border border-dashed">
                <ShoppingCart className="mb-2 h-10 w-10 text-muted-foreground" />
                <p className="text-center text-muted-foreground">
                  Your cart is empty
                </p>
                {savedItems.length > 0 && (
                  <Button 
                    variant="link" 
                    size="sm"
                    onClick={() => setActiveTab("saved")}
                    className="mt-2"
                  >
                    View saved items
                  </Button>
                )}
              </div>
            )}
            
            {items.length > 0 && (
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
            )}
          </TabsContent>
          
          <TabsContent value="saved" className="flex-1 overflow-y-auto py-4 mt-0">
            {savedItems.length > 0 ? (
              <div className="space-y-1">
                {savedItems.map(renderSavedItem)}
              </div>
            ) : (
              <div className="flex h-40 flex-col items-center justify-center rounded-md border border-dashed">
                <Clock className="mb-2 h-10 w-10 text-muted-foreground" />
                <p className="text-center text-muted-foreground">
                  No items saved for later
                </p>
                {items.length > 0 && (
                  <Button 
                    variant="link" 
                    size="sm"
                    onClick={() => setActiveTab("cart")}
                    className="mt-2"
                  >
                    Back to cart
                  </Button>
                )}
              </div>
            )}
          </TabsContent>
        </Tabs>
        
        {activeTab === "cart" && items.length > 0 && (
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
        )}
      </SheetContent>
    </Sheet>
  );
};
