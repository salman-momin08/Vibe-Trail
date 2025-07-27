import React from "react";
import type { LucideProps } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { cn } from "@/lib/utils";

interface InputWithIconProps extends React.InputHTMLAttributes<HTMLInputElement> {
  icon: React.ComponentType<LucideProps>;
  iconClassName?: string;
  label: string;
}

export const InputWithIcon = React.forwardRef<HTMLInputElement, InputWithIconProps>(
  ({ icon: Icon, className, iconClassName, label, id, ...props }, ref) => {
    return (
      <div className="relative pt-2">
        <Input
          ref={ref}
          id={id}
          className={cn("peer h-12", className)}
          placeholder=" " 
          {...props}
        />
        <Label
          htmlFor={id}
          className="absolute left-4 top-1/2 -translate-y-1/2 text-muted-foreground transition-all duration-300 peer-placeholder-shown:text-base peer-focus:top-2 peer-focus:-translate-y-0 peer-focus:text-xs peer-focus:text-primary peer-[:not(:placeholder-shown)]:top-2 peer-[:not(:placeholder-shown)]:-translate-y-0 peer-[:not(:placeholder-shown)]:text-xs"
        >
          {label}
        </Label>
        <Icon
          className={cn(
            "absolute right-4 top-1/2 h-5 w-5 -translate-y-1/2 text-muted-foreground transition-colors duration-300 peer-focus:text-primary",
            iconClassName
          )}
          aria-hidden="true"
        />
      </div>
    );
  }
);

InputWithIcon.displayName = "InputWithIcon";
