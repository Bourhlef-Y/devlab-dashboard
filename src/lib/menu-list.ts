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
} from "lucide-react"; // Importing icons from lucide-react library

// Type definition for a submenu item
type Submenu = {
  href: string; // URL path for the submenu
  label: string; // Display label for the submenu
  active: boolean; // Indicates if the submenu is currently active
};

// Type definition for a menu item
type Menu = {
  href: string; // URL path for the menu
  label: string; // Display label for the menu
  active: boolean; // Indicates if the menu is currently active
  icon: any; // Icon component for the menu
  submenus: Submenu[]; // Array of submenus
};

// Type definition for a group of menus
type Group = {
  groupLabel: string; // Label for the group of menus
  menus: Menu[]; // Array of menus in the group
};

// Function to get the list of menu groups based on the current pathname
export function getMenuList(pathname: string): Group[] {
  return [
    {
      groupLabel: "Main Content", // Label for the first group of menus
      menus: [
        {
          href: "/",
          label: "Home",
          active: false, // This menu item is not active by default
          icon: Home, // Icon for the Home menu
          submenus: [] // No submenus for Home
        },
        {
          href: "/dashboard",
          label: "DevLab",
          active: pathname.includes("/dashboard"), // Active if pathname includes /dashboard
          icon: LayoutDashboard, // Icon for the DevLab menu
          submenus: [] // No submenus for DevLab
        }
      ]
    },
    {
      groupLabel: "Game", // Label for the second group of menus
      menus: [
        {
          href: "",
          label: "Game References",
          active: pathname.includes("/gamereferences"), // Active if pathname includes /gamereferences
          icon: Gamepad2, // Icon for the Game References menu
          submenus: [
            {
              href: "/weapons",
              label: "Weapons",
              active: pathname === "/weapons", // Active if pathname is exactly /weapons
            },
            {
              href: "/vehicles",
              label: "Vehicles",
              active: pathname === "/vehicles" // Active if pathname is exactly /vehicles
            },
            {
              href: "/peds",
              label: "Peds",
              active: pathname === "/peds" // Active if pathname is exactly /peds
            }
          ]
        },
        {
          href: "/controls",
          label: "Controls",
          active: pathname.includes("/controls"), // Active if pathname includes /controls
          icon: Keyboard, // Icon for the Controls menu
          submenus: [] // No submenus for Controls
        },
        {
          href: "/tools",
          label: "Useful Tools",
          active: pathname.includes("/tools"), // Active if pathname includes /tools
          icon: Sparkles, // Icon for the Useful Tools menu
          submenus: [] // No submenus for Useful Tools
        },
      ]
    },
  ];
}
