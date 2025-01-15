"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { LayoutDashboard, Gamepad2, Terminal, Server } from "lucide-react";

export const sidebarLinks = [
  {
    title: "Dashboard",
    href: "/dashboard",
    icon: LayoutDashboard,
  },
  {
    title: "Game Reference",
    href: "/game-reference",
    icon: Gamepad2,
  },
  {
    title: "Scripts",
    href: "/scripts",
    icon: Terminal,
  },
  {
    title: "Server",
    href: "/server",
    icon: Server,
  },
];

export function SidebarNav() {
  const pathname = usePathname();

  return (
    <nav className="grid gap-1">
      {sidebarLinks.map((link) => {
        const Icon = link.icon;
        return (
          <Button
            key={link.href}
            variant="ghost"
            className={cn(
              "justify-start",
              pathname === link.href && "bg-muted"
            )}
            asChild
          >
            <Link href={link.href}>
              <Icon className="w-5 h-5 mr-3" />
              {link.title}
            </Link>
          </Button>
        );
      })}
    </nav>
  );
} 