import { ReactNode } from "react";

import {
  Cog,
  CreditCard,
  Landmark,
  Layers,
  LayoutDashboard,
} from "lucide-react";

import { NavigationItemKey } from "@/translation";

export const navbarIcons: Record<NavigationItemKey, ReactNode> = {
  accounts: <Landmark />,
  categories: <Layers />,
  dashboard: <LayoutDashboard />,
  depts: <CreditCard />,
  settings: <Cog />,
};

export const navbarItems: ReadonlyArray<NavigationItemKey> = [
  "accounts",
  "dashboard",
  "depts",
  "categories",
  "settings",
];
