import { FC } from "react";
import { useTranslation } from "@/lib/hooks/useTranslation";
import { cn } from "@/lib/utils";
import { NavLink } from "react-router-dom";

const NavigationMenu: FC = () => {
  const t = useTranslation()
  return (
    <div className="bg-primary-foreground p-8 rounded-r-xl border w-full max-w-xs min-w-min">
      <nav className="flex flex-col gap-2">
        {Object.keys(t.navbar).map((key) => (
          <NavLink
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
    </div>
  );
};

export default NavigationMenu;
