"use client";

import * as React from "react";
import { useTheme } from "next-themes"; // Importing the useTheme hook from next-themes for theme switching
import { MoonIcon, SunIcon } from "@radix-ui/react-icons"; // Importing icons for dark and light mode

import { Button } from "@/components/ui/button";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
  TooltipProvider
} from "@/components/ui/tooltip";

// Define the ModeToggle component
export function ModeToggle() {
  // Destructure setTheme and theme from useTheme hook
  const { setTheme, theme } = useTheme();

  return (
    // TooltipProvider to wrap the tooltip components
    <TooltipProvider disableHoverableContent>
      {/* Tooltip with delayDuration of 100ms */}
      <Tooltip delayDuration={100}>
        {/* TooltipTrigger wraps the button */}
        <TooltipTrigger asChild>
          {/* Button to switch themes */}
          <Button
            className="rounded-full w-8 h-8 bg-background"
            variant="outline"
            size="icon"
            onClick={() => setTheme(theme === "dark" ? "light" : "dark")} // Toggle theme on click
          >
            {/* Sun icon for light mode */}
            <SunIcon className="w-[1.2rem] h-[1.2rem] rotate-90 scale-0 transition-transform ease-in-out duration-500 dark:rotate-0 dark:scale-100" />
            {/* Moon icon for dark mode */}
            <MoonIcon className="absolute w-[1.2rem] h-[1.2rem] rotate-0 scale-1000 transition-transform ease-in-out duration-500 dark:-rotate-90 dark:scale-0" />
            {/* Visually hidden text for screen readers */}
            <span className="sr-only">Switch Theme</span>
          </Button>
        </TooltipTrigger>
        {/* Tooltip content displayed below the button */}
        <TooltipContent side="bottom">Switch Theme</TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
}
