import { CSSProperties, FC, ReactNode } from "react";
import { cn } from "@/lib/utils";

interface AnimatedShinyButtonProps {
  children: ReactNode;
  className?: string;
  shimmerWidth?: number;
}

const AnimatedShinyButton: FC<AnimatedShinyButtonProps> = ({
  children,
  className,
  shimmerWidth = 50, // Largeur du shimmer pour un meilleur effet
}) => {
  return (
    <div
      style={
        {
          "--shiny-width": `${shimmerWidth}px`,
        } as CSSProperties
      }
      className={cn(
        "group relative inline-block overflow-hidden rounded-full border border-white/5 bg-neutral-800 px-6 py-2 text-base font-medium text-white dark:bg-neutral-200 dark:text-black dark:border-black/5",

        
        className
      )}
    >
      {children}
    </div>
  );
};

export default AnimatedShinyButton;
