import * as React from "react";
import { Moon, Sun } from "lucide-react";
import { Button } from "@/components/ui/button";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { useThemeStore } from "@/store/theme-store";
import { predefinedThemes } from "@/lib/themes";

export function ThemeToggle() {
  const { currentTheme, setTheme } = useThemeStore();
  
  const isDarkTheme = React.useMemo(() => {
    // Simple check to determine if the current theme is dark
    const bgColor = currentTheme.colors.background;
    const r = parseInt(bgColor.slice(1, 3), 16);
    const g = parseInt(bgColor.slice(3, 5), 16);
    const b = parseInt(bgColor.slice(5, 7), 16);
    
    // Calculate perceived brightness
    // Formula: (R * 299 + G * 587 + B * 114) / 1000
    const brightness = (r * 299 + g * 587 + b * 114) / 1000;
    
    return brightness < 128; // If brightness is less than 128, consider it dark
  }, [currentTheme]);
  
  const toggleTheme = () => {
    if (isDarkTheme) {
      // Switch to light theme
      const lightTheme = predefinedThemes.find(theme => theme.id === "light");
      if (lightTheme) setTheme(lightTheme.id);
    } else {
      // Switch to dark theme
      const darkTheme = predefinedThemes.find(theme => theme.id === "dark");
      if (darkTheme) setTheme(darkTheme.id);
    }
  };

  return (
    <div className="fixed bottom-4 right-4 z-50">
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="outline" size="icon" className="rounded-full">
            {isDarkTheme ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
            <span className="sr-only">Toggle theme</span>
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end">
          <DropdownMenuItem onClick={toggleTheme}>
            {isDarkTheme ? "Light Mode" : "Dark Mode"}
          </DropdownMenuItem>
          <DropdownMenuItem onClick={() => window.location.href = "#theme-selector"}>
            Theme Gallery
          </DropdownMenuItem>
          <DropdownMenuItem onClick={() => window.location.href = "#theme-builder"}>
            Theme Builder
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
}