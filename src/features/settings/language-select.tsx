import { FC } from "react";

import { langages } from "@/data/constants";
import { Label } from "@/components/ui/label";
import { useTranslation } from "@/hooks/useTranslation";
import {
  getLanguage,
  getSetLanguage,
  useSettingsStore,
} from "@/store/settings";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

import { processLanguages } from "./utils/process-languages";

export const LanguageSelect: FC = () => {
  const t = useTranslation();
  const appLanguage = useSettingsStore(getLanguage);
  const setLanguage = useSettingsStore(getSetLanguage);

  return (
    <div className={"space-y-2"}>
      <Label htmlFor={"app-language-select"}>{t.settings.appLanguage}</Label>
      <Select value={appLanguage} onValueChange={setLanguage}>
        <SelectTrigger>
          <SelectValue placeholder={"choose app language"} />
        </SelectTrigger>
        <SelectContent>
          <SelectGroup>
            {processLanguages(langages).map((lang) => (
              <SelectItem value={lang} key={lang}>
                {langages[lang]}
              </SelectItem>
            ))}
          </SelectGroup>
        </SelectContent>
      </Select>
    </div>
  );
};

export default LanguageSelect;
