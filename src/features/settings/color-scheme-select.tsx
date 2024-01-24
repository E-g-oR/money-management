import { FC } from "react";

import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { useTranslation } from "@/hooks/useTranslation";
import { getIsDark, getSetIsDark, useSettingsStore } from "@/store/settings";

export const ColorSchemeSelect: FC = () => {
  const t = useTranslation();
  const isDark = useSettingsStore(getIsDark);
  const setIsDark = useSettingsStore(getSetIsDark);

  return (
    <div className="flex items-center gap-2">
      <Label htmlFor={"dark-mode-select"}>{t.settings.darkMode}</Label>
      <Switch
        id={"dark-mode-select"}
        checked={isDark}
        onCheckedChange={setIsDark}
      />
    </div>
  );
};

export default ColorSchemeSelect;
