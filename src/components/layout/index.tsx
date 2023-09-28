import { FC } from "react";
import { Outlet } from "react-router-dom";
import NavigationMenu from "../ui/navigation-menu";

const Layout: FC = () => {
  return (
    <div className={"w-screen h-screen flex gap-4 bg-background"}>
      <NavigationMenu />
      <Outlet />
    </div>
  );
};

export default Layout;
