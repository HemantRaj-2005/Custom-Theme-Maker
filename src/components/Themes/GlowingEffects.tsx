import React from "react";
import { cn } from "@/lib/utils";
import { useThemeStore } from "@/store/theme-store";

interface GlowingButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  glowColor?: string;
  intensity?: "low" | "medium" | "high";
  variant?: "solid" | "outline" | "ghost";
  size?: "sm" | "md" | "lg";
}

export function GlowingButton({
  children,
  className,
  glowColor,
  intensity = "medium",
  variant = "solid",
  size = "md",
  ...props
}: GlowingButtonProps) {
  const { currentTheme } = useThemeStore();
  
  const color = glowColor || currentTheme.colors.primary;
  
  const intensityMap = {
    low: "0 0 5px",
    medium: "0 0 15px",
    high: "0 0 25px",
  };
  
  const sizeMap = {
    sm: "px-3 py-1 text-sm",
    md: "px-4 py-2",
    lg: "px-6 py-3 text-lg",
  };
  
  const getVariantStyles = () => {
    switch (variant) {
      case "outline":
        return {
          backgroundColor: "transparent",
          borderColor: color,
          color: color,
          boxShadow: `${intensityMap[intensity]} ${color}40, inset 0 0 0 1px ${color}`,
        };
      case "ghost":
        return {
          backgroundColor: "transparent",
          borderColor: "transparent",
          color: color,
          boxShadow: "none",
          "&:hover": {
            boxShadow: `${intensityMap[intensity]} ${color}40`,
            backgroundColor: `${color}10`,
          },
        };
      default:
        return {
          backgroundColor: color,
          borderColor: color,
          color: currentTheme.colors.primaryForeground,
          boxShadow: `${intensityMap[intensity]} ${color}40`,
        };
    }
  };
  
  const styles = {
    ...getVariantStyles(),
    borderRadius: `${currentTheme.radius || 8}px`,
  };

  return (
    <button
      className={cn(
        "relative inline-flex items-center justify-center whitespace-nowrap rounded-md font-medium transition-all focus-visible:outline-none focus-visible:ring-1 disabled:pointer-events-none disabled:opacity-50",
        sizeMap[size],
        className
      )}
      style={styles as React.CSSProperties}
      {...props}
    >
      {children}
    </button>
  );
}

interface GlowingCardProps extends React.HTMLAttributes<HTMLDivElement> {
  glowColor?: string;
  intensity?: "low" | "medium" | "high";
}

export function GlowingCard({
  children,
  className,
  glowColor,
  intensity = "medium",
  ...props
}: GlowingCardProps) {
  const { currentTheme } = useThemeStore();
  
  const color = glowColor || currentTheme.colors.primary;
  
  const intensityMap = {
    low: "0 0 10px",
    medium: "0 0 20px",
    high: "0 0 30px",
  };
  
  const styles = {
    backgroundColor: currentTheme.colors.card,
    color: currentTheme.colors.cardForeground,
    borderRadius: `${currentTheme.radius || 8}px`,
    boxShadow: `${intensityMap[intensity]} ${color}40`,
    border: `1px solid ${color}80`,
  };

  return (
    <div
      className={cn("p-4 transition-all", className)}
      style={styles as React.CSSProperties}
      {...props}
    >
      {children}
    </div>
  );
}

interface GlowingTextProps extends React.HTMLAttributes<HTMLParagraphElement> {
  glowColor?: string;
  intensity?: "low" | "medium" | "high";
  as?: "p" | "h1" | "h2" | "h3" | "h4" | "h5" | "h6" | "span";
}

export function GlowingText({
  children,
  className,
  glowColor,
  intensity = "medium",
  as: Component = "p",
  ...props
}: GlowingTextProps) {
  const { currentTheme } = useThemeStore();
  
  const color = glowColor || currentTheme.colors.primary;
  
  const intensityMap = {
    low: "0 0 2px",
    medium: "0 0 4px",
    high: "0 0 8px",
  };
  
  const styles = {
    color: color,
    textShadow: `${intensityMap[intensity]} ${color}`,
  };

  return (
    <Component
      className={cn("transition-all", className)}
      style={styles as React.CSSProperties}
      {...props}
    >
      {children}
    </Component>
  );
}

export function GlowingEffectsShowcase() {
  const { currentTheme } = useThemeStore();
  
  return (
    <div className="space-y-8">
      <div className="space-y-4">
        <h3 className="text-xl font-bold">Glowing Buttons</h3>
        <div className="flex flex-wrap gap-4">
          <GlowingButton>Default Button</GlowingButton>
          <GlowingButton variant="outline">Outline Button</GlowingButton>
          <GlowingButton variant="ghost">Ghost Button</GlowingButton>
          <GlowingButton intensity="high">High Intensity</GlowingButton>
          <GlowingButton glowColor={currentTheme.colors.destructive}>
            Custom Color
          </GlowingButton>
        </div>
      </div>
      
      <div className="space-y-4">
        <h3 className="text-xl font-bold">Glowing Cards</h3>
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
          <GlowingCard>
            <h4 className="mb-2 text-lg font-medium">Default Card</h4>
            <p>This card has a default glow effect based on the primary color.</p>
          </GlowingCard>
          
          <GlowingCard intensity="high" glowColor={currentTheme.colors.accent}>
            <h4 className="mb-2 text-lg font-medium">Custom Glow Card</h4>
            <p>This card has a high intensity glow with a custom color.</p>
          </GlowingCard>
        </div>
      </div>
      
      <div className="space-y-4">
        <h3 className="text-xl font-bold">Glowing Text</h3>
        <div className="space-y-2">
          <GlowingText as="h2" className="text-2xl font-bold">
            This is a glowing heading
          </GlowingText>
          
          <GlowingText>This is a default glowing paragraph text.</GlowingText>
          
          <GlowingText intensity="high" glowColor={currentTheme.colors.destructive}>
            High intensity custom colored text
          </GlowingText>
        </div>
      </div>
    </div>
  );
}