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

const langages: Record<keyof typeof dictionaries, string> = {
  en: "English",
  ru: "Русский",
};

const AsideSettings: FC = () => {
  const isDark = useSettingsStore(getIsDark);
  const setIsDark = useSettingsStore(getSetIsDark);
  const appLanguage = useSettingsStore(getLanguage);
  const setLanguage = useSettingsStore(getSetLanguage);
  console.log(appLanguage);

  return (
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

  return (
    <nav className="flex flex-col gap-2">
      {Object.keys(t.navbar).map((key) => (
        <NavLink
          key={key}
          to={key}
          className={({ isActive }) =>
            cn(
              "transition hover:bg-background px-6 py-1.5 rounded",
              isActive ? "bg-background" : undefined
            )
          }
        >
          {t.navbar[key as keyof typeof t.navbar]}
        </NavLink>
      ))}
    </nav>
  );
};

const Aside: FC = () => (
  <div className="flex flex-col justify-between bg-primary-foreground transition p-3 sm:p-5 xl:p-8 rounded-r-xl border flex-1 max-w-xs min-w-min">
    <NavigationMenu />
    <AsideSettings />
  </div>
);

export default Aside;
