import { DeviceType } from "@/lib/hooks/useResponsive";
import { create } from "zustand";

interface ResponsiveStore {
  deviceSize: DeviceType;
  setDeviceSize: (size: DeviceType) => void;
}

export const useResponsiveStore = create<ResponsiveStore>((set) => ({
  deviceSize: "xs",
  setDeviceSize: (deviceSize) => set({ deviceSize }),
}));

export const getDeviceSize = (store: ResponsiveStore) => store.deviceSize,
  getSetDeviceSize = (store: ResponsiveStore) => store.setDeviceSize;
