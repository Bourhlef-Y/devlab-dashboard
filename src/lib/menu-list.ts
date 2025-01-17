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
  LayoutDashboard,
  Code,
  Server,
  Car,
  ServerIcon
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
          active: false,
          icon: Gamepad2,
          submenus: [
            {
              href: "/weapons",
              label: "Weapons",
              active: pathname === "/weapons"
            },
            {
              href: "/vehicles",
              label: "Vehicles",
              active: pathname === "/vehicles"
            },
            {
              href: "/peds",
              label: "Peds",
              active: pathname === "/peds"
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
        {
          href: "/scripts",
          label: "Scripts",
          active: pathname.includes("/scripts"),
          icon: Code,
          submenus: []
        },
        {
          href: "/server",
          label: "Server",
          active: pathname.includes("/server"),
          icon: Server,
          submenus: []
        }
      ]
    },
    {
      groupLabel: "Serveur", // Nouveau groupe pour le statut serveur
      menus: [
        {
          href: "/server-status",
          label: "Statut Serveur",
          active: pathname.includes("/server-status"),
          icon: ServerIcon,
          submenus: []
        }
      ]
    }
  ];
}
