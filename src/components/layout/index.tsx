import { FC } from "react";
import { Outlet } from "react-router-dom";
import ExchangeRates from "../exchange-rates/ExchangeRates";
import Aside from "../ui/navigation-menu";

const Layout: FC = () => {
  return (
    <div className={"w-screen h-screen flex gap-5 bg-background"}>
      <Aside />
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
