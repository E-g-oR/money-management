import { FC } from "react";

import { NavLink } from "react-router-dom";

import { cn } from "@/lib/utils";
import { dictionaries } from "@/translation";
import { SunIcon } from "@radix-ui/react-icons";
import { navbarIcons, navbarItems } from "@/lib/constants";
import { useTranslation } from "@/lib/hooks/useTranslation";
import { checkDeviceSize } from "@/lib/hooks/useResponsive";
import { getDeviceSize, useResponsiveStore } from "@/store/responsive";
import {
  getIsDark,
  getLanguage,
  getSetIsDark,
  getSetLanguage,
  useSettingsStore,
} from "@/store/settings";

import { Button } from "./button";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "./select";

const langages: Record<keyof typeof dictionaries, string> = {
  en: "English",
  ru: "Русский",
};

const AsideSettings: FC = () => {
  const isDark = useSettingsStore(getIsDark);
  const setIsDark = useSettingsStore(getSetIsDark);
  const appLanguage = useSettingsStore(getLanguage);
  const setLanguage = useSettingsStore(getSetLanguage);
  const deviceSize = useResponsiveStore(getDeviceSize);

  return (
    !checkDeviceSize(deviceSize, "md") && (
      <div className="flex justify-between gap-4">
        <Select value={appLanguage} onValueChange={setLanguage}>
          <SelectTrigger>
            <SelectValue placeholder={"choose app language"} />
          </SelectTrigger>
          <SelectContent>
            <SelectGroup>
              {Object.keys(langages).map((lang) => (
                <SelectItem value={lang} key={lang}>
                  {langages[lang as keyof typeof dictionaries]}
                </SelectItem>
              ))}
            </SelectGroup>
          </SelectContent>
        </Select>
        <Button size={"icon"} onClick={() => setIsDark(!isDark)}>
          <SunIcon />
        </Button>
      </div>
    )
  );
};

const NavigationMenu: FC = () => {
  const t = useTranslation();
  const deviceSize = useResponsiveStore(getDeviceSize);

  return (
    <nav className="flex flex-col gap-2">
      {/* TODO: move to separated component */}
      {navbarItems.map((key) => (
        <NavLink
          key={key}
          to={key}
          className={({ isActive }) =>
            cn(
              "transition hover:bg-primary/10 px-7 py-4 rounded-lg flex items-center gap-5 backdrop-blur-lg",
              isActive ? "bg-primary/10" : undefined
            )
          }
        >
          {navbarIcons[key]}
          {!checkDeviceSize(deviceSize, "md") && t.navbar[key]}
        </NavLink>
      ))}
    </nav>
  );
};

const Aside: FC = () => (
  <div className="flex flex-col justify-between">
    <NavigationMenu />
    <AsideSettings />
  </div>
);

export default Aside;
