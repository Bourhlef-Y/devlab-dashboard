import {
  Tag,
  Users,
  Settings,
  Bookmark,
  SquarePen,
  LayoutGrid,
  Gamepad2,
  AlignHorizontalJustifyEnd,
  Home,
  Sparkles,
  MessageSquareWarning,
  Keyboard,
  LayoutDashboard
} from "lucide-react";

type Submenu = {
  href: string;
  label: string;
  active: boolean;
};

type Menu = {
  href: string;
  label: string;
  active: boolean;
  icon: any;
  submenus: Submenu[];
};

type Group = {
  groupLabel: string;
  menus: Menu[];
};

export function getMenuList(pathname: string): Group[] {
  return [
    {
      groupLabel: "",
      menus: [
        {
          href: "/",
          label: "Home",
          active: false,
          icon: Home,
          submenus: []
        },
        {
          href: "/dashboard",
          label: "DevLab",
          active: pathname.includes("/dashboard"),
          icon: LayoutDashboard,
          submenus: []
        }
      ]
    },
    {
      groupLabel: "Main Content",
      menus: [
        
        {
          href: "",
          label: "Game References",
          active: pathname.includes("/gamereferences"),
          icon: Gamepad2,
          submenus: [
            {
              href: "/weapons",
              label: "Weapons",
              active: pathname === "/weapons",
            },
            {
              href: "/vehicles",
              label: "Vehicles",
              active: pathname === "/vehicles"
            },
            {
              href: "/peds ",
              label: "Peds",
              active: pathname === "/peds"
            }
          ]
        },
        {
          href: "/controls",
          label: "Controls",
          active: pathname.includes("/controls"),
          icon: Keyboard,
          submenus: []
        },
        {
          href: "/tools",
          label: "Useful Tools",
          active: pathname.includes("/tools"),
          icon: Sparkles,
          submenus: []
        },
      ]
    },
  ];
}
