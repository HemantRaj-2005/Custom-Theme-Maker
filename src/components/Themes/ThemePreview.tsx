import React from "react";
import { Theme } from "@/lib/themes";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Switch } from "@/components/ui/switch";
import { Separator } from "@/components/ui/separator";

interface ThemePreviewProps {
  theme: Theme;
}

export function ThemePreview({ theme }: ThemePreviewProps) {
  const previewStyle = {
    "--preview-background": theme.colors.background,
    "--preview-foreground": theme.colors.foreground,
    "--preview-card": theme.colors.card,
    "--preview-card-foreground": theme.colors.cardForeground,
    "--preview-primary": theme.colors.primary,
    "--preview-primary-foreground": theme.colors.primaryForeground,
    "--preview-secondary": theme.colors.secondary,
    "--preview-secondary-foreground": theme.colors.secondaryForeground,
    "--preview-muted": theme.colors.muted,
    "--preview-muted-foreground": theme.colors.mutedForeground,
    "--preview-accent": theme.colors.accent,
    "--preview-accent-foreground": theme.colors.accentForeground,
    "--preview-destructive": theme.colors.destructive,
    "--preview-destructive-foreground": theme.colors.destructiveForeground,
    "--preview-border": theme.colors.border,
    "--preview-input": theme.colors.input,
    "--preview-ring": theme.colors.ring,
    "--preview-radius": `${theme.radius || 0}px`,
    "--preview-font": theme.font || "Inter",
  } as React.CSSProperties;

  return (
    <div
      className="h-full overflow-hidden rounded-md p-6"
      style={{
        ...previewStyle,
        backgroundColor: theme.colors.background,
        color: theme.colors.foreground,
        fontFamily: `var(--preview-font), sans-serif`,
      }}
    >
      <div className="flex flex-col gap-6">
        <div className="space-y-2">
          <h3 className="text-xl font-bold" style={{ color: theme.colors.foreground }}>
            Theme Preview
          </h3>
          <p className="text-sm" style={{ color: theme.colors.mutedForeground }}>
            This is how your theme will look in the application.
          </p>
        </div>

        <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
          <Card style={{ 
            backgroundColor: theme.colors.card, 
            color: theme.colors.cardForeground,
            borderRadius: `${theme.radius || 0}px`,
            borderColor: theme.colors.border
          }}>
            <CardHeader>
              <CardTitle style={{ color: theme.colors.cardForeground }}>Card Title</CardTitle>
              <CardDescription style={{ color: theme.colors.mutedForeground }}>
                Card description goes here
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="preview-input" style={{ color: theme.colors.cardForeground }}>
                    Input Label
                  </Label>
                  <Input
                    id="preview-input"
                    placeholder="Input placeholder"
                    style={{ 
                      backgroundColor: 'transparent',
                      borderColor: theme.colors.input,
                      borderRadius: `${theme.radius || 0}px`,
                      color: theme.colors.cardForeground
                    }}
                  />
                </div>
                <div className="flex items-center space-x-2">
                  <Switch id="preview-switch" style={{ 
                    '--switch-thumb-color': theme.colors.background,
                    '--switch-active-color': theme.colors.primary
                  } as React.CSSProperties} />
                  <Label htmlFor="preview-switch" style={{ color: theme.colors.cardForeground }}>
                    Toggle me
                  </Label>
                </div>
              </div>
            </CardContent>
            <CardFooter className="flex justify-between">
              <Button variant="outline" style={{ 
                borderColor: theme.colors.border,
                color: theme.colors.cardForeground,
                borderRadius: `${theme.radius || 0}px`
              }}>
                Cancel
              </Button>
              <Button style={{ 
                backgroundColor: theme.colors.primary,
                color: theme.colors.primaryForeground,
                borderRadius: `${theme.radius || 0}px`
              }}>
                Submit
              </Button>
            </CardFooter>
          </Card>

          <div className="space-y-4">
            <Tabs defaultValue="tab1" style={{ color: theme.colors.foreground }}>
              <TabsList className="w-full" style={{ 
                backgroundColor: theme.colors.muted,
                borderRadius: `${theme.radius || 0}px`
              }}>
                <TabsTrigger 
                  value="tab1" 
                  style={{ 
                    borderRadius: `${theme.radius || 0}px`,
                    color: theme.colors.foreground
                  }}
                  className="data-[state=active]:bg-background data-[state=active]:text-foreground"
                >
                  Tab 1
                </TabsTrigger>
                <TabsTrigger 
                  value="tab2" 
                  style={{ 
                    borderRadius: `${theme.radius || 0}px`,
                    color: theme.colors.foreground
                  }}
                >
                  Tab 2
                </TabsTrigger>
              </TabsList>
              <TabsContent value="tab1" className="mt-2 space-y-4">
                <div className="flex flex-wrap gap-2">
                  <Badge style={{ 
                    backgroundColor: theme.colors.primary,
                    color: theme.colors.primaryForeground,
                    borderRadius: `${theme.radius || 0}px`
                  }}>
                    Primary
                  </Badge>
                  <Badge variant="secondary" style={{ 
                    backgroundColor: theme.colors.secondary,
                    color: theme.colors.secondaryForeground,
                    borderRadius: `${theme.radius || 0}px`
                  }}>
                    Secondary
                  </Badge>
                  <Badge variant="outline" style={{ 
                    borderColor: theme.colors.border,
                    color: theme.colors.foreground,
                    borderRadius: `${theme.radius || 0}px`
                  }}>
                    Outline
                  </Badge>
                  <Badge variant="destructive" style={{ 
                    backgroundColor: theme.colors.destructive,
                    color: theme.colors.destructiveForeground,
                    borderRadius: `${theme.radius || 0}px`
                  }}>
                    Destructive
                  </Badge>
                </div>
                
                <div className="space-y-2">
                  <h4 style={{ color: theme.colors.foreground }}>Buttons</h4>
                  <div className="flex flex-wrap gap-2">
                    <Button size="sm" style={{ 
                      backgroundColor: theme.colors.primary,
                      color: theme.colors.primaryForeground,
                      borderRadius: `${theme.radius || 0}px`
                    }}>
                      Primary
                    </Button>
                    <Button size="sm" variant="secondary" style={{ 
                      backgroundColor: theme.colors.secondary,
                      color: theme.colors.secondaryForeground,
                      borderRadius: `${theme.radius || 0}px`
                    }}>
                      Secondary
                    </Button>
                    <Button size="sm" variant="outline" style={{ 
                      borderColor: theme.colors.border,
                      color: theme.colors.foreground,
                      borderRadius: `${theme.radius || 0}px`
                    }}>
                      Outline
                    </Button>
                    <Button size="sm" variant="destructive" style={{ 
                      backgroundColor: theme.colors.destructive,
                      color: theme.colors.destructiveForeground,
                      borderRadius: `${theme.radius || 0}px`
                    }}>
                      Destructive
                    </Button>
                  </div>
                </div>
              </TabsContent>
              <TabsContent value="tab2" className="mt-2">
                <div className="rounded-md border p-4" style={{ 
                  borderColor: theme.colors.border,
                  borderRadius: `${theme.radius || 0}px`
                }}>
                  <p style={{ color: theme.colors.foreground }}>
                    This is the content for tab 2.
                  </p>
                </div>
              </TabsContent>
            </Tabs>
            
            <div className="space-y-2">
              <h4 style={{ color: theme.colors.foreground }}>Typography</h4>
              <div className="space-y-1">
                <p className="text-xl font-bold" style={{ color: theme.colors.foreground }}>
                  Heading Text
                </p>
                <p style={{ color: theme.colors.foreground }}>
                  Regular paragraph text
                </p>
                <p className="text-sm" style={{ color: theme.colors.mutedForeground }}>
                  Small muted text
                </p>
                <div className="flex items-center gap-2">
                  <span style={{ color: theme.colors.foreground }}>Link:</span>
                  <a href="#" style={{ color: theme.colors.primary }}>
                    Click me
                  </a>
                </div>
              </div>
            </div>
            
            <Separator style={{ backgroundColor: theme.colors.border }} />
            
            <div className="rounded-md border p-4" style={{ 
              borderColor: theme.colors.border,
              backgroundColor: theme.colors.accent,
              color: theme.colors.accentForeground,
              borderRadius: `${theme.radius || 0}px`
            }}>
              <p className="text-sm">
                This is an accent-colored container with custom text.
              </p>
            </div>
          </div>
        </div>
        
        <div className="flex justify-end">
          <div className="space-x-2">
            <Button variant="outline" style={{ 
              borderColor: theme.colors.border,
              color: theme.colors.foreground,
              borderRadius: `${theme.radius || 0}px`
            }}>
              Cancel
            </Button>
            <Button style={{ 
              backgroundColor: theme.colors.primary,
              color: theme.colors.primaryForeground,
              borderRadius: `${theme.radius || 0}px`,
              boxShadow: `0 0 15px ${theme.colors.primary}80`
            }}>
              Save Theme
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}