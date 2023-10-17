import { FC } from "react";
import { Outlet } from "react-router-dom";
import ExchangeRates from "../exchange-rates/ExchangeRates";
import Aside from "../ui/navigation-menu";
import { getDeviceSize, useResponsiveStore } from "@/store/responsive";
import { checkDeviceSize } from "@/lib/hooks/useResponsive";
import BottomNavigation from "../bottom-navigation";

const Layout: FC = () => {
  const deviceSize = useResponsiveStore(getDeviceSize)
  return (
    <div className={"w-screen h-screen flex flex-col sm:flex-row gap-5 bg-background"}>
      {/* <Aside /> */}
      <div className="flex gap-5 flex-grow max-h-[90vh]">
        <div className={"flex-1 flex flex-col gap-5 mt-5"}>
          <Outlet />
        </div>
        {!checkDeviceSize(deviceSize, "md") && <ExchangeRates />}
      </div>
      <BottomNavigation/>
    </div>
  );
};

export default Layout;
