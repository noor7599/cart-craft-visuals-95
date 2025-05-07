
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { CartProvider } from "@/contexts/CartContext";
import { AuthProvider } from "@/contexts/AuthContext";
import { ThemeProvider } from "@/contexts/ThemeContext";
import Index from "./pages/Index";
import Checkout from "./pages/Checkout";
import Orders from "./pages/Orders";
import OrderDetails from "./pages/OrderDetails";
import NotFound from "./pages/NotFound";
import { useEffect } from "react";

// Initialize the query client for React Query
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
      retry: 1,
      staleTime: 5 * 60 * 1000, // 5 minutes
    },
  },
});

// Sound effect for cart addition/removal
const playSound = (type: "add" | "remove" | "success") => {
  const soundMap = {
    add: new Audio("/sounds/add-to-cart.mp3"),
    remove: new Audio("/sounds/remove-from-cart.mp3"),
    success: new Audio("/sounds/order-success.mp3"),
  };
  
  const audio = soundMap[type];
  if (audio) {
    audio.volume = 0.2; // Not too loud
    audio.play().catch(err => console.log("Audio play error:", err));
  }
};

const App = () => {
  // Add keyboard navigation support
  useEffect(() => {
    // Add a visible outline for keyboard navigation
    const handleTabKey = (e: KeyboardEvent) => {
      if (e.key === 'Tab') {
        document.body.classList.add('keyboard-navigation');
      }
    };

    // Remove the outline when mouse is used
    const handleMouseDown = () => {
      document.body.classList.remove('keyboard-navigation');
    };

    window.addEventListener('keydown', handleTabKey);
    window.addEventListener('mousedown', handleMouseDown);

    return () => {
      window.removeEventListener('keydown', handleTabKey);
      window.removeEventListener('mousedown', handleMouseDown);
    };
  }, []);

  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <ThemeProvider>
          <AuthProvider>
            <CartProvider>
              <Toaster />
              <Sonner />
              <BrowserRouter>
                <Routes>
                  <Route path="/" element={<Index />} />
                  <Route path="/checkout" element={<Checkout />} />
                  <Route path="/orders" element={<Orders />} />
                  <Route path="/orders/:orderId" element={<OrderDetails />} />
                  <Route path="*" element={<NotFound />} />
                </Routes>
                {/* Skip to main content link for keyboard accessibility */}
                <div className="skip-to-content">
                  <a href="#main-content" className="sr-only focus:not-sr-only focus:absolute focus:p-3 focus:bg-background focus:text-foreground focus:z-50">
                    Skip to main content
                  </a>
                </div>
              </BrowserRouter>
            </CartProvider>
          </AuthProvider>
        </ThemeProvider>
      </TooltipProvider>
    </QueryClientProvider>
  );
};

// Export the playSound utility for use in other components
export { playSound };
export default App;
