import { dictionaries } from "@/translation";
import { create } from "zustand";

interface SettingsStore {
  isDark: boolean;
  language: keyof typeof dictionaries;
  setLanguage: (lang: keyof typeof dictionaries) => void;
  setIsDark: (isDark: boolean) => void;
}

export const useSettingsStore = create<SettingsStore>()((set) => ({
  isDark: true,
  language: "en",
  setLanguage: (language) => set({ language }),
  setIsDark: (isDark) => set({ isDark }),
}));

export const getIsDark = (store: SettingsStore) => store.isDark,
  getLanguage = (store: SettingsStore) => store.language,
  getSetIsDark = (store: SettingsStore) => store.setIsDark,
  getSetLanguage = (store: SettingsStore) => store.setLanguage;
