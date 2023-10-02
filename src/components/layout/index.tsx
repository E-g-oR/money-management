import { FC } from "react";
import { Outlet } from "react-router-dom";
import NavigationMenu from "../ui/navigation-menu";
import ExchangeRates from "../exchange-rates/ExchangeRates";

const Layout: FC = () => {
  return (
    <div className={"w-screen h-screen flex gap-4 bg-background"}>
      <NavigationMenu />
      <div className="flex flex-col">
      <Outlet />
      </div>
      <ExchangeRates/>
    </div>
  );
};

export default Layout;
