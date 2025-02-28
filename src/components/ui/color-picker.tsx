import * as React from "react";
import { cn } from "@/lib/utils";

interface ColorPickerProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  value: string;
  onChange: (value: string) => void;
  className?: string;
}

const ColorPicker = React.forwardRef<HTMLInputElement, ColorPickerProps>(
  ({ label, value, onChange, className, ...props }, ref) => {
    return (
      <div className={cn("flex flex-col gap-1.5", className)}>
        {label && (
          <label className="text-sm font-medium text-foreground">
            {label}
          </label>
        )}
        <div className="flex items-center gap-2">
          <div
            className="h-8 w-8 rounded-md border border-input"
            style={{ backgroundColor: value }}
          />
          <input
            ref={ref}
            type="color"
            value={value}
            onChange={(e) => onChange(e.target.value)}
            className="h-8 w-full cursor-pointer appearance-none rounded-md border border-input bg-transparent px-3 py-1 text-sm shadow-sm transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50"
            {...props}
          />
        </div>
      </div>
    );
  }
);

ColorPicker.displayName = "ColorPicker";

export { ColorPicker };