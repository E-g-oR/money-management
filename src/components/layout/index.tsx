import { FC } from "react";
import { Outlet } from "react-router-dom";
import NavigationMenu from "../ui/navigation-menu";
import ExchangeRates from "../exchange-rates/ExchangeRates";

const Layout: FC = () => {
  return (
    <div className={"w-screen h-screen flex gap-5 bg-background"}>
      <NavigationMenu />
      <div className="flex gap-5 flex-1 pr-5">
        <div className="flex flex-col flex-1">
          <Outlet />
        </div>
        <ExchangeRates />
      </div>
    </div>
  );
};

export default Layout;
