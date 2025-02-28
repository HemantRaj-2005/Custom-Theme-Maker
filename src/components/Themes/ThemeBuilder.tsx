import  { useState } from "react";
import { useThemeStore } from "@/store/theme-store";
import { Theme, fontOptions } from "@/lib/themes";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Slider } from "@/components/ui/slider";
import { ColorPicker } from "@/components/ui/color-picker";
import { ThemePreview } from "./ThemePreview";
import { toast } from "sonner";

export function ThemeBuilder() {
  const { currentTheme, addCustomTheme, updateCustomTheme, customThemes } = useThemeStore();
  const [editingTheme, setEditingTheme] = useState<Theme>({ ...currentTheme, id: "", name: "My Custom Theme" });
  const [selectedTab, setSelectedTab] = useState("colors");
  
  const isEditing = customThemes.some(theme => theme.id === editingTheme.id);
  
  const handleColorChange = (key: keyof Theme["colors"], value: string) => {
    setEditingTheme(prev => ({
      ...prev,
      colors: {
        ...prev.colors,
        [key]: value
      }
    }));
  };
  
  const handleSave = () => {
    if (!editingTheme.name.trim()) {
      toast.error("Please provide a theme name");
      return;
    }
    
    try {
      if (isEditing) {
        updateCustomTheme(editingTheme);
        toast.success(`Theme "${editingTheme.name}" updated successfully`);
      } else {
        const newTheme = addCustomTheme({ ...editingTheme });
        setEditingTheme({ ...newTheme });
        toast.success(`Theme "${editingTheme.name}" created successfully`);
      }
    } catch (error) {
      toast.error("Failed to save theme");
      console.error(error);
    }
  };
  
  const handleReset = () => {
    setEditingTheme({ ...currentTheme, id: "", name: "My Custom Theme" });
  };
  
  return (
    <div className="space-y-6" id="theme-builder">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold">Theme Builder</h2>
        <div className="flex gap-2">
          <Button variant="outline" onClick={handleReset}>
            Reset
          </Button>
          <Button onClick={handleSave}>
            {isEditing ? "Update" : "Save"} Theme
          </Button>
        </div>
      </div>
      
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
        <div className="space-y-6">
          <div className="space-y-2">
            <Label htmlFor="theme-name">Theme Name</Label>
            <Input
              id="theme-name"
              value={editingTheme.name}
              onChange={(e) => setEditingTheme({ ...editingTheme, name: e.target.value })}
              placeholder="Enter theme name"
            />
          </div>
          
          <Tabs value={selectedTab} onValueChange={setSelectedTab}>
            <TabsList className="grid w-full grid-cols-3">
              <TabsTrigger value="colors">Colors</TabsTrigger>
              <TabsTrigger value="typography">Typography</TabsTrigger>
              <TabsTrigger value="radius">Radius</TabsTrigger>
            </TabsList>
            
            <TabsContent value="colors" className="space-y-4 pt-4">
              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                <ColorPicker
                  label="Background"
                  value={editingTheme.colors.background}
                  onChange={(value) => handleColorChange("background", value)}
                />
                <ColorPicker
                  label="Foreground"
                  value={editingTheme.colors.foreground}
                  onChange={(value) => handleColorChange("foreground", value)}
                />
                <ColorPicker
                  label="Card"
                  value={editingTheme.colors.card}
                  onChange={(value) => handleColorChange("card", value)}
                />
                <ColorPicker
                  label="Card Foreground"
                  value={editingTheme.colors.cardForeground}
                  onChange={(value) => handleColorChange("cardForeground", value)}
                />
                <ColorPicker
                  label="Primary"
                  value={editingTheme.colors.primary}
                  onChange={(value) => handleColorChange("primary", value)}
                />
                <ColorPicker
                  label="Primary Foreground"
                  value={editingTheme.colors.primaryForeground}
                  onChange={(value) => handleColorChange("primaryForeground", value)}
                />
                <ColorPicker
                  label="Secondary"
                  value={editingTheme.colors.secondary}
                  onChange={(value) => handleColorChange("secondary", value)}
                />
                <ColorPicker
                  label="Secondary Foreground"
                  value={editingTheme.colors.secondaryForeground}
                  onChange={(value) => handleColorChange("secondaryForeground", value)}
                />
                <ColorPicker
                  label="Accent"
                  value={editingTheme.colors.accent}
                  onChange={(value) => handleColorChange("accent", value)}
                />
                <ColorPicker
                  label="Accent Foreground"
                  value={editingTheme.colors.accentForeground}
                  onChange={(value) => handleColorChange("accentForeground", value)}
                />
                <ColorPicker
                  label="Destructive"
                  value={editingTheme.colors.destructive}
                  onChange={(value) => handleColorChange("destructive", value)}
                />
                <ColorPicker
                  label="Destructive Foreground"
                  value={editingTheme.colors.destructiveForeground}
                  onChange={(value) => handleColorChange("destructiveForeground", value)}
                />
                <ColorPicker
                  label="Muted"
                  value={editingTheme.colors.muted}
                  onChange={(value) => handleColorChange("muted", value)}
                />
                <ColorPicker
                  label="Muted Foreground"
                  value={editingTheme.colors.mutedForeground}
                  onChange={(value) => handleColorChange("mutedForeground", value)}
                />
                <ColorPicker
                  label="Border"
                  value={editingTheme.colors.border}
                  onChange={(value) => handleColorChange("border", value)}
                />
                <ColorPicker
                  label="Input"
                  value={editingTheme.colors.input}
                  onChange={(value) => handleColorChange("input", value)}
                />
                <ColorPicker
                  label="Ring"
                  value={editingTheme.colors.ring}
                  onChange={(value) => handleColorChange("ring", value)}
                />
              </div>
            </TabsContent>
            
            <TabsContent value="typography" className="space-y-4 pt-4">
              <div className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="font-family">Font Family</Label>
                  <Select
                    value={editingTheme.font || "Inter"}
                    onValueChange={(value) => setEditingTheme({ ...editingTheme, font: value })}
                  >
                    <SelectTrigger id="font-family">
                      <SelectValue placeholder="Select font" />
                    </SelectTrigger>
                    <SelectContent>
                      {fontOptions.map((font) => (
                        <SelectItem key={font} value={font}>
                          {font}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <Label htmlFor="font-preview">Font Preview</Label>
                  </div>
                  <div
                    className="rounded-md border border-input p-4"
                    style={{ fontFamily: editingTheme.font || "Inter" }}
                  >
                    <p className="text-xl font-bold">The quick brown fox jumps over the lazy dog</p>
                    <p className="text-sm">
                      Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam euismod, nisl eget
                      aliquam ultricies, nunc nisl aliquet nunc, quis aliquam nisl nunc quis nisl.
                    </p>
                  </div>
                </div>
              </div>
            </TabsContent>
            
            <TabsContent value="radius" className="space-y-4 pt-4">
              <div className="space-y-4">
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <Label htmlFor="border-radius">Border Radius: {editingTheme.radius || 0}px</Label>
                  </div>
                  <Slider
                    id="border-radius"
                    min={0}
                    max={20}
                    step={1}
                    value={[editingTheme.radius || 0]}
                    onValueChange={(value) => setEditingTheme({ ...editingTheme, radius: value[0] })}
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="radius-preview">Radius Preview</Label>
                  <div className="grid grid-cols-2 gap-4">
                    <div
                      className="h-20 border border-input bg-primary"
                      style={{ borderRadius: `${editingTheme.radius || 0}px` }}
                    ></div>
                    <div
                      className="h-20 border border-input bg-secondary"
                      style={{ borderRadius: `${editingTheme.radius || 0}px` }}
                    ></div>
                  </div>
                </div>
              </div>
            </TabsContent>
          </Tabs>
        </div>
        
        <div className="space-y-4">
          <h3 className="text-lg font-medium">Live Preview</h3>
          <div className="rounded-lg border">
            <ThemePreview theme={editingTheme} />
          </div>
        </div>
      </div>
    </div>
  );
}