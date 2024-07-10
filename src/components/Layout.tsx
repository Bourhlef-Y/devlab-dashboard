// src/app/layout.tsx
import { UserNav } from "@/components/admin-panel/user-nav";

import { Toaster } from "@/components/ui/sonner"

export default function Layout({ children }) {
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
