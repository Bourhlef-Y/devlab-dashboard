"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { LayoutDashboard, Gamepad2, Terminal, Server } from "lucide-react";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible";

interface SidebarLink {
  title: string;
  href: string;
  icon: any;
  submenus?: { href: string; title: string }[];
}

export const sidebarLinks: SidebarLink[] = [
  {
    title: "Dashboard",
    href: "/dashboard",
    icon: LayoutDashboard,
  },
  {
    title: "Game Reference",
    href: "",
    icon: Gamepad2,
    submenus: [
      { href: "/weapons", title: "Weapons" },
      { href: "/vehicles", title: "Vehicles" },
      { href: "/peds", title: "Peds" },
    ],
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
        
        if (link.submenus) {
          return (
            <Collapsible key={link.title}>
              <CollapsibleTrigger asChild>
                <Button
                  variant="ghost"
                  className="justify-start w-full"
                >
                  <Icon className="w-5 h-5 mr-3" />
                  {link.title}
                </Button>
              </CollapsibleTrigger>
              <CollapsibleContent className="pl-6">
                {link.submenus.map((submenu) => (
                  <Button
                    key={submenu.href}
                    variant="ghost"
                    className={cn(
                      "justify-start w-full",
                      pathname === submenu.href && "bg-muted"
                    )}
                    asChild
                  >
                    <Link href={submenu.href}>
                      {submenu.title}
                    </Link>
                  </Button>
                ))}
              </CollapsibleContent>
            </Collapsible>
          );
        }

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