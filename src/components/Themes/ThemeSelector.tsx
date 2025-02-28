import React from "react";
import { useThemeStore } from "@/store/theme-store";
import { predefinedThemes } from "@/lib/themes";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ScrollArea } from "@/components/ui/scroll-area";
import { ThemeCard } from "./ThemeCard";

export function ThemeSelector() {
  const { currentTheme, customThemes, setTheme } = useThemeStore();
  const [selectedTab, setSelectedTab] = React.useState("all");
  const [searchQuery, setSearchQuery] = React.useState("");

  const allThemes = [...predefinedThemes, ...customThemes];
  
  const filteredThemes = allThemes.filter(theme => {
    if (selectedTab === "custom" && !customThemes.some(t => t.id === theme.id)) {
      return false;
    }
    if (selectedTab === "predefined" && !predefinedThemes.some(t => t.id === theme.id)) {
      return false;
    }
    
    return theme.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
           (theme.author && theme.author.toLowerCase().includes(searchQuery.toLowerCase()));
  });

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold">Theme Gallery</h2>
        <Select value={currentTheme.id} onValueChange={setTheme}>
          <SelectTrigger className="w-[200px]">
            <SelectValue placeholder="Select a theme" />
          </SelectTrigger>
          <SelectContent>
            {allThemes.map((theme) => (
              <SelectItem key={theme.id} value={theme.id}>
                {theme.name}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>
      
      <div className="relative">
        <input
          type="text"
          placeholder="Search themes..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
        />
      </div>
      
      <Tabs value={selectedTab} onValueChange={setSelectedTab}>
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="all">All Themes</TabsTrigger>
          <TabsTrigger value="predefined">Predefined</TabsTrigger>
          <TabsTrigger value="custom">Custom</TabsTrigger>
        </TabsList>
        
        <TabsContent value={selectedTab} className="mt-4">
          <ScrollArea className="h-[400px] rounded-md border p-4">
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {filteredThemes.map((theme) => (
                <ThemeCard
                  key={theme.id}
                  theme={theme}
                  isActive={currentTheme.id === theme.id}
                  onSelect={() => setTheme(theme.id)}
                />
              ))}
              
              {filteredThemes.length === 0 && (
                <div className="col-span-full flex h-32 items-center justify-center text-muted-foreground">
                  No themes found matching your search.
                </div>
              )}
            </div>
          </ScrollArea>
        </TabsContent>
      </Tabs>
      
      <div className="flex justify-end">
        <Button variant="outline" onClick={() => window.location.href = "#theme-builder"}>
          Create Custom Theme
        </Button>
      </div>
    </div>
  );
}