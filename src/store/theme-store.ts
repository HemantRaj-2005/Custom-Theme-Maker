import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { Theme, defaultTheme, predefinedThemes, applyTheme } from '@/lib/themes';

interface ThemeState {
  currentTheme: Theme;
  customThemes: Theme[];
  setTheme: (themeId: string) => void;
  addCustomTheme: (theme: Theme) => Theme;
  updateCustomTheme: (theme: Theme) => void;
  deleteCustomTheme: (themeId: string) => void;
}

export const useThemeStore = create<ThemeState>()(
  persist(
    (set, get) => ({
      currentTheme: defaultTheme,
      customThemes: [],
      
      setTheme: (themeId: string) => {
        const { customThemes } = get();
        
        const predefinedTheme = predefinedThemes.find(theme => theme.id === themeId);
        
        if (predefinedTheme) {
          applyTheme(predefinedTheme);
          set({ currentTheme: predefinedTheme });
          return;
        }
        
        const customTheme = customThemes.find(theme => theme.id === themeId);
        
        if (customTheme) {
          applyTheme(customTheme);
          set({ currentTheme: customTheme });
          return;
        }
        
        applyTheme(defaultTheme);
        set({ currentTheme: defaultTheme });
      },
      
      addCustomTheme: (theme: Theme) => {
        const { customThemes } = get();
        
        if (!theme.id) {
          theme.id = `custom-${Date.now()}`;
        }
        
        // Ensure name is unique
        let nameCount = 0;
        const baseName = theme.name || 'Custom Theme';
        let uniqueName = baseName;
        
        while (
          predefinedThemes.some(t => t.name === uniqueName) || 
          customThemes.some(t => t.name === uniqueName)
        ) {
          nameCount++;
          uniqueName = `${baseName} ${nameCount}`;
        }
        
        theme.name = uniqueName;
        
        set({ customThemes: [...customThemes, theme] });
        return theme;
      },
      
      updateCustomTheme: (updatedTheme: Theme) => {
        const { customThemes, currentTheme } = get();
        
        const updatedThemes = customThemes.map(theme => 
          theme.id === updatedTheme.id ? updatedTheme : theme
        );
        
        set({ customThemes: updatedThemes });
        
        // If the current theme is being updated, apply the changes
        if (currentTheme.id === updatedTheme.id) {
          applyTheme(updatedTheme);
          set({ currentTheme: updatedTheme });
        }
      },
      
      deleteCustomTheme: (themeId: string) => {
        const { customThemes, currentTheme } = get();
        
        const updatedThemes = customThemes.filter(theme => theme.id !== themeId);
        set({ customThemes: updatedThemes });
        
        if (currentTheme.id === themeId) {
          applyTheme(defaultTheme);
          set({ currentTheme: defaultTheme });
        }
      },
    }),
    {
      name: 'theme-storage',
      onRehydrateStorage: () => {
        // Apply the saved theme when the store is rehydrated
        return (rehydratedState, error) => {
          if (error) {
            console.error('Error rehydrating theme store:', error);
            return;
          }
          
          if (rehydratedState?.currentTheme) {
            applyTheme(rehydratedState.currentTheme);
          }
        };
      },
    }
  )
);