import { Link, useLocation } from "react-router-dom";
import { CartDrawer } from "@/components/CartDrawer";
import { Button } from "@/components/ui/button";
import { Home, Package, Search, Menu, X } from "lucide-react";
import { useState, useEffect } from "react";
import { useIsMobile } from "@/hooks/use-mobile";
import { AuthButtons } from "@/components/AuthButtons";
import { NotificationCenter } from "@/components/NotificationCenter";
import { Breadcrumb } from "@/components/Breadcrumb";
import { useAuth } from "@/contexts/AuthContext";
import { ThemeToggle } from "@/components/ThemeToggle";

interface LayoutProps {
  children: React.ReactNode;
}

export const Layout = ({ children }: LayoutProps) => {
  const location = useLocation();
  const isMobile = useIsMobile();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const { isAuthenticated, user } = useAuth();

  const isActive = (path: string) => {
    return location.pathname === path;
  };

  // Handle scrolling and update header appearance
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Close menu when changing routes
  useEffect(() => {
    setIsMenuOpen(false);
  }, [location.pathname]);

  // Personalized greeting
  const getGreeting = () => {
    if (!isAuthenticated || !user) return "";
    
    const hour = new Date().getHours();
    let greeting = "";
    
    if (hour < 12) greeting = "Good morning";
    else if (hour < 18) greeting = "Good afternoon";
    else greeting = "Good evening";
    
    return `${greeting}, ${user.name.split(' ')[0]}`;
  };

  return (
    <div className="flex min-h-screen flex-col">
      <header 
        className={`sticky top-0 z-50 w-full transition-all duration-300 ${
          isScrolled ? "bg-background/95 shadow-sm backdrop-blur-sm" : "bg-background/80"
        }`}
      >
        <div className="container mx-auto flex h-16 items-center justify-between px-4">
          <Link to="/" className="text-xl font-bold flex items-center" aria-label="ShopEase Home">
            <span className="bg-primary rounded-full w-8 h-8 flex items-center justify-center text-white mr-2">S</span>
            ShopEase
          </Link>
          
          <nav className="hidden md:flex items-center space-x-4">
            <Button
              asChild
              variant={isActive("/") ? "default" : "ghost"}
            >
              <Link to="/">Home</Link>
            </Button>
            <Button
              asChild
              variant={isActive("/orders") ? "default" : "ghost"}
            >
              <Link to="/orders">My Orders</Link>
            </Button>
          </nav>

          <div className="flex items-center space-x-3">
            {!isMobile && (
              <form className="relative hidden md:block mr-2" onSubmit={(e) => e.preventDefault()}>
                <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                <input
                  type="search"
                  placeholder="Search..."
                  className="w-[180px] bg-background border-border rounded-full border py-2 pl-8 pr-4 text-sm focus:outline-none focus:ring-1 focus:ring-primary focus:border-primary"
                />
              </form>
            )}
            
            <ThemeToggle />
            <NotificationCenter />
            <CartDrawer />
            <AuthButtons />
            
            <button
              className="md:hidden flex items-center justify-center"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              aria-label={isMenuOpen ? "Close menu" : "Open menu"}
            >
              {isMenuOpen ? (
                <X className="h-5 w-5" />
              ) : (
                <Menu className="h-5 w-5" />
              )}
            </button>
          </div>
        </div>
        
        {/* Mobile navigation menu */}
        {isMenuOpen && (
          <div className="md:hidden py-4 px-4 bg-background border-t">
            <nav className="flex flex-col space-y-2">
              <Button
                asChild
                variant={isActive("/") ? "default" : "ghost"}
                className="justify-start"
              >
                <Link to="/" className="w-full">
                  <Home className="mr-2 h-4 w-4" />
                  Home
                </Link>
              </Button>
              <Button
                asChild
                variant={isActive("/orders") ? "default" : "ghost"}
                className="justify-start"
              >
                <Link to="/orders" className="w-full">
                  <Package className="mr-2 h-4 w-4" />
                  My Orders
                </Link>
              </Button>
            </nav>
          </div>
        )}
      </header>

      {/* User greeting when logged in - only on home page */}
      {isAuthenticated && user && location.pathname === "/" && !isMenuOpen && (
        <div className="bg-secondary/30 py-2">
          <div className="container mx-auto px-4">
            <p className="text-sm font-medium">{getGreeting()}</p>
          </div>
        </div>
      )}

      {/* Breadcrumb navigation */}
      <div className="container mx-auto px-4">
        <Breadcrumb />
      </div>

      <main className="flex-1">
        {children}
      </main>

      <footer className="border-t py-8 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div>
              <h3 className="font-bold mb-4">ShopEase</h3>
              <p className="text-sm text-gray-500 mb-4">
                Shopping made simple and enjoyable with our curated collection of high-quality products.
              </p>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Shop</h4>
              <ul className="space-y-2 text-sm">
                <li><Link to="/" className="text-gray-500 hover:text-primary">All Products</Link></li>
                <li><Link to="/?category=Electronics" className="text-gray-500 hover:text-primary">Electronics</Link></li>
                <li><Link to="/?category=Clothing" className="text-gray-500 hover:text-primary">Clothing</Link></li>
                <li><Link to="/?category=Home" className="text-gray-500 hover:text-primary">Home</Link></li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Account</h4>
              <ul className="space-y-2 text-sm">
                <li><Link to="/orders" className="text-gray-500 hover:text-primary">My Orders</Link></li>
                <li><Link to="/checkout" className="text-gray-500 hover:text-primary">Checkout</Link></li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Support</h4>
              <ul className="space-y-2 text-sm">
                <li><a href="#" className="text-gray-500 hover:text-primary">Contact Us</a></li>
                <li><a href="#" className="text-gray-500 hover:text-primary">FAQs</a></li>
                <li><a href="#" className="text-gray-500 hover:text-primary">Shipping Information</a></li>
              </ul>
            </div>
          </div>
          <div className="border-t mt-8 pt-6 text-center text-sm text-gray-500">
            <p>&copy; {new Date().getFullYear()} ShopEase. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};
