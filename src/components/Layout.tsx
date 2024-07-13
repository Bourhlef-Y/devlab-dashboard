// src/app/layout.tsx
import { ReactNode } from "react";
import { UserNav } from "@/components/admin-panel/user-nav";
import { Toaster } from "@/components/ui/sonner";

interface LayoutProps {
  children: ReactNode;
}

export default function Layout({ children }: LayoutProps) {
  return (
    <div>
      <header>
        <UserNav />
      </header>
      <main>{children}</main>
      <Toaster />
    </div>
  );
}
