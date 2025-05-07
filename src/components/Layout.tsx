
import { Link, useLocation } from "react-router-dom";
import { CartDrawer } from "@/components/CartDrawer";
import { Button } from "@/components/ui/button";
import { Home, Package } from "lucide-react";

interface LayoutProps {
  children: React.ReactNode;
}

export const Layout = ({ children }: LayoutProps) => {
  const location = useLocation();

  const isActive = (path: string) => {
    return location.pathname === path;
  };

  return (
    <div className="flex min-h-screen flex-col">
      <header className="sticky top-0 z-10 border-b bg-background/80 backdrop-blur-sm">
        <div className="container mx-auto flex h-16 items-center justify-between px-4">
          <Link to="/" className="text-xl font-bold">ShopEase</Link>
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
          <div className="flex items-center space-x-4">
            <CartDrawer />
            <div className="md:hidden">
              <Button
                asChild
                variant="ghost"
                size="icon"
                className={isActive("/") ? "bg-accent" : ""}
              >
                <Link to="/">
                  <Home className="h-4 w-4" />
                </Link>
              </Button>
              <Button
                asChild
                variant="ghost"
                size="icon"
                className={isActive("/orders") ? "bg-accent" : ""}
              >
                <Link to="/orders">
                  <Package className="h-4 w-4" />
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </header>
      <main className="flex-1 container mx-auto p-4">
        {children}
      </main>
      <footer className="border-t bg-gray-50 py-6">
        <div className="container mx-auto px-4 text-center text-sm text-gray-500">
          <p>&copy; {new Date().getFullYear()} ShopEase. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
};
