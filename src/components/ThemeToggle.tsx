
import { useTheme } from "@/contexts/ThemeContext";
import { Button } from "@/components/ui/button";
import { Moon, Sun } from "lucide-react";
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip";

export function ThemeToggle() {
  const { theme, toggleTheme } = useTheme();

  return (
    <Tooltip>
      <TooltipTrigger asChild>
        <Button
          variant="outline"
          size="icon"
          onClick={toggleTheme}
          className="relative transition-all duration-200 hover:scale-105"
          aria-label={`Switch to ${theme === "light" ? "dark" : "light"} theme`}
        >
          <Sun className={`h-4 w-4 transition-opacity ${theme === 'light' ? 'opacity-100' : 'opacity-0 absolute'}`} />
          <Moon className={`h-4 w-4 transition-opacity ${theme === 'dark' ? 'opacity-100' : 'opacity-0 absolute'}`} />
          <span className="sr-only">Toggle theme</span>
        </Button>
      </TooltipTrigger>
      <TooltipContent>
        <p>Switch to {theme === "light" ? "dark" : "light"} mode</p>
      </TooltipContent>
    </Tooltip>
  );
}
