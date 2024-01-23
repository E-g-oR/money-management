import { FC, Suspense, useEffect } from "react";

import { Navigate, Outlet } from "react-router-dom";

import { Api } from "@/api";
import { ROUTES } from "@/router";
import { checkDeviceSize } from "@/hooks/useResponsive";
import { getSetUser, getUser, useAuthStore } from "@/store/auth";
import { getDeviceSize, useResponsiveStore } from "@/store/responsive";

import Show from "../show";
import BgCircle from "../bg-circle";
import Aside from "../ui/navigation-menu";
import HeaderDate from "./components/date";
import Greeting from "./components/greeting";
import { ScrollArea } from "../ui/scroll-area";
import BottomNavigation from "../bottom-navigation";
import { Avatar, AvatarFallback } from "../ui/avatar";
import ExchangeRates from "../exchange-rates/ExchangeRates";

export const NewLayout: FC = () => {
  const currentUser = useAuthStore(getUser);
  const setUser = useAuthStore(getSetUser);
  const deviceSize = useResponsiveStore(getDeviceSize);

  useEffect(() => {
    const auth = Api.getAuth();
    auth.onAuthStateChanged(setUser);
  }, [setUser]);

  return (
    <Show
      when={!!currentUser}
      fallback={<Navigate to={ROUTES.auth.login.path} />}
    >
      <>
        <BgCircle className="w-36 h-36 left-1/4 top-16" />
        <BgCircle className="w-20 h-20 left-0 bottom-16" />
        <BgCircle className="w-56 h-56 right-0 top-16" />
        <div
          className={
            "w-screen h-screen overflow-hidden grid grid-cols-1 sm:grid-cols-layoutLg lg:grid-cols-layout grid-rows-layoutSm sm:grid-rows-layout p-4 md:p-6 gap-3 md:gap-6"
          }
        >
          <Show when={!checkDeviceSize(deviceSize, "sm")}>
            <p className="text-3xl font-bold self-center">
              <Show when={!checkDeviceSize(deviceSize, "lg")} fallback={"Mm"}>
                Monange
              </Show>
            </p>
            <div className="flex justify-between items-center">
              <Show when={!checkDeviceSize(deviceSize, "md")}>
                <Greeting />
              </Show>
              <HeaderDate />
            </div>
            <div className="flex gap-2 items-center justify-end">
              <span>John Wane</span>
              <Avatar>
                {/* <AvatarImage src="" alt="avatar" /> */}
                <AvatarFallback>JN</AvatarFallback>
              </Avatar>
            </div>
            <Aside />
          </Show>
          <div className={"flex flex-col gap-4 md:gap-6 overflow-hidden"}>
            <Suspense fallback={"Loadin..."}>
              <Outlet />
            </Suspense>
          </div>
          <Show when={!checkDeviceSize(deviceSize, "sm")}>
            <ScrollArea>
              <div className="flex flex-col gap-4 md:gap-6">
                <ExchangeRates />
              </div>
            </ScrollArea>
          </Show>
          <Show when={checkDeviceSize(deviceSize, "sm")}>
            <BottomNavigation />
          </Show>
        </div>
      </>
    </Show>
  );
};
