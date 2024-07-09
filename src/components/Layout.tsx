// src/app/layout.tsx
import { UserNav } from "@/components/admin-panel/user-nav";

export default function Layout({ children }) {
  return (
    <div>
      <header>
        <UserNav />
      </header>
      <main>{children}</main>
    </div>
  );
}
