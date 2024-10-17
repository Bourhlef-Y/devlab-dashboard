// Import necessary dependencies and components
import { ReactNode } from "react";
import { UserNav } from "@/components/layout/user-nav";
import { Toaster } from "@/components/ui/sonner";

// Define the interface for layout props
interface LayoutProps {
  children: ReactNode;
}

// Define the Layout component that takes children as props
export default function Layout({ children }: LayoutProps) {
  return (
    <div>
      {/* Render the header with UserNav component */}
      <header>
        <UserNav />
      </header>
      {/* Render the main content area with the passed children */}
      <main>{children}</main>
      {/* Render the Toaster component for notifications */}
      <Toaster />
    </div>
  );
}
