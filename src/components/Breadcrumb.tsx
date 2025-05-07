
import { Link, useLocation } from "react-router-dom";
import { ChevronRight, Home } from "lucide-react";
import { cn } from "@/lib/utils";

interface BreadcrumbItemProps {
  href: string;
  children: React.ReactNode;
  isLast?: boolean;
}

export const BreadcrumbItem = ({
  href,
  children,
  isLast = false,
}: BreadcrumbItemProps) => {
  return (
    <li className="inline-flex items-center">
      {isLast ? (
        <span className="text-sm font-medium text-foreground">{children}</span>
      ) : (
        <>
          <Link
            to={href}
            className="text-sm text-muted-foreground hover:text-foreground transition-colors"
          >
            {children}
          </Link>
          <ChevronRight className="mx-2 h-4 w-4 text-muted-foreground" />
        </>
      )}
    </li>
  );
};

interface BreadcrumbProps {
  className?: string;
  currentPath?: string;
}

export const Breadcrumb = ({ className, currentPath }: BreadcrumbProps) => {
  const location = useLocation();
  const pathname = currentPath || location.pathname;
  
  // Skip rendering breadcrumb on home page
  if (pathname === "/") {
    return null;
  }

  // Generate breadcrumb items
  const paths = pathname.split("/").filter(path => path);
  const items = [
    { name: "Home", path: "/" },
    ...paths.map((path, index) => {
      // Determine if category path
      if (index === 0 && pathname.includes("?category=")) {
        const params = new URLSearchParams(location.search);
        const category = params.get("category") || "";
        return {
          name: category || path.charAt(0).toUpperCase() + path.slice(1),
          path: `/${path}${location.search}`
        };
      }

      // For orders routes
      if (path === "orders" && index === 0) {
        return { name: "Orders", path: "/orders" };
      }
      
      // For order detail routes
      if (path === "orders" && index === 0 && paths.length > 1) {
        return { name: "Orders", path: "/orders" };
      }
      
      if (index > 0 && paths[0] === "orders") {
        return { name: `Order #${path}`, path: `${pathname}` };
      }

      return {
        name: path.charAt(0).toUpperCase() + path.slice(1),
        path: `/${paths.slice(0, index + 1).join("/")}`
      };
    })
  ];

  return (
    <nav 
      aria-label="Breadcrumb" 
      className={cn("py-3 flex items-center text-sm", className)}
    >
      <ol className="flex flex-wrap items-center space-x-1">
        {items.map((item, index) => (
          <BreadcrumbItem
            key={item.path}
            href={item.path}
            isLast={index === items.length - 1}
          >
            {index === 0 ? (
              <span className="flex items-center">
                <Home className="h-4 w-4 mr-1" />
                {item.name}
              </span>
            ) : (
              item.name
            )}
          </BreadcrumbItem>
        ))}
      </ol>
    </nav>
  );
};
