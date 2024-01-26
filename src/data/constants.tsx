import { ReactNode } from "react";

import {
  Cog,
  CreditCard,
  Landmark,
  Layers,
  LayoutDashboard,
} from "lucide-react";

import { ColorSchemeKey, NavigationItemKey, dictionaries } from "@/translation";

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

export const ColorSchemeKeys: ReadonlyArray<ColorSchemeKey> = [
  "light",
  "dark",
  "auto",
];

export const langages: Record<keyof typeof dictionaries, string> = {
  en: "English",
  ru: "Русский",
};
