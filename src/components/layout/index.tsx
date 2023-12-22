import { FC, Suspense, useEffect } from "react";

import { Navigate, Outlet } from "react-router-dom";

import { Api } from "@/api";
import { ROUTES } from "@/router";
import { checkDeviceSize } from "@/lib/hooks/useResponsive";
import { getSetUser, getUser, useAuthStore } from "@/store/auth";
import { getDeviceSize, useResponsiveStore } from "@/store/responsive";

import Aside from "../ui/navigation-menu";
import { ScrollArea } from "../ui/scroll-area";
import BottomNavigation from "../bottom-navigation";
import ExchangeRates from "../exchange-rates/ExchangeRates";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";

const Layout: FC = () => {
  const deviceSize = useResponsiveStore(getDeviceSize);
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
          <Suspense fallback={"Loadin..."}>
            <Outlet />
          </Suspense>
        </div>
        {!checkDeviceSize(deviceSize, "md") && <ExchangeRates />}
      </div>
      {checkDeviceSize(deviceSize, "sm") && <BottomNavigation />}
    </div>
  );
};

export default Layout;

export const NewLayout: FC = () => {
  const currentUser = useAuthStore(getUser);
  const setUser = useAuthStore(getSetUser);

  useEffect(() => {
    const auth = Api.getAuth();
    auth.onAuthStateChanged(setUser)
  }, [setUser]);

  return !currentUser ? (
    <Navigate to={ROUTES.auth.login.path} />
  ) : (
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
      <div className="flex gap-2 self-end items-center justify-end">
        <span>John Wane</span>
        <Avatar>
          {/* <AvatarImage src="" alt="avatar" /> */}
          <AvatarFallback>JN</AvatarFallback>
        </Avatar>
      </div>
      <Aside />
      <div className={"flex flex-col gap-6 overflow-hidden"}>
        <Suspense fallback={"Loadin..."}>
          <Outlet />
        </Suspense>
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
