
import React from "react";
import { cn } from "@/lib/utils";
import { Check } from "lucide-react";

export type StepStatus = "upcoming" | "current" | "complete";

interface StepsProps {
  children: React.ReactNode;
  className?: string;
}

interface StepProps {
  title: string;
  description?: string;
  icon?: React.ReactNode;
  status?: StepStatus;
  className?: string;
}

export const Steps = ({ children, className }: StepsProps) => {
  // Count valid Step children
  const validChildren = React.Children.toArray(children).filter(
    (child) => React.isValidElement(child) && child.type === Step
  );
  
  const childrenWithProps = React.Children.map(validChildren, (child, index) => {
    if (React.isValidElement(child)) {
      return React.cloneElement(child, {
        ...(child.props as StepProps),
        isLast: index === validChildren.length - 1,
      });
    }
    return child;
  });

  return (
    <div className={cn("space-y-0", className)}>
      {childrenWithProps}
    </div>
  );
};

export const Step = ({ 
  title, 
  description, 
  icon, 
  status = "upcoming", 
  className,
  isLast = false 
}: StepProps & { isLast?: boolean }) => {
  return (
    <div className={cn("relative pb-8", isLast && "pb-0", className)}>
      {/* Connector Line */}
      {!isLast && (
        <div
          className={cn(
            "absolute left-4 top-4 -ml-px h-full w-0.5 -translate-x-1/2",
            status === "complete" ? "bg-primary" : "bg-gray-200"
          )}
          aria-hidden="true"
        ></div>
      )}

      <div className="relative flex gap-3">
        {/* Step Icon */}
        <div
          className={cn(
            "flex h-8 w-8 items-center justify-center rounded-full",
            status === "complete" ? "bg-primary" : "bg-gray-200"
          )}
        >
          {status === "complete" ? (
            <Check className="h-5 w-5 text-white" />
          ) : (
            <span className={cn("text-sm", status === "upcoming" ? "text-gray-500" : "text-white")}>
              {icon}
            </span>
          )}
        </div>

        {/* Step Content */}
        <div className="flex flex-1 flex-col pt-0.5">
          <h3 className="font-medium">{title}</h3>
          {description && <p className="text-sm text-muted-foreground">{description}</p>}
        </div>
      </div>
    </div>
  );
};
