import { useResponsive } from "@/hooks/useResponsive";
import { getSetDeviceSize, useResponsiveStore } from "@/store/responsive";
import { FC, ReactNode, useEffect } from "react";

interface Props {
  children: ReactNode;
}
const ResponsiveObserver: FC<Props> = ({ children }) => {
  const setDeviceSize = useResponsiveStore(getSetDeviceSize);
  const deviceSize = useResponsive();
  
  useEffect(() => {
    setDeviceSize(deviceSize);
  }, [deviceSize]);

  return children;
};

export default ResponsiveObserver;
