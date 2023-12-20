import { FC } from "react";

import { Navigate, Outlet } from "react-router-dom";

import { ROUTES } from "@/router";
import { getAuth } from "firebase/auth";
import { checkDeviceSize } from "@/lib/hooks/useResponsive";
import { getDeviceSize, useResponsiveStore } from "@/store/responsive";

import Aside from "../ui/navigation-menu";
import BottomNavigation from "../bottom-navigation";
import ExchangeRates from "../exchange-rates/ExchangeRates";

const Layout: FC = () => {
  const deviceSize = useResponsiveStore(getDeviceSize);
  const auth = getAuth();
  // TODO: добавить обработчик событий на изменение состояния auth

  return !auth.currentUser ? (
    <Navigate to={ROUTES.auth.login.path} replace />
  ) : (
    <div
      className={
        "w-screen h-screen flex flex-col sm:flex-row gap-5 bg-background"
      }
    >
      {!checkDeviceSize(deviceSize, "sm") && <Aside />}
      <div className={"flex gap-5 flex-grow flex-shrink overflow-auto"}>
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
