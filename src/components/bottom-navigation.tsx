import { navbarIcons, navbarItems } from "@/lib/constants";
import { useTranslation } from "@/lib/hooks/useTranslation";
import { cn } from "@/lib/utils";
import { getDeviceSize, useResponsiveStore } from "@/store/responsive";
import { FC } from "react";
import { NavLink } from "react-router-dom";

const BottomNavigation: FC = () => {
  const t = useTranslation();
  const deviceSize = useResponsiveStore(getDeviceSize)
  return (
    <div className={"flex w-full "}>
      {navbarItems.map((key) => (
        <NavLink
          key={key}
          to={key}
          className={({ isActive }) =>
            cn(
              "flex-1  flex flex-col items-center justify-center py-5 gap-1 rounded-md hover:bg-primary-foreground transition-colors",
              isActive && "bg-primary-foreground"
            )
          }
        >
          {navbarIcons[key]}
          {deviceSize !== "xs" && <p>{t.navbar[key]}</p>}
        </NavLink>
      ))}
    </div>
  );
};

export default BottomNavigation;
