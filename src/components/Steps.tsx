
import { Check } from "lucide-react";
import { cn } from "@/lib/utils";

interface StepsProps {
  currentStep: number;
  steps: string[];
}

export const Steps = ({ currentStep, steps }: StepsProps) => {
  return (
    <div className="flex w-full justify-between">
      {steps.map((step, index) => {
        const isActive = currentStep === index;
        const isCompleted = currentStep > index;
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
            <div className="flex items-center">
              <div
                className={cn(
                  "h-8 w-8 rounded-full border-2 border-primary flex items-center justify-center",
                  {
                    "bg-primary text-primary-foreground": isActive || isCompleted,
                    "text-primary": !isActive && !isCompleted,
                  }
                )}
              >
                {isCompleted ? (
                  <Check className="h-5 w-5" />
                ) : (
                  <span>{index + 1}</span>
                )}
              </div>
              
              {!isLastStep && (
                <div
                  className={cn("h-1 w-full bg-muted", {
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
