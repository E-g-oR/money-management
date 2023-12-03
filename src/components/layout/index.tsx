import { FC } from "react";
import { Outlet } from "react-router-dom";
import ExchangeRates from "../exchange-rates/ExchangeRates";
import Aside from "../ui/navigation-menu";
import { getDeviceSize, useResponsiveStore } from "@/store/responsive";
import { checkDeviceSize } from "@/lib/hooks/useResponsive";
import BottomNavigation from "../bottom-navigation";

const Layout: FC = () => {
  const deviceSize = useResponsiveStore(getDeviceSize);
  return (
    <div
      className={
        "w-screen h-screen flex flex-col sm:flex-row gap-5 bg-background"
      }
    >
      {!checkDeviceSize(deviceSize, "sm") && <Aside />}
      <div className={"flex gap-5 flex-grow flex-shrink "}>
        <div
          className={
            "flex-1 flex flex-col gap-5 mt-5 mx-5 sm:mx-0 sm:mr-5 md:mr-0"
          }
        >
          <Outlet />
        </div>
        {!checkDeviceSize(deviceSize, "md") && <ExchangeRates />}
      </div>
      {checkDeviceSize(deviceSize, "sm") && <BottomNavigation />}
    </div>
  );
};

export default Layout;
