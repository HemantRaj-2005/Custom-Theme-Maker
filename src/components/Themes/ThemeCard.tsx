import { Theme } from "@/lib/themes";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { useThemeStore } from "@/store/theme-store";
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from "@/components/ui/alert-dialog";
import { Trash2 } from "lucide-react";

interface ThemeCardProps {
  theme: Theme;
  isActive: boolean;
  onSelect: () => void;
}

export function ThemeCard({ theme, isActive, onSelect }: ThemeCardProps) {
  const { deleteCustomTheme, customThemes } = useThemeStore();
  const isCustom = customThemes.some(t => t.id === theme.id);

  return (
    <div
      className={cn(
        "group relative overflow-hidden rounded-lg border p-4 transition-all hover:shadow-md",
        isActive && "ring-2 ring-primary"
      )}
    >
      <div className="flex flex-col gap-2">
        <div className="flex items-center justify-between">
          <h3 className="font-medium">{theme.name}</h3>
          {isCustom && (
            <AlertDialog>
              <AlertDialogTrigger asChild>
                <Button variant="ghost" size="icon" className="h-8 w-8 opacity-0 group-hover:opacity-100">
                  <Trash2 className="h-4 w-4" />
                </Button>
              </AlertDialogTrigger>
              <AlertDialogContent>
                <AlertDialogHeader>
                  <AlertDialogTitle>Delete theme</AlertDialogTitle>
                  <AlertDialogDescription>
                    Are you sure you want to delete "{theme.name}"? This action cannot be undone.
                  </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                  <AlertDialogCancel>Cancel</AlertDialogCancel>
                  <AlertDialogAction onClick={() => deleteCustomTheme(theme.id)}>
                    Delete
                  </AlertDialogAction>
                </AlertDialogFooter>
              </AlertDialogContent>
            </AlertDialog>
          )}
        </div>
        
        {theme.author && (
          <p className="text-xs text-muted-foreground">by {theme.author}</p>
        )}
        
        <div className="mt-2 grid grid-cols-5 gap-1">
          <div className="h-6 rounded" style={{ backgroundColor: theme.colors.primary }}></div>
          <div className="h-6 rounded" style={{ backgroundColor: theme.colors.secondary }}></div>
          <div className="h-6 rounded" style={{ backgroundColor: theme.colors.accent }}></div>
          <div className="h-6 rounded" style={{ backgroundColor: theme.colors.background }}></div>
          <div className="h-6 rounded" style={{ backgroundColor: theme.colors.destructive }}></div>
        </div>
        
        <div className="mt-2">
          <Button 
            variant={isActive ? "secondary" : "default"} 
            size="sm" 
            className="w-full"
            onClick={onSelect}
          >
            {isActive ? "Current" : "Apply"}
          </Button>
        </div>
      </div>
      
      {isActive && (
        <div className="absolute inset-0 border-2 border-primary"></div>
      )}
    </div>
  );
}