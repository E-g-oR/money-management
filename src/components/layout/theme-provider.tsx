import { getIsDark, useSettingsStore } from "@/store/settings";
import { FC, ReactNode, useEffect } from "react";

interface Props {
  children: ReactNode;
}
const ThemeProvider: FC<Props> = ({ children }) => {
  const isDark = useSettingsStore(getIsDark);

  useEffect(() => {
    const root = window.document.documentElement;
    if (isDark) {
      root.classList.add("dark");
    } else {
      root.classList.remove("dark");
    }
  }, [isDark]);

  return children;
};

export default ThemeProvider;
