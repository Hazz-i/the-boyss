import * as React from "react";
import { cn } from "@/lib/utils";

export interface InputProps
    extends React.InputHTMLAttributes<HTMLInputElement> {
    leftAddon?: React.ReactElement;
    width?: string;
}

const Input = React.forwardRef<HTMLInputElement, InputProps>(
    ({ className, width, leftAddon, type, ...props }, ref) => {
        return (
            <div
                className={
                    "flex h-9 focus-within:ring-1 focus-within:ring-blue rounded-md border border-input focus-visible:outline-none focus-visible:ring-0 overflow-hidden shadow-sm transition-colors disabled:cursor-not-allowed disabled:opacity-50 " +
                    width
                }
            >
                {leftAddon && (
                    <div className="flex items-center px-3 py-1 text-sm text-muted-foreground bg-input">
                        {leftAddon}
                    </div>
                )}
                <input
                    type={type}
                    className={cn(
                        "flex h-full w-full border-none bg-transparent focus-within:ring-0 px-3 py-1 text-sm file:py-1 file:border-none file:bg-transparent file:text-sm file:font-medium file:dark:text-white placeholder:text-muted-foreground outline-none",
                        className
                    )}
                    ref={ref}
                    {...props}
                />
            </div>
        );
    }
);
Input.displayName = "Input";

export { Input };
