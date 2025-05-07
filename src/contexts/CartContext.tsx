
import React, { createContext, useContext, useState, useEffect } from "react";
import { Product } from "@/data/products";
import { useToast } from "@/hooks/use-toast";
import { ShoppingCart, Check, X, AlertCircle } from "lucide-react";
import { playSound } from "@/App";

export interface CartItem extends Product {
  quantity: number;
}

interface CartContextType {
  items: CartItem[];
  addToCart: (product: Product) => void;
  removeFromCart: (productId: string) => void;
  updateQuantity: (productId: string, quantity: number) => void;
  clearCart: () => void;
  totalItems: number;
  subtotal: number;
  savedItems: CartItem[]; // For "Save for Later" functionality
  moveToSavedItems: (productId: string) => void;
  moveToCart: (productId: string) => void;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export const CartProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [items, setItems] = useState<CartItem[]>([]);
  const [savedItems, setSavedItems] = useState<CartItem[]>([]);
  const { toast } = useToast();

  // Load cart and saved items from localStorage on mount
  useEffect(() => {
    const savedCart = localStorage.getItem("cart");
    const savedForLater = localStorage.getItem("savedItems");
    
    if (savedCart) {
      try {
        setItems(JSON.parse(savedCart));
      } catch (error) {
        console.error("Failed to parse cart from localStorage:", error);
      }
    }
    
    if (savedForLater) {
      try {
        setSavedItems(JSON.parse(savedForLater));
      } catch (error) {
        console.error("Failed to parse saved items from localStorage:", error);
      }
    }
  }, []);

  // Save cart to localStorage when it changes
  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(items));
  }, [items]);
  
  // Save saved items to localStorage when they change
  useEffect(() => {
    localStorage.setItem("savedItems", JSON.stringify(savedItems));
  }, [savedItems]);

  const addToCart = (product: Product) => {
    setItems((prevItems) => {
      const existingItem = prevItems.find((item) => item.id === product.id);
      if (existingItem) {
        // Play add to cart sound
        playSound("add");
        
        toast({
          title: "Item quantity increased",
          description: `${product.name} quantity increased to ${existingItem.quantity + 1}`,
          icon: <Check className="h-4 w-4 text-green-500" />,
        });
        return prevItems.map((item) =>
          item.id === product.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      } else {
        // Play add to cart sound
        playSound("add");
        
        toast({
          title: "Item added to cart",
          description: `${product.name} added to your cart`,
          icon: <ShoppingCart className="h-4 w-4 text-primary" />,
        });
        return [...prevItems, { ...product, quantity: 1 }];
      }
    });
  };

  const removeFromCart = (productId: string) => {
    setItems((prevItems) => {
      const removedItem = prevItems.find(item => item.id === productId);
      if (removedItem) {
        // Play remove from cart sound
        playSound("remove");
        
        toast({
          title: "Item removed",
          description: `${removedItem.name} removed from your cart`,
          icon: <X className="h-4 w-4 text-destructive" />,
        });
      }
      return prevItems.filter((item) => item.id !== productId);
    });
  };

  const updateQuantity = (productId: string, quantity: number) => {
    if (quantity < 1) {
      removeFromCart(productId);
      return;
    }
    
    setItems((prevItems) => {
      const updatedItem = prevItems.find(item => item.id === productId);
      if (updatedItem && quantity !== updatedItem.quantity) {
        toast({
          title: "Quantity updated",
          description: `${updatedItem.name} quantity changed to ${quantity}`,
          icon: <Check className="h-4 w-4 text-green-500" />,
        });
      }
      return prevItems.map((item) =>
        item.id === productId ? { ...item, quantity } : item
      );
    });
  };

  const clearCart = () => {
    setItems([]);
    toast({
      title: "Cart cleared",
      description: "All items have been removed from your cart",
      icon: <AlertCircle className="h-4 w-4 text-amber-500" />,
    });
  };
  
  // Save for later functionality
  const moveToSavedItems = (productId: string) => {
    setItems((prevItems) => {
      const itemToMove = prevItems.find(item => item.id === productId);
      if (itemToMove) {
        setSavedItems(prev => [...prev, itemToMove]);
        
        toast({
          title: "Item saved for later",
          description: `${itemToMove.name} has been moved to saved items`,
          icon: <Check className="h-4 w-4 text-primary" />,
        });
        
        return prevItems.filter(item => item.id !== productId);
      }
      return prevItems;
    });
  };
  
  const moveToCart = (productId: string) => {
    setSavedItems((prevItems) => {
      const itemToMove = prevItems.find(item => item.id === productId);
      if (itemToMove) {
        // Check if item already exists in cart
        const existingItem = items.find(item => item.id === productId);
        
        if (existingItem) {
          // Increment quantity of existing item
          setItems(items.map(item => 
            item.id === productId 
              ? { ...item, quantity: item.quantity + itemToMove.quantity }
              : item
          ));
        } else {
          // Add item to cart
          setItems([...items, itemToMove]);
        }
        
        toast({
          title: "Item moved to cart",
          description: `${itemToMove.name} has been moved to your cart`,
          icon: <ShoppingCart className="h-4 w-4 text-primary" />,
        });
        
        // Play sound
        playSound("add");
        
        return prevItems.filter(item => item.id !== productId);
      }
      return prevItems;
    });
  };

  const totalItems = items.reduce((total, item) => total + item.quantity, 0);
  
  const subtotal = items.reduce(
    (total, item) => total + item.price * item.quantity,
    0
  );

  return (
    <CartContext.Provider
      value={{
        items,
        addToCart,
        removeFromCart,
        updateQuantity,
        clearCart,
        totalItems,
        subtotal,
        savedItems,
        moveToSavedItems,
        moveToCart,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => {
  const context = useContext(CartContext);
  if (context === undefined) {
    throw new Error("useCart must be used within a CartProvider");
  }
  return context;
};
