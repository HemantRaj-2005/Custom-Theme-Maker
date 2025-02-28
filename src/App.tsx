import { useEffect } from 'react';
import { useThemeStore } from './store/theme-store';
import { ThemeSelector } from './components/Themes/ThemeSelector';
import { ThemeBuilder } from './components/Themes/ThemeBuilder';
import { GlowingEffectsShowcase } from './components/Themes/GlowingEffects';
import { ThemeToggle } from './components/Themes/ThemeToggle';
import { Toaster } from 'sonner';
import { Separator } from './components/ui/separator';

function App() {
  const { currentTheme, setTheme } = useThemeStore();

  // Apply the current theme on initial load
  useEffect(() => {
    // If no theme is set, the default will be used
    setTheme(currentTheme.id);
  }, []);

  return (
    <div className="min-h-screen bg-background text-foreground">
      <header className="sticky top-0 z-40 w-full border-b bg-background/95 backdrop-blur">
        <div className="container flex h-16 items-center">
          <h1 className="text-2xl font-bold">Theme Customizer</h1>
        </div>
      </header>
      
      <main className="container py-8">
        <div className="space-y-12">
          <section id="theme-selector" className="space-y-6">
            <h2 className="text-3xl font-bold">Theme Gallery</h2>
            <p className="text-muted-foreground">
              Browse and select from our collection of beautiful themes or create your own.
            </p>
            <ThemeSelector />
          </section>
          
          <Separator />
          
          <section id="theme-builder" className="space-y-6">
            <h2 className="text-3xl font-bold">Theme Builder</h2>
            <p className="text-muted-foreground">
              Create your own custom theme with our interactive builder.
            </p>
            <ThemeBuilder />
          </section>
          
          <Separator />
          
          <section id="glowing-effects" className="space-y-6">
            <h2 className="text-3xl font-bold">Glowing Effects</h2>
            <p className="text-muted-foreground">
              Explore our collection of glowing UI components that adapt to your current theme.
            </p>
            <GlowingEffectsShowcase />
          </section>
        </div>
      </main>
      
      <footer className="border-t py-6">
        <div className="container flex flex-col items-center justify-between gap-4 md:flex-row">
          <p className="text-center text-sm text-muted-foreground">
            &copy; {new Date().getFullYear()} Theme Customizer. All rights reserved.
          </p>
          <p className="text-center text-sm text-muted-foreground">
            Built with React, TypeScript, and shadcn/ui
          </p>
        </div>
      </footer>
      
      <ThemeToggle />
      <Toaster position="top-right" />
    </div>
  );
}

export default App;