import { FC } from "react";

import { NavLink } from "react-router-dom";

import { cn } from "@/lib/utils";
import { navbarIcons, navbarItems } from "@/data/constants";
import { useTranslation } from "@/hooks/useTranslation";
import { checkDeviceSize } from "@/hooks/useResponsive";
import { getDeviceSize, useResponsiveStore } from "@/store/responsive";


const NavigationMenu: FC = () => {
  const t = useTranslation();
  const deviceSize = useResponsiveStore(getDeviceSize);

  return (
    <nav className={"flex flex-col gap-2"}>
      {/* TODO: move to separated component */}
      {navbarItems.map((key) => (
        <NavLink
          key={key}
          to={key}
          className={({ isActive }) =>
            cn(
              "transition hover:bg-primary/20 px-4 xl:px-7 py-4 rounded-lg flex items-center gap-5 backdrop-blur-lg",
              isActive ? "bg-primary/20" : undefined
            )
          }
        >
          {navbarIcons[key]}
          {!checkDeviceSize(deviceSize, "lg") && t.navbar[key]}
        </NavLink>
      ))}
    </nav>
  );
};

const Aside: FC = () => (
  <div className={"flex flex-col justify-between"}>
    <NavigationMenu />
  </div>
);

export default Aside;
