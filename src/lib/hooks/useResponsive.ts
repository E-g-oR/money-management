import { useEffect, useState } from "react";
import { match } from "ts-pattern";

export type DeviceType = "xs" | "sm" | "md" | "lg" | "xl" | "2xl";

const deviceBreakpoints: Record<DeviceType, number> = {
  xs: 520,
  sm: 640,
  md: 768,
  lg: 1024,
  xl: 1280,
  "2xl": 1536,
};

export const useResponsive = () => {
  const [deviceType, setDeviceSize] = useState<DeviceType>("xs");

  useEffect(() => {
    const resizeListener = () => {
      const deviceSize = match(window.innerWidth)
        .when(
          (width) => width < deviceBreakpoints.xs,
          () => "xs"
        )
        .when(
          (width) => width < deviceBreakpoints.sm,
          () => "sm"
        )
        .when(
          (width) => width < deviceBreakpoints.md,
          () => "md"
        )
        .when(
          (width) => width < deviceBreakpoints.lg,
          () => "lg"
        )
        .when(
          (width) => width < deviceBreakpoints.xl,
          () => "xl"
        )
        .when(
          (width) => width < deviceBreakpoints["2xl"],
          () => "2xl"
        )
        .otherwise(() => "2xl");

      setDeviceSize(deviceSize as DeviceType);
    };
    window.addEventListener("resize", resizeListener);

    return () => {
      window.removeEventListener("resize", resizeListener);
    };
  }, []);

  return deviceType;
};

export const checkDeviceSize = (deviceSize: DeviceType, target: DeviceType) =>
  { 
    console.log(deviceSize, deviceBreakpoints[deviceSize], target, deviceBreakpoints[target]);
    
    return deviceBreakpoints[deviceSize] <= deviceBreakpoints[target]};
