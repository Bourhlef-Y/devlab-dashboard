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
          label: "DevLab",
          active: pathname.includes("/DevLab"),
          icon: Home,
          submenus: []
        }
      ]
    },
    {
      groupLabel: "Main Content",
      menus: [
        {
          href: "/tools",
          label: "Useful Tools",
          active: pathname.includes("/tools"),
          icon: Sparkles,
          submenus: []
        },
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
          href: "/report",
          label: "Report",
          active: pathname.includes("/report"),
          icon: MessageSquareWarning,
          submenus: []
        },
      ]
    },
  ];
}
