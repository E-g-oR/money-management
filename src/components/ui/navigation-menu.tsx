import { FC } from "react";
import { useTranslation } from "@/lib/hooks/useTranslation";
import { cn } from "@/lib/utils";
import { NavLink } from "react-router-dom";
import { Button } from "./button";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "./select";
import { SunIcon } from "@radix-ui/react-icons";
import {
  getIsDark,
  getLanguage,
  getSetIsDark,
  getSetLanguage,
  useSettingsStore,
} from "@/store/settings";
import { dictionaries } from "@/translation";
import { navbarIcons, navbarItems } from "@/lib/constants";
import { getDeviceSize, useResponsiveStore } from "@/store/responsive";
import { checkDeviceSize } from "@/lib/hooks/useResponsive";

const langages: Record<keyof typeof dictionaries, string> = {
  en: "English",
  ru: "Русский",
};

const AsideSettings: FC = () => {
  const isDark = useSettingsStore(getIsDark);
  const setIsDark = useSettingsStore(getSetIsDark);
  const appLanguage = useSettingsStore(getLanguage);
  const setLanguage = useSettingsStore(getSetLanguage);
  const deviceSize = useResponsiveStore(getDeviceSize)

  return (!checkDeviceSize(deviceSize, "md") &&
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
  );
};

const NavigationMenu: FC = () => {
  const t = useTranslation();
  const deviceSize = useResponsiveStore(getDeviceSize)

  return (
    <nav className="flex flex-col gap-2">
      {navbarItems.map((key) => (
        <NavLink
          key={key}
          to={key}
          className={({ isActive }) =>
            cn(
              "transition hover:bg-background px-2 md:px-4 py-2 md:py-2.5 rounded flex items-center gap-5",
              isActive ? "bg-background" : undefined
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
  <div className="flex flex-col justify-between bg-primary-foreground p-3 md:p-5 xl:p-8 rounded-r-xl border">
    <NavigationMenu />
    <AsideSettings />
  </div>
);

export default Aside;
