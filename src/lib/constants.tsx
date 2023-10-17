import { NavigationItemKey } from "@/translation";
import {
  Cog,
  CreditCard,
  Landmark,
  Layers,
  LayoutDashboard,
} from "lucide-react";
import { ReactNode } from "react";

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
