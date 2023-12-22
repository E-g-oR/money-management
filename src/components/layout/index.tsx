import { FC } from "react";

import { Navigate, Outlet } from "react-router-dom";

import { ROUTES } from "@/router";
import { getAuth } from "firebase/auth";
import { checkDeviceSize } from "@/lib/hooks/useResponsive";
import { getDeviceSize, useResponsiveStore } from "@/store/responsive";

import Aside from "../ui/navigation-menu";
import BottomNavigation from "../bottom-navigation";
import ExchangeRates from "../exchange-rates/ExchangeRates";
import { ScrollArea } from "../ui/scroll-area";

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

export const NewLayout: FC = () => {
  return (
    <div
      className={
        " w-screen h-screen overflow-hidden grid grid-cols-layout grid-rows-layout p-6 gap-6"
      }
    >
      <p className="text-3xl font-bold self-center">Monange</p>
      <div className="flex justify-between items-center">
        <p className="text-2xl font-bold">Welcome back, John.</p>
        <p className="text-xl">Friday, December 22, 1:56 PM.</p>
      </div>
      <p className="bg-stone-500">header right</p>
      <Aside />
      <div>
        <Outlet />
      </div>
      <ScrollArea>
        <div className="flex flex-col gap-6">
          <ExchangeRates />
          {/* <ExchangeRates /> */}
        </div>
      </ScrollArea>
    </div>
  );
};
