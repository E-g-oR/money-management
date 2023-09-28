import { cn } from "@/lib/utils";
import { FC } from "react";
import { NavLink } from "react-router-dom";

const menu = ["accounts", "dashboard", "depts", "categories", "settings"];

const NavigationMenu: FC = () => {
  return (
    <div className="bg-primary-foreground p-8 rounded-r-xl border w-full max-w-xs min-w-min">
      <nav className="flex flex-col gap-2">
        {menu.map((item) => (
          <NavLink
            to={item}
            className={({ isActive }) =>
              cn(
                "transition hover:bg-background px-6 py-1.5 rounded",
                isActive ? "bg-background" : undefined
              )
            }
          >
            {item}
          </NavLink>
        ))}
      </nav>
    </div>
  );
};

export default NavigationMenu;
