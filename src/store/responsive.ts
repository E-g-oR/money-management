import { create } from "zustand";

import { DeviceType } from "@/hooks/useResponsive";

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
