import { FC } from "react";

import { NavLink } from "react-router-dom";

import { cn } from "@/lib/utils";
import { navbarIcons, navbarItems } from "@/lib/constants";

const BottomNavigation: FC = () => {
  return (
    <div
      className={
        " bottom-0 left-0 flex backdrop-blur-md w-full border rounded-md overflow-hidden"
      }
    >
      {navbarItems.map((key) => (
        <NavLink
          key={key}
          to={key}
          className={({ isActive }) =>
            cn(
              "flex-1 flex flex-col items-center hover:bg-primary/20 justify-center py-4 gap-1 rounded transition-colors",
              isActive && "bg-primary/10"
            )
          }
        >
          {navbarIcons[key]}
          {/* {deviceSize !== "xs" && <p>{t.navbar[key]}</p>} */}
        </NavLink>
      ))}
    </div>
  );
};

export default BottomNavigation;
