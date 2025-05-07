
import { Loader2 } from "lucide-react";
import { cn } from "@/lib/utils";

interface LoadingSpinnerProps {
  className?: string;
  size?: "sm" | "md" | "lg";
  text?: string;
}

export const LoadingSpinner = ({
  className,
  size = "md",
  text
}: LoadingSpinnerProps) => {
  const sizeMap = {
    sm: "h-4 w-4",
    md: "h-8 w-8",
    lg: "h-12 w-12"
  };

  return (
    <div className={cn("flex flex-col items-center justify-center", className)}>
      <Loader2 className={cn("animate-spin text-primary", sizeMap[size])} />
      {text && <p className="mt-2 text-sm text-muted-foreground">{text}</p>}
    </div>
  );
};

export const PageLoader = () => (
  <div className="flex items-center justify-center h-[50vh]">
    <LoadingSpinner size="lg" text="Loading..." />
  </div>
);

export const SkeletonLoader = ({ count = 3 }) => (
  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
    {Array.from({ length: count }).map((_, i) => (
      <div key={i} className="flex flex-col space-y-3">
        <div className="h-48 bg-muted rounded-md animate-pulse" />
        <div className="h-5 bg-muted rounded-md w-2/3 animate-pulse" />
        <div className="h-4 bg-muted rounded-md w-1/2 animate-pulse" />
      </div>
    ))}
  </div>
);
