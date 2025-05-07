import { Check } from "lucide-react";
import { cn } from "@/lib/utils";
import { ReactNode } from "react";

export interface StepsProps {
  currentStep?: number;
  steps?: string[];
  children?: ReactNode;
  aria?: {
    label?: string;
  };
}

export interface StepProps {
  icon?: ReactNode;
  title: string;
  description?: string;
  status?: "upcoming" | "current" | "complete";
  aria?: {
    label?: string;
  };
}

export const Step = ({ icon, title, description, status = "upcoming", aria }: StepProps) => {
  const isActive = status === "current";
  const isCompleted = status === "complete";

  return (
    <div className="flex flex-1 flex-col items-center">
      <div className="flex items-center w-full">
        <div
          className={cn(
            "h-8 w-8 rounded-full border-2 border-primary flex items-center justify-center transition-all",
            {
              "bg-primary text-primary-foreground": isActive || isCompleted,
              "text-primary": !isActive && !isCompleted,
            }
          )}
          role="img"
          aria-label={aria?.label || `Step ${title} ${status}`}
        >
          {isCompleted ? (
            <Check className="h-5 w-5 animate-fade-in" />
          ) : icon ? (
            icon
          ) : (
            <span>•</span>
          )}
        </div>
        
        <div
          className={cn("h-1 w-full bg-muted transition-colors", {
            "bg-primary": isCompleted,
          })}
        />
      </div>
      
      <div className="mt-2 text-center">
        <p
          className={cn("text-sm font-medium", {
            "text-primary": isActive || isCompleted,
            "text-muted-foreground": !isActive && !isCompleted,
          })}
        >
          {title}
        </p>
        {description && (
          <p className="text-xs text-muted-foreground">{description}</p>
        )}
      </div>
    </div>
  );
};

export const Steps = ({ currentStep, steps, children, aria }: StepsProps) => {
  // If we have children, render those directly
  if (children) {
    return (
      <div 
        className="flex w-full justify-between"
        role="navigation" 
        aria-label={aria?.label || "Process steps"}
      >
        {children}
      </div>
    );
  }

  // Otherwise use the traditional numbered steps implementation
  return (
    <div 
      className="flex w-full justify-between"
      role="navigation" 
      aria-label={aria?.label || "Process steps"}
    >
      {steps?.map((step, index) => {
        const isActive = currentStep === index;
        const isCompleted = currentStep! > index;
        const isLastStep = index === steps.length - 1;
        
        return (
          <div
            key={step}
            className={cn(
              "flex flex-col items-center justify-center space-y-2",
              {
                "flex-1": !isLastStep,
              }
            )}
          >
            <div className="flex items-center w-full">
              <div
                className={cn(
                  "h-8 w-8 rounded-full border-2 border-primary flex items-center justify-center transition-all",
                  {
                    "bg-primary text-primary-foreground": isActive || isCompleted,
                    "text-primary": !isActive && !isCompleted,
                  }
                )}
                aria-label={`Step ${index + 1}: ${step}`}
                aria-current={isActive ? "step" : undefined}
                role="status"
              >
                {isCompleted ? (
                  <Check className="h-5 w-5 animate-fade-in" />
                ) : (
                  <span>{index + 1}</span>
                )}
              </div>
              
              {!isLastStep && (
                <div
                  className={cn("h-1 w-full bg-muted transition-colors", {
                    "bg-primary": isCompleted,
                  })}
                />
              )}
            </div>
            
            <span
              className={cn("text-sm font-medium", {
                "text-primary": isActive || isCompleted,
                "text-muted-foreground": !isActive && !isCompleted,
              })}
            >
              {step}
            </span>
          </div>
        );
      })}
    </div>
  );
};
